export const metadata = {
  title: "Contact Us | UrbanFlex",
  description: "Support for orders, sizing, returns, and wholesale. Reach the UrbanFlex team by email or form.",
}

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-16 space-y-10">
      <header className="max-w-3xl">
        <h1 className="text-balance text-3xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground mt-3">
          We’re here to help with orders, fit & sizing, returns, and product questions.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { k: "Support", v: "support@urbanflex.example" },
          { k: "Press", v: "press@urbanflex.example" },
          { k: "Partnerships", v: "partnerships@urbanflex.example" },
        ].map((c) => (
          <div key={c.k} className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold">{c.k}</h2>
            <p className="text-sm text-muted-foreground mt-2">{c.v}</p>
          </div>
        ))}
      </section>

      <section className="max-w-2xl">
        <h2 className="font-semibold">Send a Message</h2>
        <form className="mt-4 grid grid-cols-1 gap-4" aria-label="Contact form">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-md border bg-background px-3 py-2"
              placeholder="Jordan Patel"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border bg-background px-3 py-2"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="topic" className="block text-sm font-medium">
              Topic
            </label>
            <select id="topic" name="topic" className="mt-1 w-full rounded-md border bg-background px-3 py-2">
              <option>Order Support</option>
              <option>Returns & Exchanges</option>
              <option>Product Question</option>
              <option>Partnerships</option>
              <option>Press</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2"
              placeholder="Tell us how we can help…"
            />
          </div>
          <button type="submit" className="inline-flex items-center rounded-md border px-4 py-2 font-medium">
            Submit
          </button>
          <p className="text-xs text-muted-foreground">We typically respond within 1–2 business days.</p>
        </form>
      </section>

      <section className="max-w-3xl">
        <h2 className="font-semibold">Business Details</h2>
        <p className="text-sm text-muted-foreground mt-2">
          UrbanFlex Studios Pvt. Ltd. • GST: 27ABCDE1234F1Z5 • Mon–Fri: 9:00–18:00 IST • Registered in India.
        </p>
      </section>
    </main>
  )
}
