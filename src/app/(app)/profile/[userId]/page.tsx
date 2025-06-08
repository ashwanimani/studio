"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Users, UserCheck, UserPlus, MessageSquare, PlayCircle } from "lucide-react";
import Link from "next/link";

// Mock data for other users
const usersData: { [key: string]: any } = {
  "user123": {
    name: "Alex Traveler",
    username: "@alextravels",
    bio: "Wandering the globe and sharing my adventures. 🌍✈️",
    avatarUrl: "https://placehold.co/128x128.png?text=AT",
    bannerUrl: "https://placehold.co/1200x300.png",
    dataAiHintAvatar: "male traveler",
    dataAiHintBanner: "world map",
    followers: 25000,
    following: 150,
    isFollowing: true,
    videos: [
      { id: "v1", title: "Hiking the Swiss Alps", thumbnailUrl: "https://placehold.co/300x169.png", views: "1.2M", duration: "12:05", dataAiHint: "alps mountains" },
      { id: "v2", title: "Street Food in Tokyo", thumbnailUrl: "https://placehold.co/300x169.png", views: "800K", duration: "07:33", dataAiHint: "tokyo food" },
    ],
  },
  "user456": {
    name: "Creative Coder",
    username: "@codeartist",
    bio: "Building cool stuff with code and pixels. Turning ideas into reality. 💻🎨",
    avatarUrl: "https://placehold.co/128x128.png?text=CC",
    bannerUrl: "https://placehold.co/1200x300.png",
    dataAiHintAvatar: "female coder",
    dataAiHintBanner: "code abstract",
    followers: 12000,
    following: 80,
    isFollowing: false,
    videos: [
      { id: "v3", title: "My Latest Web Animation", thumbnailUrl: "https://placehold.co/300x169.png", views: "50K", duration: "01:45", dataAiHint: "web animation" },
    ],
  },
};


export default function UserProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const userProfile = usersData[userId] || { 
    name: "User Not Found", 
    username: "@unknown", 
    bio: "", 
    avatarUrl: "https://placehold.co/128x128.png?text=??", 
    bannerUrl: "https://placehold.co/1200x300.png",
    dataAiHintAvatar: "question mark",
    dataAiHintBanner: "placeholder image",
    followers: 0, 
    following: 0, 
    isFollowing: false,
    videos: [] 
  };

  if (userProfile.name === "User Not Found") {
    return <div className="text-center py-10">
        <h1 className="text-2xl font-bold font-headline">User Not Found</h1>
        <p className="text-muted-foreground">The profile you are looking for does not exist.</p>
        <Button asChild className="mt-4">
            <Link href="/feed" prefetch={false}>Back to Feed</Link>
        </Button>
        </div>;
  }

  return (
    <div className="container mx-auto">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="p-0 relative">
          <Image
            src={userProfile.bannerUrl}
            alt={`${userProfile.name}'s banner`}
            data-ai-hint={userProfile.dataAiHintBanner}
            width={1200}
            height={300}
            className="w-full h-40 md:h-56 object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant={userProfile.isFollowing ? "secondary" : "default"} size="sm" className={userProfile.isFollowing ? "bg-white/80 hover:bg-white text-foreground" : "bg-accent hover:bg-accent/90 text-accent-foreground"}>
              <UserPlus className="mr-2 h-4 w-4" /> {userProfile.isFollowing ? "Following" : "Follow"}
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/80 hover:bg-white text-foreground">
                <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
          </div>
          <div className="absolute -bottom-12 left-6 md:left-10">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background rounded-full shadow-md">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint={userProfile.dataAiHintAvatar} />
              <AvatarFallback>{userProfile.name.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="pt-16 px-6 pb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-headline">{userProfile.name}</h1>
          <p className="text-sm text-muted-foreground mb-2">{userProfile.username}</p>
          <p className="text-foreground/90 mb-4 text-sm">{userProfile.bio}</p>
          <div className="flex gap-4 text-sm mb-6">
            <div>
              <span className="font-semibold">{userProfile.followers.toLocaleString()}</span> <span className="text-muted-foreground">Followers</span>
            </div>
            <div>
              <span className="font-semibold">{userProfile.following.toLocaleString()}</span> <span className="text-muted-foreground">Following</span>
            </div>
          </div>

          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:max-w-md">
              <TabsTrigger value="videos" className="gap-1"><Film className="h-4 w-4" />Videos</TabsTrigger>
              <TabsTrigger value="followers" className="gap-1"><Users className="h-4 w-4" />Followers</TabsTrigger>
              <TabsTrigger value="following" className="gap-1"><UserCheck className="h-4 w-4" />Following</TabsTrigger>
            </TabsList>
            <TabsContent value="videos" className="py-6">
              <h2 className="text-xl font-semibold font-headline mb-4">Uploaded Videos</h2>
              {userProfile.videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userProfile.videos.map((video: any) => (
                    <Card key={video.id} className="overflow-hidden">
                      <CardHeader className="p-0 relative">
                            <Link href={`/videos/${video.id}`} prefetch={false}>
                                <Image
                                src={video.thumbnailUrl}
                                alt={video.title}
                                data-ai-hint={video.dataAiHint}
                                width={300}
                                height={169}
                                className="w-full h-auto object-cover aspect-video"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <PlayCircle className="w-12 h-12 text-white/80" />
                                </div>
                                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                                {video.duration}
                                </span>
                            </Link>
                        </CardHeader>
                      <CardContent className="p-3">
                        <CardTitle className="text-md font-semibold font-headline leading-tight mb-1">
                            <Link href={`/videos/${video.id}`} className="hover:text-primary transition-colors" prefetch={false}>
                             {video.title}
                            </Link>
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">{video.views} views</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">This user hasn&apos;t uploaded any videos yet.</p>
              )}
            </TabsContent>
            <TabsContent value="followers" className="py-6">
              <h2 className="text-xl font-semibold font-headline mb-4">Followers</h2>
              <p className="text-muted-foreground">Followers list will be shown here.</p>
            </TabsContent>
            <TabsContent value="following" className="py-6">
              <h2 className="text-xl font-semibold font-headline mb-4">Following</h2>
              <p className="text-muted-foreground">List of users they follow will be shown here.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
