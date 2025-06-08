import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateGroupPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/groups" prefetch={false}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline text-foreground">Create New Group</h1>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Group Details</CardTitle>
          <CardDescription>Fill in the information below to create your new group.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="group-name">Group Name</Label>
            <Input id="group-name" placeholder="e.g., Photography Club" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="group-description">Description</Label>
            <Textarea id="group-description" placeholder="Tell us about your group..." rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="group-privacy">Privacy</Label>
            <Select>
              <SelectTrigger id="group-privacy">
                <SelectValue placeholder="Select privacy level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public (Anyone can find and join)</SelectItem>
                <SelectItem value="private">Private (Only invited members can join)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="group-image">Group Image (Optional)</Label>
            <Input id="group-image" type="file" />
            <p className="text-xs text-muted-foreground">Upload a cover image for your group.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">Create Group</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
