import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Read the CSV file
const csvPath = path.join(process.cwd(), '.data', 'โจทย์', 'list of contents.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true
});

// Group documents by category
const categories: Record<string, any[]> = {};

records.forEach((record: any) => {
  const filename = record.Filename;
  const fullPath = record['Full Path'];
  const publishDate = record['publish date'];
  const publishMonth = record['publish month'];
  
  // Extract category from filename (everything before the first -)
  const categoryMatch = filename.match(/^([^-_]+)/);
  const category = categoryMatch ? categoryMatch[1] : 'อื่นๆ';
  
  if (!categories[category]) {
    categories[category] = [];
  }
  
  categories[category].push({
    filename,
    path: fullPath,
    publishDate,
    publishMonth
  });
});

// Display categories and counts
console.log('Categories found:');
Object.keys(categories).forEach(cat => {
  console.log(`${cat}: ${categories[cat].length} documents`);
});

// Show sample from each category
console.log('\nSample documents:');
Object.keys(categories).slice(0, 10).forEach(cat => {
  console.log(`\n${cat}:`);
  categories[cat].slice(0, 3).forEach((doc: any) => {
    console.log(`  - ${doc.filename}`);
  });
});
