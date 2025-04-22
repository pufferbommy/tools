import CopyButton from "~/components/CopyButton";
import { Result } from "..";

export default function ResultSection({ results }: { results: Result[] }) {
  const formatResult = (result: Result, html?: boolean) => {
    if (result.nickname && !result.name && !result.lastName) {
      return result.nickname;
    }
    if (result.nickname === "") {
      return `${result.name} ${result.lastName}`;
    }
    if (html) {
      return `${result.name} ${result.lastName} <span class="text-base-content/50">(${result.nickname})</span>`;
    }
    return `${result.name} ${result.lastName} (${result.nickname})`;
  };

  return (
    <section className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">ชื่อที่สุ่มได้</h2>
        <CopyButton
          label="คัดลอกทังหมด"
          copiedLabel="คัดลอกทั้งหมดแล้ว"
          text={results.map((result) => formatResult(result)).join("\n")}
        />
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          {results.map((result, index: number) => (
            <div key={index} className="card card-border">
              <div className="card-body flex-row justify-between">
                <div
                  className="card-title"
                  dangerouslySetInnerHTML={{
                    __html: formatResult(result, true),
                  }}
                />
                <CopyButton text={formatResult(result)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
