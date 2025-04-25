export function IntroSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="mb-8">
      <h1 className="text-4xl font-semibold mb-4">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </section>
  );
}
