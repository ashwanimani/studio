
"use client";

import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Trash2, Eye, CheckCircle, XCircle, MessageSquareWarning } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mockModerationItems = [
  {
    id: "video1",
    type: "Video",
    title: "My Cat Doing Funny Things",
    uploader: "UserCatLover123",
    dateSubmitted: "2024-07-28",
    status: "Pending Review",
    thumbnailUrl: "https://placehold.co/120x68.png",
    reasonFlagged: "Potential spam",
    dataAiHint: "cat video",
  },
  {
    id: "comment1",
    type: "Comment",
    content: "This is not a very nice thing to say!",
    author: "ConcernedUser",
    dateSubmitted: "2024-07-27",
    status: "Pending Review",
    onContent: "Video: Epic Fail Compilation",
    reasonFlagged: "Reported by user for offensive language",
  },
  {
    id: "video2",
    type: "Video",
    title: "How to make a...",
    uploader: "DIYMaster",
    dateSubmitted: "2024-07-26",
    status: "Approved",
    thumbnailUrl: "https://placehold.co/120x68.png",
    reasonFlagged: null,
    dataAiHint: "tutorial video",
  },
];

function ModerationPageContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline text-foreground flex items-center">
          <ShieldAlert className="mr-3 h-8 w-8 text-destructive" /> Content Moderation Queue
        </h1>
        {/* Future: Add filters or search here */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Items for Review</CardTitle>
          <CardDescription>Review flagged videos, comments, and other content.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Thumbnail</TableHead>
                <TableHead>Title/Content</TableHead>
                <TableHead>Uploader/Author</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockModerationItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="hidden sm:table-cell">
                    {item.type === "Video" && item.thumbnailUrl && (
                      <Image
                        src={item.thumbnailUrl}
                        alt={item.title || "Video thumbnail"}
                        data-ai-hint={item.dataAiHint || "video content"}
                        width={80}
                        height={45}
                        className="rounded-md object-cover aspect-video"
                      />
                    )}
                     {item.type !== "Video" && <div className="w-[80px] h-[45px] bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">No Preview</div>}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium truncate max-w-xs">{item.type === "Video" ? item.title : item.content}</div>
                    <div className="text-xs text-muted-foreground">{item.type} {item.type !== "Video" && item.onContent ? `on "${item.onContent}"` : ''}</div>
                    {item.reasonFlagged && <div className="text-xs text-destructive mt-1">Reason: {item.reasonFlagged}</div>}
                  </TableCell>
                  <TableCell>{item.type === "Video" ? item.uploader : item.author}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.dateSubmitted}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Pending Review" ? "destructive" : item.status === "Approved" ? "default" : "secondary"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {item.status === "Pending Review" && (
                        <>
                          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700" title="Approve">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" title="Reject/Delete">
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-amber-600 hover:text-amber-700" title="Warn User">
                            <MessageSquareWarning className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                       {item.status !== "Pending Review" && item.type === "Video" && (
                         <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" title="Delete Post">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                       )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {mockModerationItems.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No items currently in the moderation queue.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ModerationPage() {
  return (
    <AdminAuthGuard>
      <ModerationPageContent />
    </AdminAuthGuard>
  );
}
