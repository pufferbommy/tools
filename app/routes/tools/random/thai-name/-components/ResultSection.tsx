import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Result } from "..";

export default function ResultSection({ results }: { results: Result[] }) {
	return (
		<Card className="text-center group relative">
			<CardHeader>
				<CardTitle>ชื่อที่สุ่มได้</CardTitle>
			</CardHeader>
			<CardContent className="space-y-8">
				{results.length === 0 ? (
					<div className="text-muted-foreground">
						ยังไม่มีผลลัพธ์นะ~ ✨ ลองสุ่มชื่อดูเลย!
					</div>
				) : (
					results.map((result) => (
						<div
							key={Object.values(result).join()}
							className="text-4xl [&>:nth-child(2)]:text-muted-foreground"
						>
							{(result.name?.th ||
								result.lastName?.th ||
								result.nickname?.th) && (
								<p>
									{result.name?.th} {result.lastName?.th}{" "}
									{result.nickname?.th && (
										<>
											{(result.name?.th || result.lastName?.th) && " - "}
											{result.nickname?.th}
										</>
									)}
								</p>
							)}
							{(result.name?.en ||
								result.lastName?.en ||
								result?.nickname?.en) && (
								<p>
									{result.name?.en} {result.lastName?.en}
									{result.nickname?.en && (
										<>
											{(result.name?.en || result.lastName?.en) && " - "}
											{result.nickname?.en}
										</>
									)}
								</p>
							)}
						</div>
					))
				)}
			</CardContent>
		</Card>
	);
}
