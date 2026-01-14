import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        className,
        "border border-border-default rounded-xl w-full"
      )}
    >
      {children}
    </div>
  );
}
