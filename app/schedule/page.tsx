// app/schedule/page.tsx
import { getAiringSchedule } from "@/lib/anilist";
import { AnimeCard } from "@/components/ui/AnimeCard";

// Helper to get start and end of the current week in Unix timestamps (seconds)
function getWeekTimestamps() {
  const now = new Date();
  const dayOfWeek = now.getDay() || 7; // Convert Sunday (0) to 7
  
  const monday = new Date(now);
  monday.setDate(now.getDate() - dayOfWeek + 1);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return {
    from: Math.floor(monday.getTime() / 1000),
    to: Math.floor(sunday.getTime() / 1000),
  };
}

export default async function SchedulePage() {
  const { from, to } = getWeekTimestamps();
  
  // Fetch data (Cached via Next.js ISR, revalidates every hour automatically based on our fetcher)
  const schedules = await getAiringSchedule(from, to);

  // Group schedules by day of the week
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const groupedSchedules: Record<string, any[]> = {
    Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
  };

  schedules.forEach((item: any) => {
    const date = new Date(item.airingAt * 1000);
    const dayName = daysOfWeek[date.getDay()];
    groupedSchedules[dayName].push(item);
  });

  // Reorder to start on Monday
  const displayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-12 text-center md:text-left">
        <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-2">
          Release <span className="text-accent-secondary">Schedule</span>
        </h1>
        <p className="text-text-muted">Track when the newest episodes drop (times are local).</p>
      </div>

      <div className="space-y-16">
        {displayOrder.map((day) => {
          const daySchedules = groupedSchedules[day];
          if (daySchedules.length === 0) return null;

          return (
            <section key={day} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="font-display font-bold text-2xl text-white bg-elevated px-6 py-2 rounded-full border border-border-subtle inline-block shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  {day}
                </h2>
                <div className="h-px bg-border-subtle flex-1"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {daySchedules.map((item) => (
                  <div key={item.id} className="relative group">
                    <AnimeCard
                      id={item.media.id}
                      title={item.media.title.english || item.media.title.romaji}
                      image={item.media.coverImage.large}
                      format={item.media.format}
                    />
                    {/* Floating Episode Badge */}
                    <div className="absolute -top-3 -right-3 bg-accent-primary text-white font-bold text-xs px-3 py-1 rounded-full shadow-[0_0_15px_var(--accent-glow)] z-20 border border-white/20">
                      EP {item.episode}
                    </div>
                    {/* Airing Time Overlay (Appears on Hover) */}
                    <div className="absolute top-2 left-2 right-2 bg-black/80 backdrop-blur-md border border-border-subtle p-2 rounded text-center opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                      <span className="text-accent-secondary text-xs font-bold font-display uppercase tracking-widest">
                        {new Date(item.airingAt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
