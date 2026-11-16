import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  hint?: string;
}

export function PlumSelect({
  id,
  value,
  onChange,
  options,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left text-sm transition-all",
          open
            ? "border-plum ring-2 ring-plum/15"
            : "border-border hover:border-plum/50",
        )}
      >
        <span className="truncate text-foreground">{current?.label ?? value}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180 text-plum",
          )}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 z-50 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-border bg-white p-1.5 shadow-xl"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors",
                  active
                    ? "bg-plum-soft font-semibold text-plum"
                    : "text-foreground hover:bg-plum-soft/45",
                )}
              >
                <div className="min-w-0">
                  <p className="truncate">{opt.label}</p>
                  {opt.hint && (
                    <p
                      className={cn(
                        "truncate text-[11px]",
                        active ? "text-plum/80" : "text-muted-foreground",
                      )}
                    >
                      {opt.hint}
                    </p>
                  )}
                </div>
                {active && <Check className="size-4 shrink-0 text-plum" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
