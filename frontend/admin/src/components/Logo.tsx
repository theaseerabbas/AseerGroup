import logoImg from "@/assets/aseer-group.jpeg";

export function Logo() {
  return (
    <span className="inline-flex shrink-0 items-center gap-3">
      <span className="inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 shadow-xs ring-1 ring-black/8 md:size-12">
        <img
          src={logoImg}
          alt="The Aseer Group"
          className="size-full object-contain mix-blend-multiply"
        />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-foreground md:text-[16px]">
        The Aseer Group
      </span>
    </span>
  );
}
