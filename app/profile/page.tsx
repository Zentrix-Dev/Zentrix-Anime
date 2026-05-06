// app/profile/page.tsx
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function ProfilePage() {
  const session = await auth();

  // Protect the route
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch the user's continue watching list from Prisma
  const continueWatching = await db.continueWatching.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    take: 10,
  });

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-elevated/40 p-8 rounded-2xl border border-border-subtle backdrop-blur-md mb-12">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent-primary shadow-[0_0_20px_var(--accent-glow)]">
          <Image 
            src={session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`} 
            alt="Profile Avatar" 
            width={96} 
            height={96} 
            className="object-cover"
          />
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
            {session.user.name}
          </h1>
          <p className="text-text-muted">{session.user.email}</p>
        </div>
        <div className="flex gap-4">
          <form action={async () => {
            "use server";
            const { signOut } = await import("@/auth");
            await signOut({ redirectTo: "/" });
          }}>
            <Button variant="ghost">Sign Out</Button>
          </form>
          <Button variant="primary">Edit Profile</Button>
        </div>
      </div>

      {/* Continue Watching Section */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-accent-secondary rounded-full"></span>
          Continue Watching
        </h2>

        {continueWatching.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {continueWatching.map((item) => (
              <Link 
                key={item.id} 
                href={`/watch/${item.animeId}/${item.episode}`}
                className="group flex gap-4 bg-bg-card border border-border-subtle p-3 rounded-xl hover:border-accent-primary transition-all duration-300 hover:shadow-[0_0_15px_var(--accent-glow)]"
              >
                <div className="flex flex-col justify-center flex-1">
                  <span className="text-xs text-accent-secondary font-bold mb-1">
                    Episode {item.episode}
                  </span>
                  <span className="font-display font-bold text-text-primary group-hover:text-white transition-colors">
                    Anime ID: {item.animeId} {/* Note: In a real app, you'd join this with AniList data to show the actual title/image */}
                  </span>
                  <span className="text-xs text-text-muted mt-2">
                    Last watched: {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-center p-4">
                  <div className="w-10 h-10 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    ▶
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-elevated/20 rounded-xl border border-border-subtle border-dashed">
            <p className="text-text-muted">No history found. Start watching to track your progress!</p>
            <Link href="/browse">
              <Button variant="primary" className="mt-4">Find Anime</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
