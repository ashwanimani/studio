import ModerationToolClient from "@/components/moderation/ModerationToolClient";

export default function VideoModerationPage() {
  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold font-headline mb-8 text-foreground">AI Video Moderation Tool</h1>
      <ModerationToolClient />
    </div>
  );
}
