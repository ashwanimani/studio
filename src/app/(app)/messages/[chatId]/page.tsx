"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Paperclip, Send, Smile, Phone, Video } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const messages = [
  { id: "1", sender: "other", text: "Hey, how are you doing?", time: "10:30 AM" },
  { id: "2", sender: "me", text: "I'm good, thanks! How about you?", time: "10:31 AM" },
  { id: "3", sender: "other", text: "Doing great! Working on the new project.", time: "10:32 AM" },
  { id: "4", sender: "me", text: "Awesome! Let me know if you need any help.", time: "10:33 AM" },
  { id: "5", sender: "other", text: "Sure, will do! Thanks.", time: "10:34 AM" },
  { id: "6", sender: "me", text: "No problem at all! 😊", time: "10:35 AM" },
];

const chatUsers: { [key: string]: { name: string, avatar: string, dataAiHint: string } } = {
  "1": { name: "Alice Wonderland", avatar: "https://placehold.co/40x40.png?text=AW", dataAiHint: "female portrait" },
  "2": { name: "Bob The Builder", avatar: "https://placehold.co/40x40.png?text=BB", dataAiHint: "male portrait" },
  "3": { name: "Tech Geeks Group", avatar: "https://placehold.co/40x40.png?text=TG", dataAiHint: "group people"},
  "4": { name: "Carol Danvers", avatar: "https://placehold.co/40x40.png?text=CD", dataAiHint: "female portrait" },
};


export default function ChatPage() {
  const params = useParams();
  const chatId = params.chatId as string;
  const chatPartner = chatUsers[chatId] || { name: "Unknown User", avatar: "https://placehold.co/40x40.png?text=UU", dataAiHint: "silhouette" };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-theme(spacing.32))] md:max-h-[calc(100vh-theme(spacing.24))] bg-card rounded-lg shadow-md">
      <header className="flex items-center p-3 border-b gap-3 sticky top-16 md:top-0 bg-card z-10">
        <Link href="/messages" className="md:hidden" prefetch={false}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <Avatar className="h-10 w-10">
          <AvatarImage src={chatPartner.avatar} alt={chatPartner.name} data-ai-hint={chatPartner.dataAiHint}/>
          <AvatarFallback>{chatPartner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold font-headline flex-1 truncate">{chatPartner.name}</h2>
        <div className="flex gap-1">
            <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5"/>
                <span className="sr-only">Call</span>
            </Button>
            <Button variant="ghost" size="icon">
                <Video className="h-5 w-5"/>
                <span className="sr-only">Video Call</span>
            </Button>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl ${
                message.sender === "me"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-muted-foreground rounded-bl-none"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70 text-left'}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>

      <footer className="p-3 border-t flex items-center gap-2 sticky bottom-16 md:bottom-0 bg-card">
        <Button variant="ghost" size="icon">
          <Smile className="h-6 w-6" />
          <span className="sr-only">Emoji</span>
        </Button>
        <Input placeholder="Type a message..." className="flex-1" />
        <Button variant="ghost" size="icon">
          <Paperclip className="h-6 w-6" />
          <span className="sr-only">Attach file</span>
        </Button>
        <Button size="icon" className="bg-accent hover:bg-accent/90">
          <Send className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </footer>
    </div>
  );
}
