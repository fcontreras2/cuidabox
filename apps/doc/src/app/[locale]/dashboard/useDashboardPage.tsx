"use client";

import { faBookOpen, faCircleCheck, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import type { TableColumn } from "fcontreras2-ui";
import { Avatar, Badge, BadgeDot, Switch, Text, toast } from "fcontreras2-ui";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";

type ComponentStatus = "ready" | "review" | "blocked";
type ComponentDocStatus = "complete" | "gap";
type ReleaseWindow = "thisWeek" | "nextWeek" | "later";
type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

type ComponentRow = {
  id: string;
  component: string;
  owner: string;
  docs: ComponentDocStatus;
  status: ComponentStatus;
  release: ReleaseWindow;
};

type ChecklistItem = {
  id: string;
  label: string;
  checked: boolean;
};

type Owner = {
  name: string;
  role: string;
  status: "online" | "away" | "offline";
};

type ActivityItem = {
  id: string;
  label: string;
  time: string;
  variant: BadgeVariant;
};

type MetricCard = {
  id: string;
  label: string;
  value: string;
  delta: string;
};

const PAGE_SIZE = 4;

function getStatusVariant(status: ComponentStatus): BadgeVariant {
  if (status === "ready") {
    return "success";
  }

  if (status === "review") {
    return "warning";
  }

  return "danger";
}

export function useDashboardPage() {
  const t = useTranslations("DashboardPage");
  const { resolvedTheme, setTheme } = useTheme();
  const [page, setPage] = useState(1);
  const [isReleaseNotesOpen, setIsReleaseNotesOpen] = useState(false);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { id: "docs", label: t("checklistDocs"), checked: true },
    { id: "dark-mode", label: t("checklistDarkMode"), checked: true },
    { id: "date-picker", label: t("checklistDatePicker"), checked: false },
    { id: "examples", label: t("checklistExamples"), checked: true },
  ]);

  const metrics: MetricCard[] = [
    { id: "components", label: t("statsComponents"), value: t("statsComponentsValue"), delta: t("statsComponentsDelta") },
    { id: "coverage", label: t("statsCoverage"), value: t("statsCoverageValue"), delta: t("statsCoverageDelta") },
    { id: "feedback", label: t("statsFeedback"), value: t("statsFeedbackValue"), delta: t("statsFeedbackDelta") },
    { id: "adoption", label: t("statsAdoption"), value: t("statsAdoptionValue"), delta: t("statsAdoptionDelta") },
  ];

  const componentRows: ComponentRow[] = [
    { id: "button", component: "Button", owner: "Freddy", docs: "complete", status: "ready", release: "thisWeek" },
    { id: "card", component: "Card", owner: "Mar", docs: "complete", status: "ready", release: "thisWeek" },
    { id: "table", component: "Table", owner: "Ana", docs: "gap", status: "review", release: "nextWeek" },
    { id: "alert", component: "Alert", owner: "Leo", docs: "complete", status: "ready", release: "thisWeek" },
    { id: "datepicker", component: "DatePicker", owner: "Pau", docs: "gap", status: "blocked", release: "later" },
    { id: "modal", component: "Modal", owner: "Sofi", docs: "complete", status: "review", release: "nextWeek" },
  ];

  const owners: Owner[] = [
    { name: "Freddy Contreras", role: t("ownerFreddyRole"), status: "online" },
    { name: "Mar Torres", role: t("ownerMarRole"), status: "online" },
    { name: "Ana Salazar", role: t("ownerAnaRole"), status: "away" },
  ];

  const activityItems: ActivityItem[] = [
    { id: "feedback", label: t("activityFeedback"), time: t("activityNow"), variant: "info" },
    { id: "coverage", label: t("activityCoverage"), time: t("activityHour"), variant: "success" },
    { id: "dark-mode", label: t("activityDarkMode"), time: t("activityMorning"), variant: "warning" },
    { id: "usage", label: t("activityUsage"), time: t("activityYesterday"), variant: "default" },
  ];

  const totalPages = Math.ceil(componentRows.length / PAGE_SIZE);
  const paginatedRows = componentRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const isDarkMode = resolvedTheme === "dark";
  const themeIcon: IconDefinition = isDarkMode ? faSun : faMoon;
  const summaryIcon: IconDefinition = faCircleCheck;
  const notesIcon: IconDefinition = faBookOpen;

  const componentColumns: TableColumn<ComponentRow>[] = [
    {
      key: "component",
      header: t("colComponent"),
      accessor: (row) => <Text weight="semibold">{row.component}</Text>,
    },
    {
      key: "owner",
      header: t("colOwner"),
      accessor: "owner",
    },
    {
      key: "docs",
      header: t("colDocs"),
      accessor: (row) => (
        <Badge variant={row.docs === "complete" ? "info" : "warning"}>
          {row.docs === "complete" ? t("docsComplete") : t("docsGap")}
        </Badge>
      ),
    },
    {
      key: "status",
      header: t("colStatus"),
      accessor: (row) => (
        <Badge variant={getStatusVariant(row.status)}>
          {row.status === "ready"
            ? t("statusReady")
            : row.status === "review"
              ? t("statusReview")
              : t("statusBlocked")}
        </Badge>
      ),
    },
    {
      key: "release",
      header: t("colRelease"),
      accessor: (row) => (
        <Text color="muted">
          {row.release === "thisWeek"
            ? t("releaseThisWeek")
            : row.release === "nextWeek"
              ? t("releaseNextWeek")
              : t("releaseLater")}
        </Text>
      ),
    },
  ];

  const toggleChecklistItem = (id: string) => {
    setChecklistItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
    toast.success(t("toastTheme"));
  };

  const openReleaseNotes = () => {
    setIsReleaseNotesOpen(true);
  };

  const closeReleaseNotes = () => {
    setIsReleaseNotesOpen(false);
  };

  const exportSnapshot = () => {
    toast.success(t("toastExport"));
  };

  const shareReleaseSummary = () => {
    toast.success(t("toastShare"));
    setIsReleaseNotesOpen(false);
  };

  const checklistControls = checklistItems.map((item) => (
    <Switch
      key={item.id}
      checked={item.checked}
      label={item.label}
      onChange={() => toggleChecklistItem(item.id)}
      classNames={{
        wrapper: "rounded-xl border border-[var(--app-border)] bg-[var(--app-bg-muted)] px-3 py-3",
        label: "text-sm text-[var(--app-fg)]",
        track: item.checked ? "" : "bg-transparent",
      }}
    />
  ));

  const ownerCards = owners.map((owner) => (
    <div
      key={owner.name}
      className="flex items-center justify-between rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg-muted)] px-4 py-3"
    >
      <div className="flex items-center gap-3">
        <Avatar
          name={owner.name}
          size="sm"
          status={owner.status}
          classNames={{
            fallback: "bg-primary-600 text-white",
          }}
        />
        <div>
          <Text weight="semibold">{owner.name}</Text>
          <Text variant="caption" color="muted">
            {owner.role}
          </Text>
        </div>
      </div>
      <BadgeDot
        variant={owner.status === "online" ? "success" : owner.status === "away" ? "warning" : "default"}
      />
    </div>
  ));

  return {
    activityItems,
    checklistControls,
    closeReleaseNotes,
    componentColumns,
    exportSnapshot,
    isDarkMode,
    isReleaseNotesOpen,
    metrics,
    notesIcon,
    openReleaseNotes,
    ownerCards,
    page,
    paginatedRows,
    setPage,
    shareReleaseSummary,
    summaryIcon,
    t,
    themeIcon,
    toggleTheme,
    totalPages,
  };
}
