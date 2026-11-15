import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AppleSelectOption<T extends string> {
  value: T;
  label: string;
}

export function AppleSelect<T extends string>({
  value,
  options,
  onChange,
  variant = "pill",
  className,
}: {
  value: T;
  options: AppleSelectOption<T>[];
  onChange: (value: T) => void;
  variant?: "pill" | "field";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between gap-3 border border-input bg-white text-left font-medium text-foreground transition-all duration-300 hover:border-jade/50",
          variant === "pill"
            ? "rounded-full px-4 py-2 text-[13px]"
            : "rounded-2xl px-4 py-3 text-[14px]",
          open && "border-jade ring-4 ring-jade/10",
        )}
      >
        <span className="truncate">{current?.label}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-apple",
            open && "rotate-180 text-jade",
          )}
        />
      </button>

      <div
        role="listbox"
        className={cn(
          "absolute left-0 right-0 z-50 mt-2 min-w-[180px] origin-top rounded-2xl border border-black/[0.08] bg-white/[0.98] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.14)] backdrop-blur-2xl transition-all duration-200 ease-apple",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible -translate-y-1.5 scale-95 opacity-0",
        )}
      >
        {options.map((opt) => {
          const selected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2 text-left text-[13px] font-medium transition-colors duration-150",
                selected
                  ? "bg-jade-soft text-jade"
                  : "text-foreground hover:bg-secondary",
              )}
            >
              <span>{opt.label}</span>
              {selected && <Check className="size-3.5 shrink-0 text-jade" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
