import aseerGroupLogo from "@/assets/logos/aseer-group.jpeg";
import { cn } from "@/lib/utils";

export function Logo({ className = "", size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center overflow-hidden bg-white ring-1 ring-black/8",
          size === "lg" ? "size-12 rounded-2xl p-1 shadow-sm" : "size-9 rounded-xl p-0.5 shadow-xs",
        )}
      >
        <img
          src={aseerGroupLogo}
          alt="The Aseer Group logo"
          className="size-full object-contain mix-blend-multiply"
        />
      </span>
      <span
        className={cn(
          "font-semibold tracking-tight text-foreground",
          size === "lg" ? "text-[17px]" : "text-[15px]",
        )}
      >
        The Aseer Group
      </span>
    </span>
  );
}
