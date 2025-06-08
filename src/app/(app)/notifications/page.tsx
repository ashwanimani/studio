import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BellRing, UserPlus, Heart, MessageCircle, Users } from "lucide-react";
import Link from "next/link";

const notifications = [
  { id: "1", type: "follow", user: { name: "Alice Wonderland", avatar: "https://placehold.co/40x40.png?text=AW", dataAiHint: "female face" }, text: "started following you.", time: "2h ago", icon: UserPlus, iconColor: "text-blue-500" },
  { id: "2", type: "like", user: { name: "Bob The Builder", avatar: "https://placehold.co/40x40.png?text=BB", dataAiHint: "male face" }, text: "liked your video 'My Awesome Trip'.", time: "5h ago", icon: Heart, iconColor: "text-red-500" },
  { id: "3", type: "comment", user: { name: "Carol Danvers", avatar: "https://placehold.co/40x40.png?text=CD", dataAiHint: "female face" }, text: "commented on your video: 'Great content!'", time: "1 day ago", icon: MessageCircle, iconColor: "text-green-500" },
  { id: "4", type: "group_invite", user: { name: "Tech Geeks Group", avatar: "https://placehold.co/40x40.png?text=TG", dataAiHint: "group people" }, text: "invited you to join their group.", time: "3 days ago", icon: Users, iconColor: "text-purple-500" },
];

export default function NotificationsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="flex items-center mb-6">
        <BellRing className="h-8 w-8 mr-3 text-primary" />
        <h1 className="text-3xl font-bold font-headline text-foreground">Notifications</h1>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
            <Card key={notification.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`p-2 rounded-full bg-muted ${notification.iconColor} bg-opacity-20`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <Link href={`/profile/${notification.user.name.toLowerCase().replace(/\s+/g, '')}`} className="font-semibold hover:underline" prefetch={false}>{notification.user.name}</Link>
                    {" "}
                    {notification.text}
                  </p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={notification.user.avatar} alt={notification.user.name} data-ai-hint={notification.user.dataAiHint} />
                  <AvatarFallback>{notification.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>
          )})}
        </div>
      ) : (
        <div className="text-center py-10">
          <BellRing className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-muted-foreground">No new notifications</p>
          <p className="text-sm text-muted-foreground">Check back later for updates.</p>
        </div>
      )}
    </div>
  );
}
