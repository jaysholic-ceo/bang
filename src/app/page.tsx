import { Suspense } from "react";
import HomeClient from "./HomeClient";
import { DEFAULT_MEDIA_POSTS } from "@/data/media";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeClient mediaPosts={DEFAULT_MEDIA_POSTS} />
    </Suspense>
  );
}
