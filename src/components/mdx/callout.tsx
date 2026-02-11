import { AlertCircle, AlertTriangle, Info, Lightbulb } from "lucide-react";
import { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  children: ReactNode;
}

const styles = {
  info: {
    bg: "bg-[#fabd2f]/10",
    border: "border-[#fabd2f]/30",
    icon: <Info size={20} className="text-[#fabd2f]" />,
  },
  warning: {
    bg: "bg-[#fe8019]/10",
    border: "border-[#fe8019]/30",
    icon: (
      <AlertTriangle
        size={20}
        className="text-[#fe8019]"
      />
    ),
  },
  tip: {
    bg: "bg-[#b8bb26]/10",
    border: "border-[#b8bb26]/30",
    icon: (
      <Lightbulb size={20} className="text-[#b8bb26]" />
    ),
  },
  danger: {
    bg: "bg-[#fb4934]/10",
    border: "border-[#fb4934]/30",
    icon: <AlertCircle size={20} className="text-[#fb4934]" />,
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
