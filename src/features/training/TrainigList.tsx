import { cn } from "@/lib/utils";

export const TrainingList = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "p-3 h-[calc(100vh-80px)] text-sm text-gray-400",
        className
      )}
    >
      <div>ここに利用者一覧を作成</div>
    </div>
  );
};
