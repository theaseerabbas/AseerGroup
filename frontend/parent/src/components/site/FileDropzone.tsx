import { useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

type FileDropzoneProps = {
  label: string;
  hint: string;
  accept: string;
  maxSizeMb: number;
  file: File | null;
  error?: string | undefined;
  onFileChange: (file: File | null, error?: string) => void;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileDropzone({
  label,
  hint,
  accept,
  maxSizeMb,
  file,
  error,
  onFileChange,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const allowedExtensions = accept
    .split(",")
    .map((ext) => ext.trim().toLowerCase())
    .filter(Boolean);

  const validateAndSelect = (picked: File | null) => {
    if (!picked) {
      onFileChange(null);
      return;
    }
    const lowerName = picked.name.toLowerCase();
    const validType = allowedExtensions.some((ext) => lowerName.endsWith(ext));
    if (!validType) {
      onFileChange(null, `Unsupported file type. Allowed: ${allowedExtensions.join(", ")}`);
      return;
    }
    if (picked.size > maxSizeMb * 1024 * 1024) {
      onFileChange(null, `File exceeds the ${maxSizeMb} MB size limit.`);
      return;
    }
    onFileChange(picked);
  };

  return (
    <div>
      <span className="eyebrow">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => validateAndSelect(e.target.files?.[0] ?? null)}
      />

      {file ? (
        <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl border border-jade/35 bg-jade-soft/50 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-jade shadow-xs ring-1 ring-jade/15">
              <FileText className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-medium text-foreground">{file.name}</p>
              <p className="text-[12px] text-muted-foreground">{formatBytes(file.size)}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Remove attached file"
            onClick={() => {
              if (inputRef.current) inputRef.current.value = "";
              onFileChange(null);
            }}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-white text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            validateAndSelect(e.dataTransfer.files?.[0] ?? null);
          }}
          className={cn(
            "mt-3 flex w-full flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-8 text-center transition-all duration-300",
            dragging
              ? "border-jade bg-jade-soft/60"
              : error
                ? "border-destructive/60 bg-destructive/5"
                : "border-input bg-background hover:border-jade/50 hover:bg-jade-soft/30",
          )}
        >
          <span className="grid size-11 place-items-center rounded-2xl bg-jade-soft text-jade">
            <Upload className="size-5" />
          </span>
          <p className="mt-3 text-[15px] font-medium text-foreground">
            Click to upload or drag and drop
          </p>
          <p className="mt-1 text-[13px] text-muted-foreground">{hint}</p>
        </button>
      )}

      {error && <p className="mt-2 text-[13px] text-destructive">{error}</p>}
    </div>
  );
}
