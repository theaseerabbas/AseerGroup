import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const base =
  "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-500 ease-apple active:scale-[0.97]";
const variants = {
  solid: "bg-primary text-primary-foreground hover:bg-jade",
  ghost: "text-foreground ring-1 ring-border hover:ring-foreground/40 hover:bg-secondary",
  light: "bg-background text-foreground hover:bg-secondary",
  link: "px-0 py-0 text-jade hover:gap-3",
};

export function Pill({
  to,
  href,
  children,
  variant = "solid",
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const cls = cn(base, variants[variant], className);
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ArrowUpRight className="size-4 transition-transform duration-500 ease-apple group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    );
  return (
    <Link to={to as "/"} className={cls}>
      {children}
      <ArrowRight className="size-4 transition-transform duration-500 ease-apple group-hover:translate-x-1" />
    </Link>
  );
}
