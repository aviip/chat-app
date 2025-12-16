import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="h-full flex flex-col items-center">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-balance">
            Welcome to ChatApp
          </h1>
          <p className="text-xl md:text-2xl">Start conversations that matter</p>
        </div>

        <Link href="/chat">
          <Button size="lg">{"Let's Chat"}</Button>
        </Link>
      </div>
    </div>
  );
}
