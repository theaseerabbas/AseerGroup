import { useCallback, useEffect, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import {
  deleteSubmission,
  fetchInquiries,
  fetchOverview,
  updateSubmission,
  type InquiryRecord,
  type OverviewResponse,
  type SubmissionStatus,
} from "@/lib/api";
import { cn } from "@/lib/utils";
import { AppleSelect } from "./AppleSelect";
import { SpotlightCard } from "./SpotlightCard";

const STATUS_OPTIONS: ("ALL" | SubmissionStatus)[] = [
  "ALL",
  "NEW",
  "IN_REVIEW",
  "CONTACTED",
  "RESOLVED",
  "ARCHIVED",
];

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  NEW: "New",
  IN_REVIEW: "In Review",
  CONTACTED: "Contacted",
  RESOLVED: "Resolved",
  ARCHIVED: "Archived",
};

const STATUS_BADGE: Record<SubmissionStatus, string> = {
  NEW: "bg-jade-soft text-jade border-jade/20",
  IN_REVIEW: "bg-amber-50 text-amber-800 border-amber-200",
  CONTACTED: "bg-sky-50 text-sky-800 border-sky-200",
  RESOLVED: "bg-emerald-50 text-emerald-800 border-emerald-200",
  ARCHIVED: "bg-secondary text-muted-foreground border-border",
};

const DEPARTMENT_FILTERS = [
  "ALL",
  "Business Development (BD)",
  "Sales Team",
  "Customer Support",
  "Full R·I·S·E Revenue Pod",
];

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function getDetailString(details: Record<string, unknown> | null, key: string): string | null {
  if (!details) return null;
  const val = details[key];
  return typeof val === "string" && val.trim() ? val.trim() : null;
}

