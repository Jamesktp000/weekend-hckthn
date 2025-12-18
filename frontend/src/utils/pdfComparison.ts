import * as pdfjsLib from 'pdfjs-dist';
import { diffWords, Change } from 'diff';

// Configure PDF.js worker - use unpkg for better reliability
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
}

export interface TextItem {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  pageNumber: number;
}

export interface PageComparison {
  pageNumber: number;
  differences: DiffResult[];
  addedItems: TextItem[];
  removedItems: TextItem[];
  modifiedItems: { old: TextItem; new: TextItem }[];
}

export interface DiffResult {
  type: 'added' | 'removed' | 'modified' | 'unchanged';
  value: string;
  oldValue?: string;
  newValue?: string;
}

export interface PDFComparisonResult {
  pages: PageComparison[];
  summary: {
    totalPages: number;
    pagesWithChanges: number;
    totalChanges: number;
    additions: number;
    deletions: number;
    modifications: number;
  };
}

/**
 * Extract text content from a PDF file
 */
export async function extractPDFText(pdfUrl: string): Promise<{ pages: TextItem[][]; fullText: string }> {
  try {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    const pages: TextItem[][] = [];
    let fullText = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageItems: TextItem[] = [];

      textContent.items.forEach((item: any) => {
        if ('str' in item) {
          const textItem: TextItem = {
            text: item.str,
            x: item.transform[4],
            y: item.transform[5],
            width: item.width,
            height: item.height,
            pageNumber: pageNum,
          };
          pageItems.push(textItem);
          fullText += item.str + ' ';
        }
      });

      pages.push(pageItems);
      fullText += '\n\n'; // Separate pages
    }

    return { pages, fullText };
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw error;
  }
}

/**
 * Compare two PDFs and return detailed differences
 */
export async function comparePDFs(pdf1Url: string, pdf2Url: string): Promise<PDFComparisonResult> {
  try {
    const [pdf1Data, pdf2Data] = await Promise.all([
      extractPDFText(pdf1Url),
      extractPDFText(pdf2Url),
    ]);

    const pageComparisons: PageComparison[] = [];
    const maxPages = Math.max(pdf1Data.pages.length, pdf2Data.pages.length);

    let totalChanges = 0;
    let additions = 0;
    let deletions = 0;
    let modifications = 0;

    for (let pageNum = 0; pageNum < maxPages; pageNum++) {
      const page1Items = pdf1Data.pages[pageNum] || [];
      const page2Items = pdf2Data.pages[pageNum] || [];

      // Extract text from each page
      const page1Text = page1Items.map(item => item.text).join(' ');
      const page2Text = page2Items.map(item => item.text).join(' ');

      // Find differences using diff library
      const differences: DiffResult[] = [];
      const wordDiff = diffWords(page2Text, page1Text); // old to new

      wordDiff.forEach((part: Change) => {
        if (part.added) {
          differences.push({
            type: 'added',
            value: part.value,
          });
          additions++;
          totalChanges++;
        } else if (part.removed) {
          differences.push({
            type: 'removed',
            value: part.value,
          });
          deletions++;
          totalChanges++;
        } else {
          differences.push({
            type: 'unchanged',
            value: part.value,
          });
        }
      });

      // Identify added, removed, and modified items by position
      const addedItems: TextItem[] = [];
      const removedItems: TextItem[] = [];
      const modifiedItems: { old: TextItem; new: TextItem }[] = [];

      // Simple comparison: if page1 has more items, they're added; if page2 has more, they're removed
      if (page1Items.length > page2Items.length) {
        addedItems.push(...page1Items.slice(page2Items.length));
      } else if (page2Items.length > page1Items.length) {
        removedItems.push(...page2Items.slice(page1Items.length));
      }

      // Check for modifications in common items
      const minLength = Math.min(page1Items.length, page2Items.length);
      for (let i = 0; i < minLength; i++) {
        if (page1Items[i].text !== page2Items[i].text) {
          modifiedItems.push({
            old: page2Items[i],
            new: page1Items[i],
          });
          modifications++;
        }
      }

      if (differences.some(d => d.type !== 'unchanged')) {
        pageComparisons.push({
          pageNumber: pageNum + 1,
          differences,
          addedItems,
          removedItems,
          modifiedItems,
        });
      }
    }

    return {
      pages: pageComparisons,
      summary: {
        totalPages: maxPages,
        pagesWithChanges: pageComparisons.length,
        totalChanges,
        additions,
        deletions,
        modifications,
      },
    };
  } catch (error) {
    console.error('Error comparing PDFs:', error);
    throw error;
  }
}

/**
 * Generate a summary of changes between two PDFs
 */
export function generateChangeSummary(comparisonResult: PDFComparisonResult): string {
  const { summary, pages } = comparisonResult;
  
  let summaryText = `เปรียบเทียบ PDF พบการเปลี่ยนแปลง:\n`;
  summaryText += `- จำนวนหน้าที่มีการเปลี่ยนแปลง: ${summary.pagesWithChanges} / ${summary.totalPages}\n`;
  summaryText += `- การเปลี่ยนแปลงทั้งหมด: ${summary.totalChanges}\n`;
  summaryText += `- เพิ่ม: ${summary.additions} | ลบ: ${summary.deletions} | แก้ไข: ${summary.modifications}\n\n`;

  pages.forEach(page => {
    summaryText += `หน้า ${page.pageNumber}:\n`;
    if (page.addedItems.length > 0) {
      summaryText += `  + เพิ่ม ${page.addedItems.length} รายการ\n`;
    }
    if (page.removedItems.length > 0) {
      summaryText += `  - ลบ ${page.removedItems.length} รายการ\n`;
    }
    if (page.modifiedItems.length > 0) {
      summaryText += `  ~ แก้ไข ${page.modifiedItems.length} รายการ\n`;
    }
  });

  return summaryText;
}
