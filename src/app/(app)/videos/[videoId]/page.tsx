"use client";

import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, ThumbsUp, ThumbsDown, Send, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const videoData: { [key: string]: any } = {
  "1": {
    title: "Exploring the Mountains - A Scenic Journey",
    uploader: { name: "Adventure Vlogs", avatar: "https://placehold.co/40x40.png?text=AV", username: "@adventurevlogs", dataAiHint: "person happy" },
    videoUrl: "https://placehold.co/1280x720.png", // Replace with actual video or placeholder for video player
    description: "Join me on an epic journey through breathtaking mountain ranges. We'll see stunning vistas, encounter wildlife, and experience the thrill of adventure!",
    views: "1.2M",
    likes: "45K",
    timestamp: "2 days ago",
    dataAiHint: "mountain scenery",
    comments: [
      { id: "c1", user: { name: "NatureFan", avatar: "https://placehold.co/32x32.png?text=NF", dataAiHint: "person nature" }, text: "Absolutely stunning! Makes me want to go hiking.", time: "1 day ago" },
      { id: "c2", user: { name: "TravelBug", avatar: "https://placehold.co/32x32.png?text=TB", dataAiHint: "person travel" }, text: "What camera did you use for these shots?", time: "12 hours ago" },
    ]
  },
   "v1": { // Example video from group page
    title: "Sunrise over the Grand Canyon",
    uploader: { name: "Nature Explorer", avatar: "https://placehold.co/40x40.png?text=NE", username: "@natureexplorer", dataAiHint: "person nature" },
    videoUrl: "https://placehold.co/1280x720.png",
    description: "Witness the magical sunrise over the Grand Canyon. A truly unforgettable experience.",
    views: "500K",
    likes: "22K",
    timestamp: "5 days ago",
    dataAiHint: "canyon sunrise",
    comments: []
  }
};

export default function VideoPage() {
  const params = useParams();
  const videoId = params.videoId as string;
  const video = videoData[videoId] || { 
    title: "Video Not Found", 
    uploader: { name: "Unknown", avatar: "https://placehold.co/40x40.png?text=??", username: "@unknown", dataAiHint: "person unknown" }, 
    videoUrl: "https://placehold.co/1280x720.png",
    description: "This video could not be found or is unavailable.",
    views: "0",
    likes: "0",
    timestamp: "",
    dataAiHint: "placeholder image",
    comments: []
  };

  if (video.title === "Video Not Found") {
     return <div className="text-center py-10">
        <h1 className="text-2xl font-bold font-headline">Video Not Found</h1>
        <p className="text-muted-foreground">The video you are looking for does not exist.</p>
        <Button asChild className="mt-4">
            <Link href="/feed" prefetch={false}>Back to Feed</Link>
        </Button>
        </div>;
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4 shadow-lg relative">
        {/* Placeholder for video player. In a real app, use <video> or a player component. */}
        <Image src={video.videoUrl} alt={video.title} layout="fill" objectFit="cover" data-ai-hint={video.dataAiHint} />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Button variant="ghost" size="icon" className="h-20 w-20 text-white hover:bg-white/20 hover:text-white">
                <Play className="h-16 w-16" />
            </Button>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold font-headline mb-2">{video.title}</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 text-sm text-muted-foreground">
        <span>{video.views} views &bull; {video.timestamp}</span>
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
            <ThumbsUp className="h-4 w-4" /> {video.likes}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
            <ThumbsDown className="h-4 w-4" /> Dislike
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      <Card className="mb-6 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={video.uploader.avatar} alt={video.uploader.name} data-ai-hint={video.uploader.dataAiHint}/>
              <AvatarFallback>{video.uploader.name.substring(0,2)}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/profile/${video.uploader.username}`} className="font-semibold hover:underline" prefetch={false}>{video.uploader.name}</Link>
              <p className="text-xs text-muted-foreground">{video.uploader.username}</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Subscribe</Button>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-foreground/90 whitespace-pre-wrap">{video.description}</p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold font-headline">{video.comments.length} Comments</h2>
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png?text=CU" alt="Current User" data-ai-hint="user avatar" />
            <AvatarFallback>CU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input placeholder="Add a comment..." className="mb-2" />
            <div className="flex justify-end">
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Send className="h-4 w-4 mr-2"/> Comment
                </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {video.comments.map((comment: any) => (
            <div key={comment.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} data-ai-hint={comment.user.dataAiHint} />
                <AvatarFallback>{comment.user.name.substring(0,1)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs mb-0.5">
                  <span className="font-semibold">{comment.user.name}</span>
                  <span className="text-muted-foreground">{comment.time}</span>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
