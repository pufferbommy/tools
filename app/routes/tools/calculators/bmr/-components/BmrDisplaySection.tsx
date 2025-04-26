import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BmrDisplaySection(props: { bmr: number | null }) {
  return (
    <Card className="text-center group relative">
      <CardHeader>
        <CardTitle>ค่าการเผาผลาญพลังงาน (BMR)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="space-x-2">
          <span className="text-8xl text-primary font-semibold">
            {props.bmr?.toFixed(1) || "?"}
          </span>
          {props.bmr && <span>แคลอรี่ต่อวัน</span>}
        </p>
      </CardContent>
    </Card>
  );
}
