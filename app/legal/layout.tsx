// app/legal/layout.tsx
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-elevated/40 backdrop-blur-xl border border-border-subtle rounded-2xl p-8 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          {/* Prose classes handle the markdown-style formatting automatically */}
          <div className="prose prose-invert prose-violet max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
