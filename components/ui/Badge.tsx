import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "free" | "pro" | "completed" | "default";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        {
          "bg-gray-100 text-gray-700": variant === "default",
          "bg-green-100 text-green-700": variant === "free",
          "bg-purple-100 text-purple-700": variant === "pro",
          "bg-blue-100 text-blue-700": variant === "completed",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
