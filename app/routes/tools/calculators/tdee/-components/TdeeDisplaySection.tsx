import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TdeeDisplaySection(props: { tdee: number | null }) {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>ค่าพลังงานที่ร่างกายคุณต้องการต่อวัน (TDEE)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="space-x-2">
          <span className="text-8xl text-primary font-semibold">
            {props.tdee?.toFixed(1) || "?"}
          </span>
          {props.tdee && <span>แคลอรี่</span>}
        </p>
      </CardContent>
    </Card>
  );
}
