import * as React from "react";
import "../../styles/studio-control-entry.css";

export type StudioGridSize = "supreme" | "standard" | "compact" | "mini" | "micro";
export type StudioGridCorners = "radius" | "square";

export type StudioComponentGridProps = {
  cols: 1 | 2 | 3 | 4 | 5;
  rows: 1 | 2 | 3;
  size?: StudioGridSize;
  corners?: StudioGridCorners;
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  "aria-label"?: string;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, Math.round(value)));

export const StudioComponentGrid = React.forwardRef<HTMLDivElement, StudioComponentGridProps>(
  function StudioComponentGrid({ cols, rows, size = "standard", corners = "radius", gap, className, style, children, "aria-label": ariaLabel = "Studio control grid" }, ref) {
    const c = clamp(cols, 1, 5);
    const r = clamp(rows, 1, 3);
    return <div ref={ref} className={["vt-studio-component-grid", className].filter(Boolean).join(" ")}
      data-vt-studio-component-grid="true" data-size={size} data-corners={corners} data-cols={c} data-rows={r}
      role="group" aria-label={ariaLabel}
      style={{ ["--scg-cols" as string]: String(c), ["--scg-rows" as string]: String(r), ...(gap != null ? { ["--scg-gap" as string]: `${gap}px` } : {}), ...style } as React.CSSProperties}>
      {children}
    </div>;
  },
);
StudioComponentGrid.displayName = "StudioComponentGrid";

export type StudioComponentGridCellProps = {
  col?: number; row?: number; colSpan?: number; rowSpan?: number;
  className?: string; style?: React.CSSProperties; children: React.ReactNode;
};

export function StudioComponentGridCell({ col, row, colSpan = 1, rowSpan = 1, className, style, children }: StudioComponentGridCellProps) {
  return <div className={["vt-studio-component-grid__cell", className].filter(Boolean).join(" ")}
    data-vt-studio-component-grid-cell="true" data-col-span={colSpan} data-row-span={rowSpan}
    style={{ ...(col != null ? { gridColumnStart: col } : {}), ...(row != null ? { gridRowStart: row } : {}), gridColumnEnd: `span ${colSpan}`, gridRowEnd: `span ${rowSpan}`, ...style }}>
    {children}
  </div>;
}

export function StudioComponentGridRow({ row, className, style, children }: { row?: number; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return <StudioComponentGridCell row={row} col={1} colSpan={5} className={className} style={{ gridColumn: "1 / -1", ...style }}>{children}</StudioComponentGridCell>;
}
