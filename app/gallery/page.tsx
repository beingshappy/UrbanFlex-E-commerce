import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Street Gallery | UrbanFlex",
  description:
    "Real looks from the UrbanFlex community. Explore campaigns and user submissions from cities around the world.",
}

export default function GalleryPage() {
  return (
    <main className="container mx-auto px-4 py-16 space-y-10">
      <header className="max-w-3xl">
        <h1 className="text-balance text-3xl md:text-5xl font-bold tracking-tight">Street Gallery</h1>
        <p className="text-muted-foreground mt-3">
          Campaign highlights and community looks. Submit yours with <span className="font-mono">#UrbanFlex</span>.
        </p>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <figure key={i} className="overflow-hidden rounded-lg border bg-card">
            <img
              src={`/urban-streetwear-look-.jpg?key=j0pfy&height=640&width=640&query=urban streetwear look ${i + 1}`}
              alt={`UrbanFlex community look ${i + 1}`}
              className="h-full w-full object-cover"
            />
            <figcaption className="p-2 text-xs text-muted-foreground">Community Look #{i + 1}</figcaption>
          </figure>
        ))}
      </section>

      <section className="max-w-3xl space-y-3">
        <h2 className="font-semibold">Submit Your Fits</h2>
        <p className="text-muted-foreground">
          Post on Instagram or TikTok with <span className="font-mono">#UrbanFlex</span> and tag @urbanflex. Selected
          posts may appear here and in campaigns.
        </p>
        <p className="text-xs text-muted-foreground">
          By tagging UrbanFlex, you grant us permission to re-share your content with credit. To request removal, email
          gallery@urbanflex.example.
        </p>
      </section>
    </main>
  )
}
