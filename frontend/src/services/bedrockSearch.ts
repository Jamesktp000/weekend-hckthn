export interface SearchSource {
  fileName: string;
  fileLink: string;
  metadata: {
    'x-amz-bedrock-kb-source-file-mime-type': string;
    'x-amz-bedrock-kb-source-file-modality': string;
    'x-amz-bedrock-kb-data-source-id': string;
  };
}

export interface BedrockSearchResponse {
  answer: string;
  sources: SearchSource[];
}

export async function searchDocuments(question: string): Promise<BedrockSearchResponse> {
  try {
    const response = await fetch('https://8bjxewkx4m.execute-api.us-east-1.amazonaws.com/api/bedrock/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: BedrockSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling Bedrock API:', error);
    throw error;
  }
}
