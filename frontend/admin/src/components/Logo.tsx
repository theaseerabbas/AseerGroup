import logoImg from "@/assets/aseer-group.jpeg";

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src={logoImg}
        alt="The Aseer Group"
        width={40}
        height={40}
        className="size-9 rounded-full object-cover ring-1 ring-black/10"
      />
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        The Aseer Group
      </span>
    </span>
  );
}
