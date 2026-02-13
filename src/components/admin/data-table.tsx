"use client";

import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: keyof T;
  searchPlaceholder?: string;
  pageSize?: number;
  actions?: React.ReactNode;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  pageSize = 10,
  actions,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    if (!search.trim() || !searchKey) return data;
    return data.filter((item) =>
      String(item[searchKey]).toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search, searchKey]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        {searchKey && (
          <div
            className={cn(
              "flex items-center gap-2.5 max-w-sm flex-1",
              "h-9 pl-3.5 pr-2 rounded-lg",
              "bg-white/[0.03] border border-white/[0.06]",
              "focus-within:border-white/[0.12] focus-within:bg-white/[0.04]",
              "transition-all duration-200",
            )}
          >
            <Search className="size-3.5 shrink-0 text-white/20" />
            <input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="flex-1 bg-transparent text-xs font-heading text-white/80 placeholder:text-white/20 outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-[10px] text-white/20 hover:text-white/40 font-heading px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        )}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-white/[0.01] backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left text-[10px] font-heading font-semibold uppercase tracking-wider text-white/25 px-4 py-3 whitespace-nowrap"
                  >
                    {col.sortable ? (
                      <button
                        onClick={() => handleSort(col.key)}
                        className="flex items-center gap-1.5 hover:text-white/50 transition-colors"
                      >
                        {col.header}
                        {sortKey === col.key && (
                          <span className="text-gaming-orange text-[11px]">
                            {sortDir === "asc" ? "\u2191" : "\u2193"}
                          </span>
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center"
                  >
                    <p className="text-sm text-white/25 font-heading">
                      No results found
                    </p>
                  </td>
                </tr>
              ) : (
                paged.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/[0.03] last:border-b-0 hover:bg-white/[0.02] transition-colors"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-3 text-sm whitespace-nowrap"
                      >
                        {col.render(item)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-heading text-white/20">
            Showing{" "}
            <span className="text-white/40 font-semibold">
              {page * pageSize + 1}–
              {Math.min((page + 1) * pageSize, sorted.length)}
            </span>{" "}
            of{" "}
            <span className="text-white/40 font-semibold">{sorted.length}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className={cn(
                "size-8 flex items-center justify-center rounded-lg",
                "bg-white/[0.03] border border-white/[0.06]",
                "text-white/30 hover:text-white/60 hover:bg-white/[0.06]",
                "transition-all duration-200",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.03]",
              )}
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <span className="text-[11px] font-heading text-white/25 px-2">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              className={cn(
                "size-8 flex items-center justify-center rounded-lg",
                "bg-white/[0.03] border border-white/[0.06]",
                "text-white/30 hover:text-white/60 hover:bg-white/[0.06]",
                "transition-all duration-200",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/[0.03]",
              )}
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
