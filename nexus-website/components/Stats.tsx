const stats = [
  { value: "10+", label: "Years of Combined Experience" },
  { value: "500+", label: "Happy Clients & Investors" },
  { value: "1", label: "Flagship Project — Tower 36" },
  { value: "100%", label: "Transparent Dealings" },
];

export default function Stats() {
  return (
    <section className="relative bg-nexus-gradient-dark py-16 text-white md:py-20">
      <div className="container-x">
        <div className="text-center">
          <span className="eyebrow">By the numbers</span>
          <h2 className="mt-3 font-heading text-h2 text-white">Trusted by buyers and investors</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="font-heading text-4xl font-bold text-white md:text-5xl">{s.value}</dt>
              <dd className="mt-2 text-xs uppercase tracking-wider text-accent">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
