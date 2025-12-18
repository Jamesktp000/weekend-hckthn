import { topics, Document } from '@/data/mockData';
import { SearchSource } from '@/services/bedrockSearch';

export interface MatchedDocument {
  document: Document;
  topicId: string;
  subtopicId: string;
  subjectId: string;
  source: SearchSource;
}

/**
 * Match a fileName from search results to a document in mockData
 * Returns the matched document with its location info
 */
export function matchFileNameToDocument(fileName: string): MatchedDocument | null {
  // Normalize fileName (remove path and keep just the filename)
  const normalizedFileName = fileName.split('/').pop()?.toLowerCase() || '';
  
  // Search through all topics and subtopics
  for (const topic of topics) {
    for (const subtopic of topic.subtopics) {
      for (const document of subtopic.documents) {
        if (document.documentPath) {
          // Extract filename from documentPath
          const docFileName = document.documentPath.split('/').pop()?.toLowerCase() || '';
          
          // Check if filenames match
          if (docFileName === normalizedFileName || document.documentPath.toLowerCase().includes(normalizedFileName)) {
            return {
              document,
              topicId: topic.id,
              subtopicId: subtopic.id,
              subjectId: 'books', // Default to books, could be enhanced
              source: {} as SearchSource // Will be filled by caller
            };
          }
        }
      }
    }
  }
  
  return null;
}

/**
 * Build document URL from matched document
 */
export function buildDocumentUrl(matched: MatchedDocument): string {
  return `/${matched.subjectId}/${matched.topicId}/${matched.subtopicId}/${matched.document.id}`;
}

/**
 * Match multiple search sources to documents
 */
export function matchSearchSourcesToDocuments(sources: SearchSource[]): MatchedDocument[] {
  const matched: MatchedDocument[] = [];
  
  for (const source of sources) {
    const match = matchFileNameToDocument(source.fileName);
    if (match) {
      match.source = source;
      matched.push(match);
    }
  }
  
  return matched;
}
