import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Users } from "lucide-react";
import Image from "next/image";

const userGroups = [
  { id: "1", name: "Nature Lovers Community", members: 125, imageUrl: "https://placehold.co/80x80.png", dataAiHint: "nature landscape" },
  { id: "2", name: "Indie Game Developers", members: 480, imageUrl: "https://placehold.co/80x80.png", dataAiHint: "game controller" },
  { id: "3", name: "Book Club Central", members: 78, imageUrl: "https://placehold.co/80x80.png", dataAiHint: "books stack" },
  { id: "4", name: "Local Artists Collective", members: 34, imageUrl: "https://placehold.co/80x80.png", dataAiHint: "paint palette" },
];

const suggestedGroups = [
  { id: "5", name: "Photography Enthusiasts", members: 1200, imageUrl: "https://placehold.co/80x80.png", dataAiHint: "camera lens" },
  { id: "6", name: "Startup Founders Hub", members: 850, imageUrl: "https://placehold.co/80x80.png", dataAiHint: "business team" },
];

export default function GroupsPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline text-foreground">Groups</h1>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/groups/create" prefetch={false}>
            <PlusCircle className="mr-2 h-5 w-5" /> Create Group
          </Link>
        </Button>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold font-headline mb-4">Your Groups</h2>
        {userGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <Link href={`/groups/${group.id}`} className="block" prefetch={false}>
                  <CardHeader className="flex flex-row items-center gap-4 p-4">
                    <Avatar className="h-16 w-16 rounded-lg">
                      <AvatarImage src={group.imageUrl} alt={group.name} data-ai-hint={group.dataAiHint} />
                      <AvatarFallback>{group.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-headline">{group.name}</CardTitle>
                      <CardDescription className="text-sm">{group.members} members</CardDescription>
                    </div>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">You haven&apos;t joined or created any groups yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">Suggested Groups</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 rounded-lg">
                        <AvatarImage src={group.imageUrl} alt={group.name} data-ai-hint={group.dataAiHint} />
                        <AvatarFallback>{group.name.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        <div>
                        <CardTitle className="text-lg font-headline">{group.name}</CardTitle>
                        <CardDescription className="text-sm">{group.members} members</CardDescription>
                        </div>
                    </div>
                    <Button variant="outline" size="sm">Join</Button>
                </CardHeader>
              </Card>
            ))}
          </div>
      </section>
    </div>
  );
}
