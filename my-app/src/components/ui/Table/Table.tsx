import React, { useMemo } from "react";
import clsx from "clsx";
import { HiOutlineSortAscending } from "react-icons/hi";
import { HiOutlineSortDescending } from "react-icons/hi";
import { sortData } from "../../../utils";

export type Column<T> = {
  header: string;
  key: keyof T;
  render?: (item: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
};

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortConfig: { key: keyof T; direction: "asc" | "desc" } | null;
  onSort: (key: keyof T) => void;
  currentId?: T[keyof T];
  onSelect?: (item: T) => void;
  classNameTable?: string;
  className?: string;
  scroll?: boolean;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

export default function Table<T extends { id: string | number }>({
  data,
  columns,
  sortConfig,
  onSort,
  classNameTable,
  className,
  scroll = false,
}: TableProps<T>) {
  const sortedData = useMemo(() => {
    return sortData(data, sortConfig);
  }, [data, sortConfig]);

  const isEmpty = data.length === 0;

  return (
    <div
      className={clsx(
        "ring-1 ring-gray-200 dark:ring-gray-700 rounded-md w-full",
        className
      )}
    >
      <div className={clsx(scroll && "max-h-full overflow-y-auto")}>
        <table
          className={clsx(
            "min-w-full divide-y divide-gray-100 dark:divide-gray-700 table-fixed",
            classNameTable
          )}
        >
          <thead className="bg-slate-100 dark:bg-gray-700">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col.key as string}
                  scope="col"
                  className={clsx(
                    "py-6 px-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-300 select-none",
                    col.key === "actions" && "text-end pr-4",
                    col.className,
                    col.sortable ? "cursor-pointer" : "",
                    index === 0 && "rounded-tl-lg w-12",
                    index === columns.length - 1 && "rounded-tr-lg"
                  )}
                  onClick={() => col.sortable && onSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="text-xs">
                        {sortConfig?.key === col.key ? (
                          sortConfig.direction === "asc" ? (
                            <HiOutlineSortAscending
                              size={17}
                              className="text-gray-500 dark:text-gray-300"
                            />
                          ) : (
                            <HiOutlineSortDescending
                              size={17}
                              className="text-gray-500 dark:text-gray-300"
                            />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {isEmpty ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-4 px-3 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  no data available
                </td>
              </tr>
            ) : (
              sortedData.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key as string}
                      className={clsx(
                        idx === 0
                          ? ""
                          : "border-t border-gray-100 dark:border-gray-700",
                        "px-3 py-3.5 text-sm text-slate-800 dark:text-gray-200",
                        col.key === "actions" && "text-end",
                        col.className
                      )}
                    >
                      {col.render
                        ? col.render(item)
                        : (item[col.key] as React.ReactNode) || null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
