import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const BUCKET_NAME = 'weekend-knowledge';
const REGION = process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1';

// Initialize S3 client
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
    sessionToken: process.env.NEXT_PUBLIC_AWS_SESSION_TOKEN,
  },
});

export interface S3Object {
  key: string;
  lastModified?: Date;
  size?: number;
  url?: string;
}

/**
 * List all objects in the S3 bucket
 */
export async function listBucketObjects(prefix?: string): Promise<S3Object[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix,
    });

    const response = await s3Client.send(command);
    
    return (response.Contents || []).map(item => ({
      key: item.Key || '',
      lastModified: item.LastModified,
      size: item.Size,
    }));
  } catch (error) {
    console.error('Error listing S3 objects:', error);
    throw error;
  }
}

/**
 * Get a presigned URL for an S3 object (valid for 1 hour)
 */
export async function getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw error;
  }
}

/**
 * Get object content as text
 */
export async function getObjectContent(key: string): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const response = await s3Client.send(command);
    const content = await response.Body?.transformToString();
    return content || '';
  } catch (error) {
    console.error('Error getting S3 object content:', error);
    throw error;
  }
}

/**
 * Get public URL for an object (if bucket allows public access)
 */
export function getPublicUrl(key: string): string {
  return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${encodeURIComponent(key)}`;
}

/**
 * Extract S3 key from S3 URL
 */
export function extractS3KeyFromUrl(url: string): string | null {
  try {
    // Match pattern: https://bucket-name.s3.region.amazonaws.com/path/to/file
    const s3UrlPattern = /https:\/\/([^.]+)\.s3\.([^.]+)\.amazonaws\.com\/(.+)/;
    const match = url.match(s3UrlPattern);
    
    if (match && match[3]) {
      let key = decodeURIComponent(match[3]);
      
      // Convert Documents/ to document-cleaned/
      if (key.includes('data_train/')) {
        key = key.replace(/data_train\//g, 'document-cleaned/');
        // Convert .txt to .pdf
        if (key.endsWith('.txt')) {
          key = key.replace(/\.txt$/, '.pdf');
        }
      }

      return key;
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting S3 key from URL:', error);
    return null;
  }
}

/**
 * Check if URL is an S3 URL for our bucket
 */
export function isS3Url(url: string): boolean {
  return url.includes(`${BUCKET_NAME}.s3.`) && url.includes('.amazonaws.com');
}

/**
 * Download file from S3 as blob
 */
export async function downloadS3File(key: string): Promise<Blob> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const response = await s3Client.send(command);
    
    if (!response.Body) {
      throw new Error('No file content received');
    }

    // Convert stream to blob
    const arrayBuffer = await response.Body.transformToByteArray();
    const blob = new Blob([arrayBuffer], { 
      type: response.ContentType || 'application/octet-stream' 
    });
    
    return blob;
  } catch (error) {
    console.error('Error downloading S3 file:', error);
    throw error;
  }
}
