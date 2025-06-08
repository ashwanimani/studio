"use server";

import { moderateVideo, type ModerateVideoInput, type ModerateVideoOutput } from '@/ai/flows/video-moderation';

export async function runVideoModeration(input: ModerateVideoInput): Promise<ModerateVideoOutput> {
  try {
    const result = await moderateVideo(input);
    return result;
  } catch (error) {
    console.error('Error in runVideoModeration server action:', error);
    // Consider how to propagate errors. For now, re-throwing.
    // You might want to return a more structured error object.
    if (error instanceof Error) {
        throw new Error(`Moderation failed: ${error.message}`);
    }
    throw new Error('An unknown error occurred during video moderation.');
  }
}
