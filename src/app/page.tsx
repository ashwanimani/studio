
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, PlaySquare, Users, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background border-b sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <MessageCircle className="h-8 w-8 text-primary" />
          <span className="sr-only">ChirpChat</span>
        </Link>
        <h1 className="ml-3 text-2xl font-headline font-bold text-primary">ChirpChat</h1>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/login" prefetch={false}>
              <LogIn className="mr-2 h-4 w-4" />
              Admin Login
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Connect, Share, and Chat with ChirpChat
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    The ultimate platform combining vibrant video sharing with seamless real-time messaging. Join communities, follow creators, and stay connected.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/feed" prefetch={false}>
                      Get Started
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/feed" prefetch={false}>
                      Explore Videos
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="ChirpChat Hero Image"
                data-ai-hint="social media connection"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">
                  Everything You Need, All in One Place
                </h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ChirpChat offers a rich set of features designed to enhance your social experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none pt-12">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <PlaySquare className="w-10 h-10 text-accent mb-2" />
                  <CardTitle className="font-headline">Video Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Upload, share, and discover amazing videos from creators around the world.</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <MessageCircle className="w-10 h-10 text-accent mb-2" />
                  <CardTitle className="font-headline">Real-Time Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Connect instantly with friends and communities through direct and group messages.</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <Users className="w-10 h-10 text-accent mb-2" />
                  <CardTitle className="font-headline">Groups & Communities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Create and join groups based on your interests for focused discussions and content sharing.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 ChirpChat. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
