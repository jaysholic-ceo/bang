import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/seo";
import HomeClient from "./HomeClient";
import { DEFAULT_MEDIA_POSTS } from "@/data/media";

export const metadata: Metadata = pageMetadata({ description: SITE_DESCRIPTION, path: "/" });

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeClient mediaPosts={DEFAULT_MEDIA_POSTS} />
    </Suspense>
  );
}
