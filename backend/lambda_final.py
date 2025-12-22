import json
import boto3

def lambda_handler(event, context):
    bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')
    bedrock_agent_runtime = boto3.client('bedrock-agent-runtime', region_name='us-east-1')
    
    try:
        body = json.loads(event['body']) if isinstance(event.get('body'), str) else event.get('body', {})
        question = body.get('question', '')
        
        if not question:
            return {'statusCode': 400, 'headers': {'Content-Type': 'application/json'}, 'body': json.dumps({'error': 'Question required'})}
        
        # Enhanced retrieval with more results
        kb_response = bedrock_agent_runtime.retrieve_and_generate(
            input={'text': question},
            retrieveAndGenerateConfiguration={
                'type': 'KNOWLEDGE_BASE',
                'knowledgeBaseConfiguration': {
                    'knowledgeBaseId': 'xxxxxxxxxxx',
                    'modelArn': 'arn:aws:bedrock:us-east-1::url',
                    'retrievalConfiguration': {
                        'vectorSearchConfiguration': {
                            'numberOfResults': 20,
                            'overrideSearchType': 'HYBRID'
                        }
                    }
                }
            }
        )
        
        kb_answer = kb_response['output']['text']
        
        # Ultra-precise prompting
        prompt = f"""You are a precise business assistant. Answer EXACTLY what is asked using the knowledge base data.

STRICT RULES:
- For percentage questions: Answer with just the number + % (e.g., "1.50%")
- For amount questions: Answer with just the number + บาท (e.g., "7,200 บาท")  
- For yes/no questions: Answer "ได้" or "ไม่ได้"
- For count questions: Answer with just the number
- For process questions: Give 3-4 short bullet points max
- If data exists but unclear, give best estimate from context
- Only say "ไม่มีข้อมูล" if absolutely no relevant data found

Knowledge Base: {kb_answer}

Question: {question}

Answer (be extremely concise):"""

        response = bedrock_runtime.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229-v1:0',
            body=json.dumps({
                'anthropic_version': 'bedrock-2023-05-31',
                'max_tokens': 150,
                'temperature': 0,
                'messages': [{'role': 'user', 'content': prompt}]
            })
        )
        
        response_body = json.loads(response['body'].read())
        answer = response_body['content'][0]['text'].strip()
        
        return {'statusCode': 200, 'headers': {'Content-Type': 'application/json'}, 'body': json.dumps({'answer': answer})}
        
    except Exception as e:
        return {'statusCode': 500, 'headers': {'Content-Type': 'application/json'}, 'body': json.dumps({'error': str(e)})}
