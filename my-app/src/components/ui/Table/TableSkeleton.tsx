import clsx from "clsx";

export type SkeletonTableProps = {
  columns: number;
  rows?: number;
  className?: string;
  classNameTable?: string;
  scroll?: boolean;
  showHeader?: boolean;
};

export default function TableSkeleton({
  columns,
  rows = 5,
  className,
  classNameTable,
  scroll = false,
  showHeader = true,
}: SkeletonTableProps) {
  return (
    <div
      className={clsx(
        "ring-1 ring-gray-200 dark:ring-gray-700 rounded-md w-full h-full",
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
          {showHeader && (
            <thead className="bg-slate-100 dark:bg-gray-700">
              <tr>
                {Array.from({ length: columns }).map((_, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={clsx(
                      "py-6 px-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-300",
                      index === 0 && "rounded-tl-lg w-12",
                      index === columns - 1 && "rounded-tr-lg"
                    )}
                  >
                    <div className="flex items-center gap-1">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="bg-white dark:bg-gray-800">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={clsx(
                      rowIndex === 0
                        ? ""
                        : "border-t border-gray-100 dark:border-gray-700",
                      "px-3 py-3.5 text-sm text-slate-800 dark:text-gray-200"
                    )}
                  >
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
