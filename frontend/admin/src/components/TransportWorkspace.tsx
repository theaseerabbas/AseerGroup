import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Edit3,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Truck,
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

type TransportTab = "inquiries" | "fleet";

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

const FLEET_CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "hatchback", label: "Hatchback" },
  { value: "sedan", label: "Sedan" },
  { value: "4x4", label: "4x4 & SUV" },
  { value: "luxury", label: "Luxury" },
  { value: "vans-buses", label: "Van / Bus" },
];

const CATEGORY_LABELS: Record<string, string> = {
  hatchback: "Hatchback",
  sedan: "Sedan",
  "4x4": "4x4 & SUV",
  luxury: "Luxury",
  "vans-buses": "Van / Bus",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function TransportWorkspace() {
  const [tab, setTab] = useState<TransportTab>("inquiries");
  const [statusFilter, setStatusFilter] = useState<"ALL" | SubmissionStatus>("ALL");
  const [fleetCategory, setFleetCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [fleet, setFleet] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inquiry drawer state
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [draftStatus, setDraftStatus] = useState<SubmissionStatus>("NEW");
  const [draftNotes, setDraftNotes] = useState("");
  const [savingInquiry, setSavingInquiry] = useState(false);
  const [confirmDeleteInquiry, setConfirmDeleteInquiry] = useState(false);
  const [deletingInquiry, setDeletingInquiry] = useState(false);

  // Vehicle modal & card action states
  const [editingVehicle, setEditingVehicle] = useState<ServiceRecord | null>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [vehTitle, setVehTitle] = useState("");
  const [vehCat, setVehCat] = useState("sedan");
  const [vehSeats, setVehSeats] = useState("");
  const [vehDriver, setVehDriver] = useState("");
  const [vehUseCase, setVehUseCase] = useState("");
  const [vehImageUrl, setVehImageUrl] = useState("");
  const [vehSortOrder, setVehSortOrder] = useState("10");
  const [vehActive, setVehActive] = useState(true);
  const [savingVeh, setSavingVeh] = useState(false);
  const [togglingVehId, setTogglingVehId] = useState<string | null>(null);
  const [confirmDeleteVehId, setConfirmDeleteVehId] = useState<string | null>(null);
  const [deletingVehId, setDeletingVehId] = useState<string | null>(null);
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
        fetchOverview("transport"),
        fetchInquiries({ subsidiary: "transport", status: statusFilter, search }),
        fetchServices("transport", fleetCategory),
      ]);
      setOverview(ov);
      setInquiries(inq);
      setFleet(svcs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load transport workspace");
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  }, [statusFilter, search, fleetCategory]);

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
      showToast("Booking enquiry updated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update booking enquiry");
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
      showToast("Booking enquiry deleted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete booking enquiry");
    } finally {
      setDeletingInquiry(false);
    }
  };

  const openNewVehicleModal = () => {
    setEditingVehicle(null);
    setVehTitle("");
    setVehCat("sedan");
    setVehSeats("4–5 Seats");
    setVehDriver("With or without driver");
    setVehUseCase("");
    setVehImageUrl("");
    setVehSortOrder(String(fleet.length + 1));
    setVehActive(true);
    setShowVehicleModal(true);
  };

  const openEditVehicleModal = (veh: ServiceRecord) => {
    setEditingVehicle(veh);
    setVehTitle(veh.title);
    setVehCat(veh.category);
    setVehSeats(typeof veh.details?.seats === "string" ? veh.details.seats : "");
    setVehDriver(
      typeof veh.details?.driverOption === "string" ? veh.details.driverOption : "",
    );
    setVehUseCase(veh.summary ?? "");
    setVehImageUrl(typeof veh.details?.imageUrl === "string" ? veh.details.imageUrl : "");
    setVehSortOrder(String(veh.sortOrder));
    setVehActive(veh.isActive);
    setShowVehicleModal(true);
  };

  const handleSaveVehicle = async (e: FormEvent) => {
    e.preventDefault();
    if (!vehTitle.trim()) return;
    setSavingVeh(true);
    setError(null);

    const details = {
      categoryLabel: CATEGORY_LABELS[vehCat] ?? vehCat,
      seats: vehSeats.trim() || "4–5 Seats",
      driverOption: vehDriver.trim() || "With or without driver",
      ...(vehImageUrl.trim() ? { imageUrl: vehImageUrl.trim() } : {}),
    };

    try {
      if (editingVehicle) {
        await updateService(editingVehicle.id, {
          title: vehTitle.trim(),
          category: vehCat,
          summary: vehUseCase.trim() || null,
          details,
          sortOrder: Number.parseInt(vehSortOrder, 10) || 10,
          isActive: vehActive,
        });
      } else {
        await createService({
          subsidiarySlug: "transport",
          title: vehTitle.trim(),
          category: vehCat,
          summary: vehUseCase.trim() || undefined,
          details,
          sortOrder: Number.parseInt(vehSortOrder, 10) || fleet.length + 1,
          isActive: vehActive,
        });
      }
      await loadData({ silent: true });
      setShowVehicleModal(false);
      showToast(editingVehicle ? "Vehicle updated" : "Vehicle added to fleet");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save vehicle");
    } finally {
      setSavingVeh(false);
    }
  };

  const handleToggleVehicleActive = async (veh: ServiceRecord) => {
    setTogglingVehId(veh.id);
    setError(null);
    try {
      await updateService(veh.id, { isActive: !veh.isActive });
      await loadData({ silent: true });
      showToast(veh.isActive ? "Vehicle paused" : "Vehicle activated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update vehicle status");
    } finally {
      setTogglingVehId(null);
    }
  };

  const handleDeleteVehicle = async (veh: ServiceRecord) => {
    setDeletingVehId(veh.id);
    setError(null);
    try {
      await deleteService(veh.id);
      await loadData({ silent: true });
      setConfirmDeleteVehId(null);
      showToast("Vehicle removed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete vehicle");
    } finally {
      setDeletingVehId(null);
    }
  };

  const activeFleetCount = fleet.filter((f) => f.isActive).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-jade">Subsidiary Workspace</p>
          <h1 className="display mt-2 text-[clamp(2rem,4vw,3rem)]">
            Aseer Transport Services
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">
            Manage ride &amp; contract bookings from{" "}
            <span className="font-medium text-foreground">transport.theaseergroup.com</span> and
            update the live vehicle fleet.
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
            href="https://transport.theaseergroup.com"
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
          <p className="eyebrow">Booking Enquiries</p>
          <p className="display mt-3 text-3xl">{overview?.counts.inquiriesTotal ?? 0}</p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            <span className="font-semibold text-jade">{overview?.counts.inquiriesNew ?? 0}</span>{" "}
            awaiting dispatch
          </p>
        </SpotlightCard>

        <SpotlightCard className="rounded-2xl border border-border bg-white p-6">
          <p className="eyebrow">Active Vehicles</p>
          <p className="display mt-3 text-3xl">{activeFleetCount}</p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {fleet.length} total in fleet catalog
          </p>
        </SpotlightCard>

        <SpotlightCard className="rounded-2xl border border-border bg-white p-6">
          <p className="eyebrow">Public Endpoint</p>
          <p className="mt-3 font-mono text-[13px] font-semibold text-jade">
            /api/v1/subsidiaries/transport
          </p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Synced live with the Transport site
          </p>
        </SpotlightCard>
      </div>

      {/* Tabs & Controls */}
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
            Bookings ({inquiries.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("fleet")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
              tab === "fleet"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Truck className="size-3.5" />
            Fleet Catalog ({fleet.length})
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
                placeholder="Search name, vehicle..."
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
              value={fleetCategory}
              onChange={setFleetCategory}
              options={FLEET_CATEGORIES}
            />
            <button
              type="button"
              onClick={openNewVehicleModal}
              className="inline-flex items-center gap-1.5 rounded-full bg-jade px-4 py-2 text-[13px] font-medium text-white shadow-xs transition hover:opacity-90"
            >
              <Plus className="size-3.5" />
              Add Vehicle
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
            <p className="display text-xl">No booking enquiries yet</p>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Requests from transport.theaseergroup.com/book will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {inquiries.map((inq) => {
              const vehicleName =
                typeof inq.details?.vehicleName === "string" ? inq.details.vehicleName : null;
              const serviceType =
                typeof inq.details?.serviceType === "string" ? inq.details.serviceType : null;
              const tripDates =
                typeof inq.details?.tripDates === "string" ? inq.details.tripDates : null;

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
                        {vehicleName && (
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                            {vehicleName}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-[14px] text-muted-foreground">
                        {inq.message}
                      </p>
                      {(serviceType || tripDates) && (
                        <p className="mt-1.5 text-[12px] text-muted-foreground">
                          {serviceType ?? ""}
                          {serviceType && tripDates ? " · " : ""}
                          {tripDates ? `Duration: ${tripDates}` : ""}
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
          {fleet.map((veh) => {
            const seats = typeof veh.details?.seats === "string" ? veh.details.seats : null;
            const driverOpt =
              typeof veh.details?.driverOption === "string" ? veh.details.driverOption : null;

            return (
              <div
                key={veh.id}
                className={cn(
                  "flex flex-col justify-between rounded-2xl border bg-white p-6 transition",
                  veh.isActive ? "border-border" : "border-border/60 opacity-65",
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-jade-soft px-2.5 py-0.5 text-[11px] font-semibold text-jade">
                        {CATEGORY_LABELS[veh.category] ?? veh.category}
                      </span>
                      {seats && (
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground">
                          {seats}
                        </span>
                      )}
                      {!veh.isActive && (
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          Paused
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      #{veh.sortOrder}
                    </span>
                  </div>

                  <h3 className="display mt-3 text-lg">{veh.title}</h3>
                  {driverOpt && (
                    <p className="mt-0.5 text-[12px] font-medium text-jade">{driverOpt}</p>
                  )}
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {veh.summary}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                  <button
                    type="button"
                    disabled={togglingVehId === veh.id || deletingVehId === veh.id}
                    onClick={() => void handleToggleVehicleActive(veh)}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
                  >
                    {togglingVehId === veh.id && <Loader2 className="size-3 animate-spin" />}
                    {togglingVehId === veh.id
                      ? veh.isActive
                        ? "Pausing..."
                        : "Activating..."
                      : veh.isActive
                        ? "Pause vehicle"
                        : "Activate vehicle"}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={togglingVehId === veh.id || deletingVehId === veh.id}
                      onClick={() => openEditVehicleModal(veh)}
                      className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-[12px] font-medium text-foreground hover:border-jade hover:text-jade disabled:opacity-50"
                    >
                      <Edit3 className="size-3" />
                      Edit
                    </button>
                    {confirmDeleteVehId === veh.id ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={deletingVehId === veh.id}
                          onClick={() => void handleDeleteVehicle(veh)}
                          className="inline-flex items-center gap-1 rounded-full bg-destructive px-3 py-1.5 text-[12px] font-medium text-white disabled:opacity-60"
                        >
                          {deletingVehId === veh.id && <Loader2 className="size-3 animate-spin" />}
                          {deletingVehId === veh.id ? "Deleting..." : "Confirm"}
                        </button>
                        <button
                          type="button"
                          disabled={deletingVehId === veh.id}
                          onClick={() => setConfirmDeleteVehId(null)}
                          className="text-[12px] text-muted-foreground hover:text-foreground disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={togglingVehId === veh.id}
                        onClick={() => setConfirmDeleteVehId(veh.id)}
                        aria-label={`Delete ${veh.title}`}
                        className="inline-flex items-center justify-center rounded-full border border-border p-1.5 text-muted-foreground hover:border-destructive/40 hover:text-destructive disabled:opacity-50"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Inquiry Detail Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/25 backdrop-blur-xs">
          <div className="flex h-full w-full max-w-lg flex-col border-l border-border bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <p className="eyebrow text-jade">Transport Booking</p>
                <h2 className="display mt-0.5 text-xl">{selectedInquiry.fullName}</h2>
              </div>
              <button
                type="button"
                disabled={savingInquiry || deletingInquiry}
                onClick={() => setSelectedInquiry(null)}
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary disabled:opacity-50"
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
                  <p className="eyebrow">Dispatch Details</p>
                  <dl className="mt-2.5 grid grid-cols-2 gap-3">
                    <div>
                      <dt className="text-muted-foreground">Service Type</dt>
                      <dd className="font-medium text-foreground">
                        {String(selectedInquiry.details.serviceType ?? "General")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Vehicle</dt>
                      <dd className="font-medium text-foreground">
                        {String(selectedInquiry.details.vehicleName ?? "Flexible")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Pickup</dt>
                      <dd className="font-medium text-foreground">
                        {String(selectedInquiry.details.pickupLocation ?? "Not specified")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Drop-off / Route</dt>
                      <dd className="font-medium text-foreground">
                        {String(selectedInquiry.details.dropoffLocation ?? "Not specified")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Dates / Duration</dt>
                      <dd className="font-medium text-foreground">
                        {String(selectedInquiry.details.tripDates ?? "Not specified")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Driver Option</dt>
                      <dd className="font-medium text-foreground">
                        {String(selectedInquiry.details.driverPreference ?? "With Driver")}
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
                  placeholder="Driver assigned, quote sent, pickup confirmed..."
                  className="mt-2 w-full rounded-2xl border border-border bg-secondary/30 p-3.5 text-[14px] text-foreground focus:border-jade focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              {confirmDeleteInquiry ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={deletingInquiry || savingInquiry}
                    onClick={() => void handleDeleteInquiry()}
                    className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-4 py-2 text-[13px] font-medium text-white disabled:opacity-60"
                  >
                    {deletingInquiry && <Loader2 className="size-3.5 animate-spin" />}
                    {deletingInquiry ? "Deleting..." : "Confirm Delete"}
                  </button>
                  <button
                    type="button"
                    disabled={deletingInquiry}
                    onClick={() => setConfirmDeleteInquiry(false)}
                    className="text-[13px] text-muted-foreground"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={savingInquiry}
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

      {/* Add / Edit Vehicle Modal */}
      {showVehicleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="display text-2xl">
                {editingVehicle ? "Edit Vehicle" : "Add Fleet Vehicle"}
              </h2>
              <button
                type="button"
                disabled={savingVeh}
                onClick={() => setShowVehicleModal(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary disabled:opacity-50"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={(e) => void handleSaveVehicle(e)} className="mt-5 space-y-4">
              <div>
                <label className="eyebrow block">Vehicle Name *</label>
                <input
                  type="text"
                  required
                  value={vehTitle}
                  onChange={(e) => setVehTitle(e.target.value)}
                  placeholder="Toyota Prado"
                  className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-[14px] focus:border-jade focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="eyebrow block">Category</label>
                  <div className="mt-1.5">
                    <AppleSelect
                      value={vehCat}
                      onChange={setVehCat}
                      options={FLEET_CATEGORIES.filter((c) => c.value !== "all")}
                    />
                  </div>
                </div>
                <div>
                  <label className="eyebrow block">Seating Capacity</label>
                  <input
                    type="text"
                    value={vehSeats}
                    onChange={(e) => setVehSeats(e.target.value)}
                    placeholder="7 Seats"
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-[14px] focus:border-jade focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="eyebrow block">Driver Option</label>
                  <input
                    type="text"
                    value={vehDriver}
                    onChange={(e) => setVehDriver(e.target.value)}
                    placeholder="With or without driver"
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-[14px] focus:border-jade focus:outline-none"
                  />
                </div>
                <div>
                  <label className="eyebrow block">Display Order</label>
                  <input
                    type="number"
                    min={0}
                    value={vehSortOrder}
                    onChange={(e) => setVehSortOrder(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-[14px] focus:border-jade focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="eyebrow block">Primary Use Case</label>
                <textarea
                  rows={2}
                  value={vehUseCase}
                  onChange={(e) => setVehUseCase(e.target.value)}
                  placeholder="Executive delegations, corporate travel, northern passes..."
                  className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 p-3.5 text-[14px] focus:border-jade focus:outline-none"
                />
              </div>

              <div>
                <label className="eyebrow block">
                  Vehicle Image URL (Google Drive or Direct Link)
                </label>
                <input
                  type="url"
                  value={vehImageUrl}
                  onChange={(e) => setVehImageUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                  className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 text-[14px] focus:border-jade focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Optional: Paste a public Google Drive share link or direct image URL.
                </p>
              </div>

              <label className="flex items-center gap-2.5 text-[13px] font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={vehActive}
                  onChange={(e) => setVehActive(e.target.checked)}
                  className="size-4 accent-jade"
                />
                Visible on transport.theaseergroup.com
              </label>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  disabled={savingVeh}
                  onClick={() => setShowVehicleModal(false)}
                  className="rounded-full border border-border px-5 py-2 text-[13px] font-medium text-foreground disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingVeh}
                  className="inline-flex items-center gap-2 rounded-full bg-jade px-6 py-2 text-[13px] font-semibold text-white shadow-xs transition hover:opacity-90 disabled:opacity-60"
                >
                  {savingVeh && <Loader2 className="size-3.5 animate-spin" />}
                  {savingVeh ? "Saving..." : editingVehicle ? "Save Vehicle" : "Add Vehicle"}
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
