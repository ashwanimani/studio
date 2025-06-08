import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Share2, MoreVertical, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data for videos
const videos = [
  {
    id: "1",
    title: "Exploring the Mountains - A Scenic Journey",
    uploader: { name: "Adventure Vlogs", avatar: "https://placehold.co/40x40.png?text=AV" },
    thumbnailUrl: "https://placehold.co/600x338.png",
    views: "1.2M",
    timestamp: "2 days ago",
    duration: "12:35",
    dataAiHint: "mountain landscape",
  },
  {
    id: "2",
    title: "Delicious Street Food Tour in Bangkok",
    uploader: { name: "Foodie Travels", avatar: "https://placehold.co/40x40.png?text=FT" },
    thumbnailUrl: "https://placehold.co/600x338.png",
    views: "875K",
    timestamp: "5 days ago",
    duration: "08:12",
    dataAiHint: "street food",
  },
  {
    id: "3",
    title: "Learn Coding: Python Basics for Beginners",
    uploader: { name: "Code Master", avatar: "https://placehold.co/40x40.png?text=CM" },
    thumbnailUrl: "https://placehold.co/600x338.png",
    views: "500K",
    timestamp: "1 week ago",
    duration: "25:40",
    dataAiHint: "coding tutorial",
  },
    {
    id: "4",
    title: "Ultimate Gaming Setup 2024",
    uploader: { name: "GamerXtreme", avatar: "https://placehold.co/40x40.png?text=GX" },
    thumbnailUrl: "https://placehold.co/600x338.png",
    views: "2.5M",
    timestamp: "3 hours ago",
    duration: "15:00",
    dataAiHint: "gaming setup",
  },
];

export default function FeedPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-6 text-foreground">Video Feed</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="p-0 relative">
              <Link href={`/videos/${video.id}`} prefetch={false}>
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  data-ai-hint={video.dataAiHint}
                  width={600}
                  height={338}
                  className="w-full h-auto object-cover aspect-video"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-16 h-16 text-white/80" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </Link>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-lg font-semibold font-headline leading-tight mb-1">
                <Link href={`/videos/${video.id}`} className="hover:text-primary transition-colors" prefetch={false}>
                  {video.title}
                </Link>
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={video.uploader.avatar} alt={video.uploader.name} />
                  <AvatarFallback>{video.uploader.name.substring(0,2)}</AvatarFallback>
                </Avatar>
                <span>{video.uploader.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {video.views} views &bull; {video.timestamp}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">Comment</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
