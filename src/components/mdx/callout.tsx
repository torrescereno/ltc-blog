import { AlertCircle, AlertTriangle, Info, Lightbulb } from "lucide-react";
import { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  children: ReactNode;
}

const styles = {
  info: {
    bg: "bg-[#d79921]/10 dark:bg-[#d79921]/20",
    border: "border-[#d79921]/30 dark:border-[#d79921]/50",
    icon: <Info size={20} className="text-[#d79921] dark:text-[#e6b32a]" />,
  },
  warning: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    icon: (
      <AlertTriangle
        size={20}
        className="text-yellow-600 dark:text-yellow-400"
      />
    ),
  },
  tip: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    icon: (
      <Lightbulb size={20} className="text-green-600 dark:text-green-400" />
    ),
  },
  danger: {
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    icon: <AlertCircle size={20} className="text-red-600 dark:text-red-400" />,
  },
};

export function Callout({ type = "info", children }: CalloutProps) {
  const style = styles[type];
  return (
    <div
      className={`${style.bg} ${style.border} border rounded-lg p-4 my-6 flex gap-3`}
    >
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
      <div className="prose-p:my-0">{children}</div>
    </div>
  );
}