export function RiseWorkspace() {
  const [statusFilter, setStatusFilter] = useState<"ALL" | SubmissionStatus>("ALL");
  const [deptFilter, setDeptFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<InquiryRecord | null>(null);
  const [draftStatus, setDraftStatus] = useState<SubmissionStatus>("NEW");
  const [draftNotes, setDraftNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ov, list] = await Promise.all([
        fetchOverview("the-rise"),
        fetchInquiries({
          subsidiary: "the-rise",
          status: statusFilter,
          search,
        }),
      ]);
      setOverview(ov);
      setInquiries(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load The Rise inquiries.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadData();
    }, 180);
    return () => window.clearTimeout(timer);
  }, [loadData]);

  const openDrawer = (item: InquiryRecord) => {
    setSelected(item);
    setDraftStatus(item.status);
    setDraftNotes(item.adminNotes ?? "");
    setConfirmDelete(false);
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await updateSubmission("inquiries", selected.id, {
        status: draftStatus,
        adminNotes: draftNotes.trim() || null,
      });
      setSelected(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update inquiry.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setDeleting(true);
    try {
      await deleteSubmission("inquiries", selected.id);
      setSelected(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete inquiry.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    if (deptFilter === "ALL") return true;
    const dept = getDetailString(item.details, "department");
    return dept === deptFilter;
  });

  const bdCount = inquiries.filter(
    (i) => getDetailString(i.details, "department") === "Business Development (BD)",
  ).length;
  const salesSupportCount = inquiries.filter((i) => {
    const d = getDetailString(i.details, "department");
    return d === "Sales Team" || d === "Customer Support" || d === "Full R·I·S·E Revenue Pod";
  }).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-jade">Reach • Influence • Strategy • Expansion</p>
          <h1 className="display mt-2 text-[clamp(2rem,4vw,3rem)]">The Rise</h1>
          <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">
            Commercial growth desk inquiries across Business Development (BD), Sales Teams, and
            Customer Support.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => void loadData()}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-jade hover:text-jade"
          >
            <RefreshCw className={cn("size-3.5", loading && "animate-spin")} />
            Refresh
          </button>
          <a
            href="https://rise.theaseergroup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-jade hover:text-jade"
          >
            Visit site
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SpotlightCard className="rounded-3xl border border-border bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Total Inquiries</span>
            <TrendingUp className="size-4 text-jade" />
          </div>
          <p className="display mt-3 text-3xl tabular-nums">
            {overview?.counts.inquiriesTotal ?? inquiries.length}
          </p>
        </SpotlightCard>

        <SpotlightCard className="rounded-3xl border border-border bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow">New / Unread</span>
            <span className="size-2 rounded-full bg-jade" />
          </div>
          <p className="display mt-3 text-3xl tabular-nums text-jade">
            {overview?.counts.inquiriesNew ??
              inquiries.filter((i) => i.status === "NEW").length}
          </p>
        </SpotlightCard>

        <SpotlightCard className="rounded-3xl border border-border bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow">BD &amp; Partnerships</span>
            <Building2 className="size-4 text-muted-foreground" />
          </div>
          <p className="display mt-3 text-3xl tabular-nums">{bdCount}</p>
        </SpotlightCard>

        <SpotlightCard className="rounded-3xl border border-border bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Sales &amp; Support Desks</span>
            <MessageSquare className="size-4 text-muted-foreground" />
          </div>
          <p className="display mt-3 text-3xl tabular-nums">{salesSupportCount}</p>
        </SpotlightCard>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-white p-5 shadow-xs lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_OPTIONS.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors",
                statusFilter === st
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {st === "ALL" ? "All Statuses" : STATUS_LABELS[st]}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="w-full sm:w-56">
            <AppleSelect
              value={deptFilter}
              onChange={setDeptFilter}
              options={DEPARTMENT_FILTERS.map((d) => ({
                value: d,
                label: d === "ALL" ? "All Departments" : d,
              }))}
            />
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search client, company..."
              className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-4 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-jade focus:outline-none"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-[13px] text-destructive">
          {error}
        </div>
      )}

      {/* List */}
      {loading && inquiries.length === 0 ? (
        <div className="grid place-items-center rounded-3xl border border-border bg-white py-20 text-[14px] text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Loader2 className="size-4 animate-spin text-jade" />
            Loading The Rise inquiries...
          </span>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-white/70 py-16 text-center">
          <p className="text-[15px] font-medium text-foreground">No inquiries found</p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            New requests submitted on rise.theaseergroup.com will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredInquiries.map((item) => {
            const dept = getDetailString(item.details, "department");
            const model = getDetailString(item.details, "engagementModel");
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => openDrawer(item)}
                className="group w-full rounded-3xl border border-border bg-white p-6 text-left shadow-xs transition-all hover:-translate-y-0.5 hover:border-jade/40 hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[16px] font-semibold text-foreground group-hover:text-jade">
                        {item.fullName}
                      </span>
                      {item.company && (
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {item.company}
                        </span>
                      )}
                      {dept && (
                        <span className="rounded-full bg-jade-soft px-2.5 py-0.5 text-[11px] font-medium text-jade">
                          {dept}
                        </span>
                      )}
                      {model && (
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground">
                          {model}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-[13px] text-muted-foreground">
                      {item.email}
                      {item.phone ? ` · ${item.phone}` : ""}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2.5">
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-[11px] font-semibold",
                        STATUS_BADGE[item.status],
                      )}
                    >
                      {STATUS_LABELS[item.status]}
                    </span>
                    <span className="text-[12px] text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>

                <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-foreground/85">
                  {item.message}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail Drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs"
          onClick={() => setSelected(null)}
        >
          <div
            className="flex h-full w-full max-w-lg flex-col justify-between overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="eyebrow text-jade">Commercial Desk Inquiry</p>
                  <h2 className="display mt-1 text-2xl">{selected.fullName}</h2>
                  {selected.company && (
                    <p className="mt-0.5 text-[13px] text-muted-foreground">{selected.company}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-[12px]">
                <a
                  href={`mailto:${selected.email}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-medium text-foreground hover:border-jade hover:text-jade"
                >
                  <Mail className="size-3.5" />
                  {selected.email}
                </a>
                {selected.phone && (
                  <a
                    href={`tel:${selected.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-medium text-foreground hover:border-jade hover:text-jade"
                  >
                    <Phone className="size-3.5" />
                    {selected.phone}
                  </a>
                )}
              </div>

              <div className="grid gap-3 rounded-2xl border border-border bg-secondary/40 p-4 text-[13px] sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Department
                  </p>
                  <p className="mt-1 font-medium text-foreground">
                    {getDetailString(selected.details, "department") ?? selected.type}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Engagement Model
                  </p>
                  <p className="mt-1 font-medium text-foreground">
                    {getDetailString(selected.details, "engagementModel") ?? "Standard"}
                  </p>
                </div>
              </div>

              <div>
                <p className="eyebrow">Client Brief</p>
                <p className="mt-2 whitespace-pre-wrap rounded-2xl border border-border bg-background p-4 text-[14px] leading-relaxed text-foreground">
                  {selected.message}
                </p>
              </div>

              <div className="space-y-4 border-t border-border pt-5">
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </label>
                  <AppleSelect
                    value={draftStatus}
                    onChange={(v) => setDraftStatus(v as SubmissionStatus)}
                    options={(
                      ["NEW", "IN_REVIEW", "CONTACTED", "RESOLVED", "ARCHIVED"] as SubmissionStatus[]
                    ).map((s) => ({
                      value: s,
                      label: STATUS_LABELS[s],
                    }))}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Internal Admin Notes
                  </label>
                  <textarea
                    rows={4}
                    value={draftNotes}
                    onChange={(e) => setDraftNotes(e.target.value)}
                    placeholder="Follow-up owner, proposal sent, next call date..."
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-jade focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-5">
              {confirmDelete ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={() => void handleDelete()}
                    className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90 disabled:opacity-60"
                  >
                    {deleting && <Loader2 className="size-3.5 animate-spin" />}
                    Confirm Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="rounded-full border border-border px-3 py-2 text-[13px] text-muted-foreground"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13px] font-medium text-destructive hover:border-destructive/40"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </button>
              )}

              <button
                type="button"
                disabled={saving}
                onClick={() => void handleSave()}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-[13px] font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="size-3.5" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
