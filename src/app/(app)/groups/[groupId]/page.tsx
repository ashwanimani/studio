"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Settings, Film, MessageSquareIcon, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";


// Mock data
const groupsData: { [key: string]: any } = {
  "1": { 
    name: "Nature Lovers Community", 
    membersCount: 125, 
    bannerUrl: "https://placehold.co/1200x300.png", 
    description: "A place for sharing beautiful nature photography, discussing conservation, and planning outdoor adventures.",
    dataAiHint: "nature banner",
    videos: [
      { id: "v1", title: "Sunrise over the Grand Canyon", uploader: "Nature Explorer", thumbnailUrl: "https://placehold.co/300x169.png", duration: "05:22", dataAiHint: "canyon sunrise" },
      { id: "v2", title: "Wildflowers of the Rockies", uploader: "Flower Power", thumbnailUrl: "https://placehold.co/300x169.png", duration: "03:10", dataAiHint: "mountain flowers" },
    ],
    members: [
      { id: "u1", name: "Alice", avatar: "https://placehold.co/40x40.png?text=A", role: "Admin", dataAiHint: "female face" },
      { id: "u2", name: "Bob", avatar: "https://placehold.co/40x40.png?text=B", role: "Member", dataAiHint: "male face" },
      { id: "u3", name: "Charlie", avatar: "https://placehold.co/40x40.png?text=C", role: "Member", dataAiHint: "person face" },
    ]
  },
   "2": { 
    name: "Indie Game Developers", 
    membersCount: 480, 
    bannerUrl: "https://placehold.co/1200x300.png", 
    description: "Connect with fellow indie game developers, share your projects, get feedback, and find collaborators.",
    dataAiHint: "game development",
    videos: [
      { id: "v3", title: "My First Unity Game Demo", uploader: "NewDev", thumbnailUrl: "https://placehold.co/300x169.png", duration: "02:15", dataAiHint: "game screen" },
    ],
     members: [
      { id: "u4", name: "Dave", avatar: "https://placehold.co/40x40.png?text=D", role: "Admin", dataAiHint: "person face" },
    ]
  },
};

export default function GroupDetailsPage() {
  const params = useParams();
  const groupId = params.groupId as string;
  const group = groupsData[groupId] || { name: "Group Not Found", membersCount: 0, bannerUrl: "https://placehold.co/1200x300.png", description: "This group does not exist or could not be loaded.", dataAiHint: "placeholder image", videos: [], members: [] };

  if (group.name === "Group Not Found") {
    return <div className="text-center py-10">
        <h1 className="text-2xl font-bold font-headline">Group Not Found</h1>
        <p className="text-muted-foreground">The group you are looking for does not exist.</p>
        <Button asChild className="mt-4">
            <Link href="/groups" prefetch={false}>Back to Groups</Link>
        </Button>
        </div>;
  }

  return (
    <div className="container mx-auto">
      <div className="relative mb-6">
        <Image
          src={group.bannerUrl}
          alt={`${group.name} banner`}
          data-ai-hint={group.dataAiHint}
          width={1200}
          height={300}
          className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-white">{group.name}</h1>
          <p className="text-sm text-gray-200">{group.membersCount} members</p>
        </div>
         <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="secondary" size="sm" className="bg-white/80 hover:bg-white text-foreground">
                <UserPlus className="mr-2 h-4 w-4" /> Join Group
            </Button>
            <Button variant="secondary" size="icon" className="bg-white/80 hover:bg-white text-foreground">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Group Settings</span>
            </Button>
        </div>
      </div>
      <p className="text-muted-foreground mb-6">{group.description}</p>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:max-w-md">
          <TabsTrigger value="videos" className="gap-1"><Film className="h-4 w-4" />Videos</TabsTrigger>
          <TabsTrigger value="chat" className="gap-1"><MessageSquareIcon className="h-4 w-4" />Chat</TabsTrigger>
          <TabsTrigger value="members" className="gap-1"><Users className="h-4 w-4" />Members</TabsTrigger>
        </TabsList>
        <TabsContent value="videos" className="py-6">
          <h2 className="text-2xl font-semibold font-headline mb-4">Shared Videos</h2>
          {group.videos.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.videos.map((video: any) => (
                <Card key={video.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
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
                    <p className="text-xs text-muted-foreground">by {video.uploader}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No videos shared in this group yet.</p>
          )}
        </TabsContent>
        <TabsContent value="chat" className="py-6">
           <div className="border rounded-lg p-4 h-96 flex flex-col">
                <div className="flex-grow overflow-y-auto mb-4">
                    <p className="text-muted-foreground text-center py-10">Group chat is not available yet. Check back soon!</p>
                </div>
                <div className="flex gap-2">
                    <Input placeholder="Type your message..." />
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Send</Button>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="members" className="py-6">
          <h2 className="text-2xl font-semibold font-headline mb-4">Members ({group.membersCount})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {group.members.map((member: any) => (
              <Card key={member.id} className="p-4 flex flex-col items-center text-center">
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.dataAiHint} />
                  <AvatarFallback>{member.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
