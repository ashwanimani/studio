"use client";

import { useState, type FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ShieldCheck, ShieldAlert, FileVideo, CheckCircle, XCircle } from "lucide-react";
import type { ModerateVideoOutput } from '@/ai/flows/video-moderation';
import { runVideoModeration } from '@/app/(app)/moderation/actions'; // Server action

export default function ModerationToolClient() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDataUri, setVideoDataUri] = useState<string | null>(null);
  const [communityGuidelines, setCommunityGuidelines] = useState<string>("No explicit content, hate speech, or violence.");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ModerateVideoOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoDataUri(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null); // Reset result when new file is selected
      setError(null);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!videoDataUri || !communityGuidelines) {
      setError("Please select a video and provide community guidelines.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const moderationResult = await runVideoModeration({ videoDataUri, communityGuidelines });
      setResult(moderationResult);
    } catch (e) {
      console.error("Moderation error:", e);
      setError(e instanceof Error ? e.message : "An unknown error occurred during moderation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-primary"/>AI Video Moderation</CardTitle>
        <CardDescription>Upload a video and provide community guidelines to check for compliance.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="video-file">Video File</Label>
            <Input id="video-file" type="file" accept="video/*" onChange={handleFileChange} className="file:text-primary file:font-medium" />
            {videoFile && <p className="text-xs text-muted-foreground">Selected: {videoFile.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="community-guidelines">Community Guidelines</Label>
            <Textarea
              id="community-guidelines"
              value={communityGuidelines}
              onChange={(e) => setCommunityGuidelines(e.target.value)}
              placeholder="Enter your community guidelines here..."
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading || !videoFile} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Moderating...
              </>
            ) : (
              <>
               <ShieldCheck className="mr-2 h-4 w-4" /> Moderate Video
              </>
            )}
          </Button>
        </CardFooter>
      </form>

      {error && (
        <div className="p-4 pt-0">
          <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {result && (
        <div className="p-4 pt-0 space-y-4">
            <Alert variant={result.isCompliant ? "default" : "destructive"} className={result.isCompliant ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}>
            {result.isCompliant ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
            <AlertTitle className={result.isCompliant ? "text-green-700 font-headline" : "text-red-700 font-headline"}>
              {result.isCompliant ? "Video is Compliant" : "Video Flagged"}
            </AlertTitle>
            <AlertDescription className={result.isCompliant ? "text-green-600" : "text-red-600"}>
              The video has been analyzed against the provided guidelines.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
                <CardTitle className="text-lg font-headline">Moderation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div>
                    <h4 className="font-semibold">Summary:</h4>
                    <p className="text-muted-foreground">{result.summary}</p>
                </div>
                 {result.flaggedReasons && result.flaggedReasons.length > 0 && (
                <div>
                    <h4 className="font-semibold">Flagged Reasons:</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                    {result.flaggedReasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                    ))}
                    </ul>
                </div>
                )}
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
