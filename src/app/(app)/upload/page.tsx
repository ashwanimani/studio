import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="text-3xl font-bold font-headline mb-6 text-foreground">Upload Video</h1>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><UploadCloud className="h-6 w-6 text-accent"/>Share Your Story</CardTitle>
          <CardDescription>Fill in the details below to upload your video to ChirpChat.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="video-file">Video File</Label>
            <Input id="video-file" type="file" accept="video/*" className="file:text-primary file:font-medium"/>
            <p className="text-xs text-muted-foreground">Max file size: 500MB. Supported formats: MP4, MOV, AVI.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="video-title">Title</Label>
            <Input id="video-title" placeholder="e.g., My Amazing Vacation Highlights" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="video-description">Description</Label>
            <Textarea id="video-description" placeholder="Tell viewers about your video..." rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="video-tags">Tags (Optional)</Label>
            <Input id="video-tags" placeholder="e.g., travel, vlog, tutorial (comma-separated)" />
            <p className="text-xs text-muted-foreground">Help others find your video.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="video-thumbnail">Custom Thumbnail (Optional)</Label>
            <Input id="video-thumbnail" type="file" accept="image/*" className="file:text-primary file:font-medium" />
            <p className="text-xs text-muted-foreground">Recommended size: 1280x720.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <UploadCloud className="mr-2 h-5 w-5" /> Upload Video
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
