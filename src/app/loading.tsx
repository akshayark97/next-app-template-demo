export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col items-center gap-4">
        <div
          aria-hidden
          className="w-16 h-16 rounded-full border-4 border-muted border-t-foreground animate-spin"
        />
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    </div>
  );
}
