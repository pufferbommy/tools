export function IntroSection({
  title,
  description,
}: {
  title: string;
  description: React.ReactNode;
}) {
  return (
    <section className="space-y-8">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-base-content/75">{description}</p>
    </section>
  );
}
