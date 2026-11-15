import { useCallback, useEffect, useState } from "react";
import {
  Briefcase,
  ExternalLink,
  Lightbulb,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  deleteSubmission,
  fetchCareers,
  fetchInquiries,
  fetchOverview,
  fetchPitches,
  updateSubmission,
  type CareerRecord,
  type InquiryRecord,
  type OverviewResponse,
  type PitchRecord,
  type SubmissionStatus,
} from "@/lib/api";
import { cn } from "@/lib/utils";
import { AppleSelect } from "./AppleSelect";
import { SpotlightCard } from "./SpotlightCard";

type TabKind = "careers" | "pitches" | "inquiries";

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

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

type ActiveSelection =
  | { kind: "careers"; item: CareerRecord }
  | { kind: "pitches"; item: PitchRecord }
  | { kind: "inquiries"; item: InquiryRecord }
  | null;

export function GroupWorkspace() {
  const [tab, setTab] = useState<TabKind>("careers");
  const [statusFilter, setStatusFilter] = useState<"ALL" | SubmissionStatus>("ALL");
  const [search, setSearch] = useState("");
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [careers, setCareers] = useState<CareerRecord[]>([]);
  const [pitches, setPitches] = useState<PitchRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<ActiveSelection>(null);
  const [draftStatus, setDraftStatus] = useState<SubmissionStatus>("NEW");
  const [draftNotes, setDraftNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ov, c, p, inq] = await Promise.all([
        fetchOverview("parent"),
        fetchCareers({ subsidiary: "parent", status: statusFilter, search }),
        fetchPitches({ subsidiary: "parent", status: statusFilter, search }),
        fetchInquiries({ subsidiary: "parent", status: statusFilter, search }),
      ]);
      setOverview(ov);
      setCareers(c);
      setPitches(p);
      setInquiries(inq);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const openDetail = (sel: ActiveSelection) => {
    setSelected(sel);
    setConfirmDelete(false);
    if (sel) {
      setDraftStatus(sel.item.status);
      setDraftNotes(sel.item.adminNotes ?? "");
    }
  };

  const saveDetail = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await updateSubmission(selected.kind, selected.item.id, {
        status: draftStatus,
        adminNotes: draftNotes.trim() || null,
      });
      setSelected(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update record.");
    } finally {
      setSaving(false);
    }
  };

  const removeSelected = async () => {
    if (!selected) return;
    setDeleting(true);
    try {
      await deleteSubmission(selected.kind, selected.item.id);
      setSelected(null);
      setConfirmDelete(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete record.");
    } finally {
      setDeleting(false);
    }
  };

  const counts = overview?.counts;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-jade">Parent Website · theaseergroup.com</p>
          <h1 className="display mt-2 text-[clamp(2rem,4vw,3rem)]">
            The Aseer Group <span className="serif-i text-jade">inbox.</span>
          </h1>
        </div>
        <button
          type="button"
          onClick={() => void loadData()}
          className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-jade hover:text-jade"
        >
          <RefreshCw className={cn("size-3.5", loading && "animate-spin")} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SpotlightCard className="rounded-[1.5rem] border border-border bg-card p-6">
          <p className="eyebrow">Careers</p>
          <p className="display mt-3 text-3xl tabular-nums">{counts?.careersTotal ?? 0}</p>
          <p className="mt-1.5 text-[13px] text-jade">{counts?.careersNew ?? 0} new applications</p>
        </SpotlightCard>
        <SpotlightCard className="rounded-[1.5rem] border border-border bg-card p-6">
          <p className="eyebrow">Pitch Ideas</p>
          <p className="display mt-3 text-3xl tabular-nums">{counts?.pitchesTotal ?? 0}</p>
          <p className="mt-1.5 text-[13px] text-jade">{counts?.pitchesNew ?? 0} new pitches</p>
        </SpotlightCard>
        <SpotlightCard className="rounded-[1.5rem] border border-border bg-card p-6">
          <p className="eyebrow">Inquiries</p>
          <p className="display mt-3 text-3xl tabular-nums">{counts?.inquiriesTotal ?? 0}</p>
          <p className="mt-1.5 text-[13px] text-jade">{counts?.inquiriesNew ?? 0} new inquiries</p>
        </SpotlightCard>
        <SpotlightCard className="bg-pattern-jade rounded-[1.5rem] border border-jade/15 p-6">
          <p className="eyebrow text-jade">Needs Review</p>
          <p className="display mt-3 text-3xl tabular-nums text-foreground">
            {counts?.pendingTotal ?? 0}
          </p>
          <p className="mt-1.5 text-[13px] text-muted-foreground">Total unread across forms</p>
        </SpotlightCard>
      </div>

      <div className="rounded-[2rem] border border-border bg-card p-5 md:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 lg:flex-row lg:items-center">
          <div className="inline-flex flex-wrap gap-1.5 rounded-full border border-black/[0.06] bg-white p-1">
            {(
              [
                { id: "careers", label: "Careers", icon: Briefcase, count: careers.length },
                { id: "pitches", label: "Pitch Ideas", icon: Lightbulb, count: pitches.length },
                {
                  id: "inquiries",
                  label: "Inquiries",
                  icon: MessageSquare,
                  count: inquiries.length,
                },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                  {item.label}
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] tabular-nums",
                      active ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64 sm:flex-none">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, title..."
                className="w-full rounded-full border border-input bg-white py-2 pl-10 pr-4 text-[13px] outline-none transition-all focus:border-jade focus:ring-4 focus:ring-jade/10"
              />
            </div>

            <AppleSelect
              value={statusFilter}
              onChange={setStatusFilter}
              variant="pill"
              className="w-40"
              options={STATUS_OPTIONS.map((st) => ({
                value: st,
                label: st === "ALL" ? "All statuses" : STATUS_LABELS[st],
              }))}
            />
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-[14px] text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 space-y-3">
          {loading ? (
            <p className="py-12 text-center text-[14px] text-muted-foreground">
              Loading submissions...
            </p>
          ) : tab === "careers" ? (
            careers.length === 0 ? (
              <EmptyState label="No career applications match your filters yet." />
            ) : (
              careers.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openDetail({ kind: "careers", item })}
                  className="flex w-full flex-col justify-between gap-4 rounded-2xl border border-border bg-white p-5 text-left transition-all duration-300 hover:border-jade/40 hover:shadow-xs md:flex-row md:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[16px] font-semibold text-foreground">
                        {item.fullName}
                      </span>
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[12px] text-muted-foreground">
                        {item.areaOfInterest}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[13px] text-muted-foreground">
                      {item.email} · {item.phone}
                      {item.city ? ` · ${item.city}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <span className="text-[12px] tabular-nums text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </span>
                    <StatusPill status={item.status} />
                  </div>
                </button>
              ))
            )
          ) : tab === "pitches" ? (
            pitches.length === 0 ? (
              <EmptyState label="No venture pitches match your filters yet." />
            ) : (
              pitches.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openDetail({ kind: "pitches", item })}
                  className="flex w-full flex-col justify-between gap-4 rounded-2xl border border-border bg-white p-5 text-left transition-all duration-300 hover:border-jade/40 hover:shadow-xs md:flex-row md:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[16px] font-semibold text-foreground">
                        {item.ventureTitle}
                      </span>
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[12px] text-muted-foreground">
                        {item.sector} · {item.stage}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[13px] text-muted-foreground">
                      {item.founderName} · {item.email} · {item.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <span className="text-[12px] tabular-nums text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </span>
                    <StatusPill status={item.status} />
                  </div>
                </button>
              ))
            )
          ) : inquiries.length === 0 ? (
            <EmptyState label="No inquiries match your filters yet." />
          ) : (
            inquiries.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openDetail({ kind: "inquiries", item })}
                className="flex w-full flex-col justify-between gap-4 rounded-2xl border border-border bg-white p-5 text-left transition-all duration-300 hover:border-jade/40 hover:shadow-xs md:flex-row md:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[16px] font-semibold text-foreground">
                      {item.fullName}
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[12px] text-muted-foreground">
                      {item.subject || item.type}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[13px] text-muted-foreground">
                    {item.email}
                    {item.company ? ` · ${item.company}` : ""} · {item.message}
                  </p>
                </div>
                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className="text-[12px] tabular-nums text-muted-foreground">
                    {formatDate(item.createdAt)}
                  </span>
                  <StatusPill status={item.status} />
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-xs"
          onClick={() => setSelected(null)}
        >
          <aside
            className="flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-border bg-white p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
              <div>
                <p className="eyebrow text-jade">
                  {selected.kind === "careers"
                    ? "Career Application"
                    : selected.kind === "pitches"
                      ? "Venture Pitch"
                      : "Contact Inquiry"}
                </p>
                <h2 className="display mt-2 text-2xl">
                  {selected.kind === "pitches"
                    ? selected.item.ventureTitle
                    : selected.item.fullName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close detail panel"
                className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-6 text-[14px]">
              <div className="grid gap-3 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-foreground">
                  <Mail className="size-4 text-jade" />
                  <a href={`mailto:${selected.item.email}`} className="underline-offset-4 hover:underline">
                    {selected.item.email}
                  </a>
                </div>
                {selected.item.phone && (
                  <div className="flex items-center gap-2 text-foreground">
                    <Phone className="size-4 text-jade" />
                    <span>{selected.item.phone}</span>
                  </div>
                )}
              </div>

              {selected.kind === "careers" && (
                <>
                  <DetailBlock label="Area of Interest" value={selected.item.areaOfInterest} />
                  {selected.item.city && <DetailBlock label="City" value={selected.item.city} />}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={selected.item.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-jade px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-primary"
                    >
                      Open Resume Link
                      <ExternalLink className="size-3.5" />
                    </a>
                    {selected.item.portfolioUrl && (
                      <a
                        href={selected.item.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-jade hover:text-jade"
                      >
                        Open Portfolio
                        <ExternalLink className="size-3.5" />
                      </a>
                    )}
                  </div>
                  {selected.item.coverNote && (
                    <DetailBlock label="Cover Note" value={selected.item.coverNote} />
                  )}
                </>
              )}

              {selected.kind === "pitches" && (
                <>
                  <DetailBlock
                    label="Founder"
                    value={`${selected.item.founderName}${selected.item.city ? ` (${selected.item.city})` : ""}`}
                  />
                  <DetailBlock
                    label="Sector & Stage"
                    value={`${selected.item.sector} · ${selected.item.stage}`}
                  />
                  <DetailBlock label="Executive Summary" value={selected.item.executiveSummary} />
                  {selected.item.proposalUrl && (
                    <a
                      href={selected.item.proposalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-jade px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-primary"
                    >
                      Open Proposal / Pitch Deck
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </>
              )}

              {selected.kind === "inquiries" && (
                <>
                  <DetailBlock
                    label="Topic / Type"
                    value={selected.item.subject || selected.item.type}
                  />
                  {selected.item.company && (
                    <DetailBlock label="Organization" value={selected.item.company} />
                  )}
                  <DetailBlock label="Message" value={selected.item.message} />
                </>
              )}

              <div className="space-y-4 border-t border-border pt-6">
                <div>
                  <span className="eyebrow">Review Status</span>
                  <AppleSelect
                    value={draftStatus}
                    onChange={setDraftStatus}
                    variant="field"
                    className="mt-2"
                    options={(Object.keys(STATUS_LABELS) as SubmissionStatus[]).map((st) => ({
                      value: st,
                      label: STATUS_LABELS[st],
                    }))}
                  />
                </div>

                <label className="block">
                  <span className="eyebrow">Internal Admin Notes</span>
                  <textarea
                    rows={3}
                    value={draftNotes}
                    onChange={(e) => setDraftNotes(e.target.value)}
                    placeholder="Add internal review notes or follow-up details..."
                    className="mt-2 w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-[14px] outline-none focus:border-jade"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
              {confirmDelete ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={() => void removeSelected()}
                    className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    <Trash2 className="size-3.5" />
                    {deleting ? "Deleting..." : "Confirm delete"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="rounded-full px-3 py-2 text-[13px] text-muted-foreground hover:text-foreground"
                  >
                    Keep
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-destructive/25 px-4 py-2 text-[13px] font-medium text-destructive transition-colors hover:bg-destructive/5"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </button>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full border border-border px-5 py-2.5 text-[14px] font-medium text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void saveDetail()}
                  className="rounded-full bg-primary px-6 py-2.5 text-[14px] font-medium text-primary-foreground transition-colors hover:bg-jade disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: SubmissionStatus }) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wider",
        STATUS_BADGE[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="mt-1.5 whitespace-pre-wrap text-[14px] leading-relaxed text-foreground">
        {value}
      </p>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white/70 py-14 text-center">
      <p className="text-[14px] text-muted-foreground">{label}</p>
    </div>
  );
}
