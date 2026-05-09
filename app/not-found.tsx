import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-3 font-heading text-h1">Page not found</h1>
      <p className="mt-4 text-muted">The page you're looking for has moved or doesn't exist.</p>
      <Link href="/" className="btn-primary mt-8">Back to Home</Link>
    </section>
  );
}
