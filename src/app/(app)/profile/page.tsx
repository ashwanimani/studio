import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit3, Film, Users, UserCheck, PlayCircle } from "lucide-react";
import Link from "next/link";

const userProfile = {
  name: "Chirpy User",
  username: "@chirpy_user",
  bio: "Loves to share videos and chat with friends! Exploring new tech and adventures. 🚀",
  avatarUrl: "https://placehold.co/128x128.png?text=CU",
  bannerUrl: "https://placehold.co/1200x300.png",
  dataAiHintAvatar: "user avatar",
  dataAiHintBanner: "abstract banner",
  followers: 1250,
  following: 300,
  videos: [
    { id: "1", title: "My Awesome Trip to the Beach", thumbnailUrl: "https://placehold.co/300x169.png", views: "15K", duration: "04:30", dataAiHint: "beach landscape" },
    { id: "2", title: "Cooking My Favorite Recipe", thumbnailUrl: "https://placehold.co/300x169.png", views: "8K", duration: "08:15", dataAiHint: "food cooking" },
  ],
  followersList: [
      { id: "f1", name: "Follower One", avatar: "https://placehold.co/40x40.png?text=F1", dataAiHint: "person face" },
      { id: "f2", name: "Follower Two", avatar: "https://placehold.co/40x40.png?text=F2", dataAiHint: "person face" },
  ],
  followingList: [
      { id: "g1", name: "Following One", avatar: "https://placehold.co/40x40.png?text=G1", dataAiHint: "person face" },
  ]
};

export default function ProfilePage() {
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
          <div className="absolute top-4 right-4">
            <Button variant="secondary" size="sm" className="bg-white/80 hover:bg-white text-foreground">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
          <div className="absolute -bottom-12 left-6 md:left-10">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background rounded-full shadow-md">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint={userProfile.dataAiHintAvatar}/>
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
                  {userProfile.videos.map(video => (
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
                <p className="text-muted-foreground">No videos uploaded yet.</p>
              )}
            </TabsContent>
            <TabsContent value="followers" className="py-6">
              <h2 className="text-xl font-semibold font-headline mb-4">Followers</h2>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {userProfile.followersList.map(follower => (
                  <Card key={follower.id} className="p-3 flex flex-col items-center text-center">
                    <Avatar className="h-16 w-16 mb-2">
                      <AvatarImage src={follower.avatar} alt={follower.name} data-ai-hint={follower.dataAiHint}/>
                      <AvatarFallback>{follower.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium truncate w-full">{follower.name}</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full text-xs">View</Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="following" className="py-6">
              <h2 className="text-xl font-semibold font-headline mb-4">Following</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {userProfile.followingList.map(followed => (
                  <Card key={followed.id} className="p-3 flex flex-col items-center text-center">
                    <Avatar className="h-16 w-16 mb-2">
                      <AvatarImage src={followed.avatar} alt={followed.name} data-ai-hint={followed.dataAiHint}/>
                      <AvatarFallback>{followed.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium truncate w-full">{followed.name}</p>
                    <Button variant="secondary" size="sm" className="mt-2 w-full text-xs">Unfollow</Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
