import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Edit3,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  createService,
  deleteService,
  deleteSubmission,
  fetchInquiries,
  fetchOverview,
  fetchServices,
  updateService,
  updateSubmission,
  type InquiryRecord,
  type OverviewResponse,
  type ServiceRecord,
  type SubmissionStatus,
} from "@/lib/api";
import { cn } from "@/lib/utils";
import { AppleSelect } from "./AppleSelect";
import { SpotlightCard } from "./SpotlightCard";

type TravelTab = "inquiries" | "packages";

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

const PACKAGE_CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "multi-day", label: "Multi-Day Tours" },
  { value: "one-day", label: "One-Day Escapes" },
  { value: "pilgrimage", label: "Hajj & Umrah" },
  { value: "corporate", label: "Corporate & Custom" },
];

const CATEGORY_LABELS: Record<string, string> = {
  "multi-day": "Multi-Day Tour",
  "one-day": "One-Day Escape",
  pilgrimage: "Hajj & Umrah",
  corporate: "Corporate & Custom",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function TravelWorkspace() {
  const [tab, setTab] = useState<TravelTab>("inquiries");
  const [statusFilter, setStatusFilter] = useState<"ALL" | SubmissionStatus>("ALL");
  const [pkgCategory, setPkgCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [packages, setPackages] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inquiry drawer state
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [draftStatus, setDraftStatus] = useState<SubmissionStatus>("NEW");
  const [draftNotes, setDraftNotes] = useState("");
  const [savingInquiry, setSavingInquiry] = useState(false);
  const [confirmDeleteInquiry, setConfirmDeleteInquiry] = useState(false);
  const [deletingInquiry, setDeletingInquiry] = useState(false);

  // Package modal state
  const [editingPkg, setEditingPkg] = useState<ServiceRecord | null>(null);
  const [showPkgModal, setShowPkgModal] = useState(false);
  const [pkgTitle, setPkgTitle] = useState("");
  const [pkgCat, setPkgCat] = useState("multi-day");
  const [pkgDuration, setPkgDuration] = useState("");
  const [pkgRegion, setPkgRegion] = useState("");
  const [pkgSummary, setPkgSummary] = useState("");
  const [pkgHighlights, setPkgHighlights] = useState("");
  const [pkgSortOrder, setPkgSortOrder] = useState("10");
  const [pkgActive, setPkgActive] = useState(true);
  const [savingPkg, setSavingPkg] = useState(false);
  const [togglingPkgId, setTogglingPkgId] = useState<string | null>(null);
  const [confirmDeletePkgId, setConfirmDeletePkgId] = useState<string | null>(null);
  const [deletingPkgId, setDeletingPkgId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  const loadData = useCallback(async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) setLoading(true);
    setError(null);
    try {
      const [ov, inq, svcs] = await Promise.all([
        fetchOverview("travel"),
        fetchInquiries({ subsidiary: "travel", status: statusFilter, search }),
        fetchServices("travel", pkgCategory),
      ]);
      setOverview(ov);
      setInquiries(inq);
      setPackages(svcs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load travel workspace");
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  }, [statusFilter, search, pkgCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadData();
    }, 180);
    return () => clearTimeout(timer);
  }, [loadData]);

  const openInquiry = (item: InquiryRecord) => {
    setSelectedInquiry(item);
    setDraftStatus(item.status);
    setDraftNotes(item.adminNotes ?? "");
    setConfirmDeleteInquiry(false);
  };

  const handleSaveInquiry = async () => {
    if (!selectedInquiry) return;
    setSavingInquiry(true);
    try {
      await updateSubmission("inquiries", selectedInquiry.id, {
        status: draftStatus,
        adminNotes: draftNotes.trim() || null,
      });
      await loadData({ silent: true });
      setSelectedInquiry(null);
      showToast("Enquiry updated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update enquiry");
    } finally {
      setSavingInquiry(false);
    }
  };

  const handleDeleteInquiry = async () => {
    if (!selectedInquiry) return;
    setDeletingInquiry(true);
    try {
      await deleteSubmission("inquiries", selectedInquiry.id);
      await loadData({ silent: true });
      setSelectedInquiry(null);
      setConfirmDeleteInquiry(false);
      showToast("Enquiry deleted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete enquiry");
    } finally {
      setDeletingInquiry(false);
    }
  };

  const openNewPackageModal = () => {
    setEditingPkg(null);
    setPkgTitle("");
    setPkgCat("multi-day");
    setPkgDuration("");
    setPkgRegion("");
    setPkgSummary("");
    setPkgHighlights("");
    setPkgSortOrder(String(packages.length + 1));
    setPkgActive(true);
    setShowPkgModal(true);
  };

  const openEditPackageModal = (pkg: ServiceRecord) => {
    setEditingPkg(pkg);
    setPkgTitle(pkg.title);
    setPkgCat(pkg.category);
    setPkgDuration(pkg.details?.duration ?? "");
    setPkgRegion(pkg.details?.region ?? "");
    setPkgSummary(pkg.summary ?? "");
    setPkgHighlights(
      Array.isArray(pkg.details?.highlights) ? pkg.details.highlights.join(", ") : "",
    );
    setPkgSortOrder(String(pkg.sortOrder));
    setPkgActive(pkg.isActive);
    setShowPkgModal(true);
  };

  const handleSavePackage = async (e: FormEvent) => {
    e.preventDefault();
    if (!pkgTitle.trim()) return;
    setSavingPkg(true);
    setError(null);
    const highlightsArr = pkgHighlights
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const details = {
      duration: pkgDuration.trim() || "Custom",
      region: pkgRegion.trim() || "Pakistan",
      highlights: highlightsArr,
    };

    try {
      if (editingPkg) {
        await updateService(editingPkg.id, {
          title: pkgTitle.trim(),
          category: pkgCat,
          summary: pkgSummary.trim() || null,
          details,
          sortOrder: Number.parseInt(pkgSortOrder, 10) || 10,
          isActive: pkgActive,
        });
      } else {
        await createService({
          subsidiarySlug: "travel",
          title: pkgTitle.trim(),
          category: pkgCat,
          summary: pkgSummary.trim() || undefined,
          details,
          sortOrder: Number.parseInt(pkgSortOrder, 10) || packages.length + 1,
          isActive: pkgActive,
        });
      }
      await loadData({ silent: true });
      setShowPkgModal(false);
      showToast(editingPkg ? "Package updated" : "Package created");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save package");
    } finally {
      setSavingPkg(false);
    }
  };

  const handleTogglePackageActive = async (pkg: ServiceRecord) => {
    setTogglingPkgId(pkg.id);
    setError(null);
    try {
      await updateService(pkg.id, { isActive: !pkg.isActive });
      await loadData({ silent: true });
      showToast(pkg.isActive ? "Package paused" : "Package activated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update package status");
    } finally {
      setTogglingPkgId(null);
    }
  };

  const handleDeletePackage = async (pkg: ServiceRecord) => {
    setDeletingPkgId(pkg.id);
    setError(null);
    try {
      await deleteService(pkg.id);
      await loadData({ silent: true });
      setConfirmDeletePkgId(null);
      showToast("Package deleted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete package");
    } finally {
      setDeletingPkgId(null);
    }
  };

  const activePackagesCount = packages.filter((p) => p.isActive).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-jade">Subsidiary Workspace</p>
          <h1 className="display mt-2 text-[clamp(2rem,4vw,3rem)]">Aseer Travel &amp; Tours</h1>
          <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">
            Manage live trip enquiries from{" "}
            <span className="font-medium text-foreground">travel.theaseergroup.com</span> and
            publish or update curated tour packages.
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
            href="https://travel.theaseergroup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-jade hover:text-jade"
          >
            Visit site
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SpotlightCard className="rounded-2xl border border-border bg-white p-6">
          <p className="eyebrow">Trip Enquiries</p>
          <p className="display mt-3 text-3xl">{overview?.counts.inquiriesTotal ?? 0}</p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            <span className="font-semibold text-jade">{overview?.counts.inquiriesNew ?? 0}</span>{" "}
            awaiting review
          </p>
        </SpotlightCard>

        <SpotlightCard className="rounded-2xl border border-border bg-white p-6">
          <p className="eyebrow">Active Tour Packages</p>
          <p className="display mt-3 text-3xl">{activePackagesCount}</p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {packages.length} total in catalog
          </p>
        </SpotlightCard>

        <SpotlightCard className="rounded-2xl border border-border bg-white p-6">
          <p className="eyebrow">Public Endpoint</p>
          <p className="mt-3 font-mono text-[13px] font-semibold text-jade">
            /api/v1/subsidiaries/travel
          </p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Synced live with the Travel site
          </p>
        </SpotlightCard>
      </div>

      {/* Tabs + Controls */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-white p-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setTab("inquiries")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
              tab === "inquiries"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <MessageSquare className="size-3.5" />
            Trip Enquiries ({inquiries.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("packages")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
              tab === "packages"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Compass className="size-3.5" />
            Tour Packages ({packages.length})
          </button>
        </div>

        {tab === "inquiries" ? (
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-64 sm:flex-initial">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, package..."
                className="w-full rounded-full border border-border bg-secondary/40 py-2 pl-9 pr-4 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-jade focus:outline-none"
              />
            </div>
            <AppleSelect
              value={statusFilter}
              onChange={(v) => setStatusFilter(v as "ALL" | SubmissionStatus)}
              options={STATUS_OPTIONS.map((s) => ({
                value: s,
                label: s === "ALL" ? "All Statuses" : STATUS_LABELS[s],
              }))}
            />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2.5">
            <AppleSelect
              value={pkgCategory}
              onChange={setPkgCategory}
              options={PACKAGE_CATEGORIES}
            />
            <button
              type="button"
              onClick={openNewPackageModal}
              className="inline-flex items-center gap-1.5 rounded-full bg-jade px-4 py-2 text-[13px] font-medium text-white shadow-xs transition hover:opacity-90"
            >
              <Plus className="size-3.5" />
              Add Package
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4 text-[14px] text-destructive">
          {error}
        </div>
      )}

      {/* Tab Content */}
      {tab === "inquiries" ? (
        inquiries.length === 0 ? (
          <div className="rounded-3xl border border-border bg-white p-12 text-center">
            <p className="display text-xl">No trip enquiries yet</p>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Submissions from the Plan a Trip form on travel.theaseergroup.com will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {inquiries.map((inq) => {
              const pkgName =
                typeof inq.details?.packageName === "string" ? inq.details.packageName : null;
              const travelDates =
                typeof inq.details?.travelDates === "string" ? inq.details.travelDates : null;
              const travelers =
                typeof inq.details?.travelers === "string" ? inq.details.travelers : null;

              return (
                <button
                  key={inq.id}
                  type="button"
                  onClick={() => openInquiry(inq)}
                  className="w-full rounded-2xl border border-border bg-white p-5 text-left transition hover:border-jade/40 hover:shadow-md"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-foreground">{inq.fullName}</span>
                        <span
                          className={cn(
                            "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                            STATUS_BADGE[inq.status],
                          )}
                        >
                          {STATUS_LABELS[inq.status]}
                        </span>
                        {pkgName && (
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                            {pkgName}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-[14px] text-muted-foreground">
                        {inq.message}
                      </p>
                      {(travelDates || travelers) && (
                        <p className="mt-1.5 text-[12px] text-muted-foreground">
                          {travelDates ? `Dates: ${travelDates}` : ""}
                          {travelDates && travelers ? " · " : ""}
                          {travelers ? `Travellers: ${travelers}` : ""}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <p className="text-[12px] font-medium text-muted-foreground">
                        {formatDate(inq.createdAt)}
                      </p>
                      <p className="mt-1 text-[12px] text-jade">{inq.phone ?? inq.email}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                "flex flex-col justify-between rounded-2xl border bg-white p-6 transition",
                pkg.isActive ? "border-border" : "border-border/60 opacity-65",
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-jade-soft px-2.5 py-0.5 text-[11px] font-semibold text-jade">
                      {CATEGORY_LABELS[pkg.category] ?? pkg.category}
                    </span>
                    {pkg.details?.duration && (
                      <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground">
                        {pkg.details.duration}
                      </span>
                    )}
                    {!pkg.isActive && (
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                        Paused
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    #{pkg.sortOrder}
                  </span>
                </div>

                <h3 className="display mt-3 text-lg">{pkg.title}</h3>
                {pkg.details?.region && (
                  <p className="mt-0.5 text-[12px] font-medium text-jade">{pkg.details.region}</p>
                )}
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {pkg.summary}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                <button
                  type="button"
                  disabled={togglingPkgId === pkg.id || deletingPkgId === pkg.id}
                  onClick={() => void handleTogglePackageActive(pkg)}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  {togglingPkgId === pkg.id && <Loader2 className="size-3 animate-spin" />}
                  {togglingPkgId === pkg.id
                    ? pkg.isActive
                      ? "Pausing..."
                      : "Activating..."
                    : pkg.isActive
                      ? "Pause package"
                      : "Activate package"}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={togglingPkgId === pkg.id || deletingPkgId === pkg.id}
                    onClick={() => openEditPackageModal(pkg)}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-[12px] font-medium text-foreground hover:border-jade hover:text-jade disabled:opacity-50"
                  >
                    <Edit3 className="size-3" />
                    Edit
                  </button>
                  {confirmDeletePkgId === pkg.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={deletingPkgId === pkg.id}
                        onClick={() => void handleDeletePackage(pkg)}
                        className="inline-flex items-center gap-1 rounded-full bg-destructive px-3 py-1.5 text-[12px] font-medium text-white disabled:opacity-60"
                      >
                        {deletingPkgId === pkg.id && <Loader2 className="size-3 animate-spin" />}
                        {deletingPkgId === pkg.id ? "Deleting..." : "Confirm"}
                      </button>
                      <button
                        type="button"
                        disabled={deletingPkgId === pkg.id}
                        onClick={() => setConfirmDeletePkgId(null)}
                        className="text-[12px] text-muted-foreground hover:text-foreground disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={togglingPkgId === pkg.id}
                      onClick={() => setConfirmDeletePkgId(pkg.id)}
                      aria-label={`Delete ${pkg.title}`}
                      className="inline-flex items-center justify-center rounded-full border border-border p-1.5 text-muted-foreground hover:border-destructive/40 hover:text-destructive disabled:opacity-50"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inquiry Detail Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/25 backdrop-blur-xs">
          <div className="flex h-full w-full max-w-lg flex-col border-l border-border bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <p className="eyebrow text-jade">Trip Enquiry</p>
                <h2 className="display mt-0.5 text-xl">{selectedInquiry.fullName}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              <div className="flex flex-wrap gap-3 text-[13px]">
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-foreground hover:border-jade"
                >
                  <Mail className="size-3.5 text-jade" />
                  {selectedInquiry.email}
                </a>
                {selectedInquiry.phone && (
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-foreground hover:border-jade"
                  >
                    <Phone className="size-3.5 text-jade" />
                    {selectedInquiry.phone}
                  </a>
                )}
              </div>

              {selectedInquiry.details && (
                <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-[13px]">
                  <p className="eyebrow">Trip Details</p>
                  <dl className="mt-2.5 grid grid-cols-2 gap-2">
                    <div>
                      <dt className="text-muted-foreground">Package</dt>
                      <dd className="font-medium text-foreground">
                        {String(selectedInquiry.details.packageName ?? "Custom")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Category</dt>
                      <dd className="font-medium text-foreground">
                        {String(selectedInquiry.details.category ?? "General")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Preferred Dates</dt>
                      <dd className="font-medium text-foreground">
                        {String(selectedInquiry.details.travelDates ?? "Not specified")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Travellers</dt>
                      <dd className="font-medium text-foreground">
                        {String(selectedInquiry.details.travelers ?? "Not specified")}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}

              <div>
                <p className="eyebrow">Message</p>
                <p className="mt-2 whitespace-pre-wrap rounded-2xl border border-border bg-secondary/20 p-4 text-[14px] leading-relaxed text-foreground">
                  {selectedInquiry.message}
                </p>
              </div>

              <div>
                <label className="eyebrow block">Status</label>
                <div className="mt-2">
                  <AppleSelect
                    value={draftStatus}
                    onChange={(v) => setDraftStatus(v as SubmissionStatus)}
                    options={(Object.keys(STATUS_LABELS) as SubmissionStatus[]).map((s) => ({
                      value: s,
                      label: STATUS_LABELS[s],
                    }))}
                  />
                </div>
              </div>

              <div>
                <label className="eyebrow block">Admin Notes</label>
                <textarea
                  rows={4}
                  value={draftNotes}
                  onChange={(e) => setDraftNotes(e.target.value)}
                  placeholder="Quote sent, follow-up date, hotel availability..."
                  className="mt-2 w-full rounded-2xl border border-border bg-secondary/30 p-3.5 text-[14px] text-foreground focus:border-jade focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              {confirmDeleteInquiry ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={deletingInquiry}
                    onClick={() => void handleDeleteInquiry()}
                    className="rounded-full bg-destructive px-4 py-2 text-[13px] font-medium text-white"
                  >
                    {deletingInquiry ? "Deleting..." : "Confirm Delete"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteInquiry(false)}
                    className="text-[13px] text-muted-foreground"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDeleteInquiry(true)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-destructive"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </button>
              )}

              <button
                type="button"
                disabled={savingInquiry || deletingInquiry}
                onClick={() => void handleSaveInquiry()}
                className="inline-flex items-center gap-2 rounded-full bg-jade px-6 py-2.5 text-[13px] font-semibold text-white shadow-xs transition hover:opacity-90 disabled:opacity-60"
              >
                {savingInquiry && <Loader2 className="size-3.5 animate-spin" />}
                {savingInquiry ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Package Modal */}
      {showPkgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="display text-2xl">
                {editingPkg ? "Edit Tour Package" : "Add Tour Package"}
              </h2>
              <button
                type="button"
                onClick={() => setShowPkgModal(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={(e) => void handleSavePackage(e)} className="mt-5 space-y-4">
              <div>
                <label className="eyebrow block">Package Title *</label>
                <input
                  type="text"
                  required
                  value={pkgTitle}
                  onChange={(e) => setPkgTitle(e.target.value)}
                  placeholder="5-Day Hunza Valley"
                  className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-[14px] focus:border-jade focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="eyebrow block">Category</label>
                  <div className="mt-1.5">
                    <AppleSelect
                      value={pkgCat}
                      onChange={setPkgCat}
                      options={PACKAGE_CATEGORIES.filter((c) => c.value !== "all")}
                    />
                  </div>
                </div>
                <div>
                  <label className="eyebrow block">Duration</label>
                  <input
                    type="text"
                    value={pkgDuration}
                    onChange={(e) => setPkgDuration(e.target.value)}
                    placeholder="5 Days"
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-[14px] focus:border-jade focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="eyebrow block">Region</label>
                  <input
                    type="text"
                    value={pkgRegion}
                    onChange={(e) => setPkgRegion(e.target.value)}
                    placeholder="Gilgit-Baltistan"
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-[14px] focus:border-jade focus:outline-none"
                  />
                </div>
                <div>
                  <label className="eyebrow block">Display Order</label>
                  <input
                    type="number"
                    min={0}
                    value={pkgSortOrder}
                    onChange={(e) => setPkgSortOrder(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-[14px] focus:border-jade focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="eyebrow block">Summary</label>
                <textarea
                  rows={3}
                  value={pkgSummary}
                  onChange={(e) => setPkgSummary(e.target.value)}
                  placeholder="Short itinerary description..."
                  className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 p-3.5 text-[14px] focus:border-jade focus:outline-none"
                />
              </div>

              <div>
                <label className="eyebrow block">Highlights (comma-separated)</label>
                <input
                  type="text"
                  value={pkgHighlights}
                  onChange={(e) => setPkgHighlights(e.target.value)}
                  placeholder="Guided heritage stops, Mountain accommodation, Bonfire evening"
                  className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-[14px] focus:border-jade focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2.5 text-[13px] font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={pkgActive}
                  onChange={(e) => setPkgActive(e.target.checked)}
                  className="size-4 accent-jade"
                />
                Visible on travel.theaseergroup.com
              </label>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  disabled={savingPkg}
                  onClick={() => setShowPkgModal(false)}
                  className="rounded-full border border-border px-5 py-2 text-[13px] font-medium text-foreground disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPkg}
                  className="inline-flex items-center gap-2 rounded-full bg-jade px-6 py-2 text-[13px] font-semibold text-white shadow-xs transition hover:opacity-90 disabled:opacity-60"
                >
                  {savingPkg && <Loader2 className="size-3.5 animate-spin" />}
                  {savingPkg ? "Saving..." : editingPkg ? "Save Package" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-jade/25 bg-white px-4 py-2.5 text-[13px] font-medium text-foreground shadow-lg">
          <CheckCircle2 className="size-4 text-jade" />
          {toast}
        </div>
      )}
    </div>
  );
}
