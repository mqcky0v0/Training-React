import { cn } from "@/lib/utils";

export const SmapleRegister = ({ className }: { className?: string }) => {
  return (
    <div className={cn("p-3 h-[calc(100vh-80px)]", className)}>
      SampleRegister
    </div>
  );
};
