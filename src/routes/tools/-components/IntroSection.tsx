import { SocialShare } from "./SocialShare";

export function IntroSection({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col md:flex-row items-start gap-4 justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-base-content/75">{description}</p>
        </div>
        <SocialShare url={url} text={title} />
      </div>
    </section>
  );
}
