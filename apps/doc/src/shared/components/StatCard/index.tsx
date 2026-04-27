import { Badge, Card, Text } from 'fcontreras2-ui';

type Props = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  sub?: string;
};

export default function StatCard({ label, value, delta, positive, sub }: Props) {
  return (
    <Card shadow="sm" padding="lg">
      <Text variant="caption" color="muted" weight="medium">{label}</Text>
      <Text variant="h3" weight="bold" className="mt-1">{value}</Text>
      <div className="flex items-center gap-2 mt-3">
        <Badge variant={positive ? 'success' : 'danger'} size="sm">{delta}</Badge>
        {sub && <Text variant="caption" color="muted">{sub}</Text>}
      </div>
    </Card>
  );
}
