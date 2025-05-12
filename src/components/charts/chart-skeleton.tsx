import { Bar, BarsWrapper } from "./styles";

const DEFAULT_HEIGHTS = [30, 50, 70, 60, 90, 40, 80, 55, 65, 45];

export function ChartSkeleton({
  heights = DEFAULT_HEIGHTS
}: {
  heights?: number[]; // valores em % de altura
}) {
  return (
    <BarsWrapper>
      {heights.map((h, i) => (
        <Bar
          variant="rectangular"
          key={i}
          height={`${h}%`}
        />
      ))}
    </BarsWrapper>
  );
}