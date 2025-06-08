import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const chats = [
  { id: "1", name: "Alice Wonderland", avatar: "https://placehold.co/40x40.png?text=AW", lastMessage: "Hey, how are you doing?", time: "10:30 AM", unread: 2, dataAiHint: "female portrait" },
  { id: "2", name: "Bob The Builder", avatar: "https://placehold.co/40x40.png?text=BB", lastMessage: "Can we build it? Yes we can!", time: "Yesterday", unread: 0, dataAiHint: "male portrait" },
  { id: "3", name: "Tech Geeks Group", avatar: "https://placehold.co/40x40.png?text=TG", lastMessage: "Anyone seen the new AI model?", time: "Mon", unread: 5, dataAiHint: "group people" },
  { id: "4", name: "Carol Danvers", avatar: "https://placehold.co/40x40.png?text=CD", lastMessage: "Higher, further, faster!", time: "Sun", unread: 0, dataAiHint: "female portrait" },
];

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold font-headline text-foreground">Messages</h1>
        <Button variant="ghost" size="icon">
          <UserPlus className="h-6 w-6" />
          <span className="sr-only">New Chat</span>
        </Button>
      </header>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search chats" className="pl-10 w-full" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <Link href={`/messages/${chat.id}`} key={chat.id} prefetch={false}>
            <Card className="m-2 mb-0 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border-0 border-b">
              <CardContent className="p-3 flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.avatar} alt={chat.name} data-ai-hint={chat.dataAiHint} />
                  <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
