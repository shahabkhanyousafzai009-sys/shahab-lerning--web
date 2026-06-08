export function VideoPlayer({ videoUrl, title }: { videoUrl: string; title: string }) {
  function getYouTubeId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m) return m[1];
    }
    return null;
  }

  const videoId = getYouTubeId(videoUrl);
  if (!videoId) {
    return (
      <div className="rounded-xl border border-zinc-200/60 bg-zinc-50 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-900 dark:text-zinc-400">
        Invalid YouTube URL
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200/60 bg-black shadow-sm dark:border-zinc-700/60">
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
    </div>
  );
}
