import { Progress } from "./ui/progress";

interface BudgetDisplayProps {
  total: number;
  remaining: number;
  showDetailed?: boolean;
}

export function BudgetDisplay({ total, remaining, showDetailed = false }: BudgetDisplayProps) {
  const used = total - remaining;
  const percentage = (remaining / total) * 100;

  return (
    <div className="bg-white rounded-xl border-2 border-blue-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-lg text-gray-700">Dein Budget:</span>
        <div className="text-right">
          <span className="text-3xl text-blue-700">{remaining}€</span>
          <span className="text-lg text-gray-500"> / {total}€</span>
        </div>
      </div>

      <Progress value={percentage} className="h-3" />

      {showDetailed && used > 0 && (
        <div className="flex justify-between text-sm text-gray-600 pt-2 border-t">
          <span>Verfügbar: {remaining}€</span>
          <span>Verwendet: {used}€</span>
        </div>
      )}
    </div>
  );
}
