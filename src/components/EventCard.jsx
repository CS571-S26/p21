import { useState } from "react";

const formatTime = (timeStr) => {
  if (!timeStr) return "";

  const [hour, minute] = timeStr.split(":").map(Number);

  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${formattedHour}:${minute.toString().padStart(2, "0")}${period}`;
};

const categoryColors = {
  work: { bg: "#1e3a5f", accent: "#3b82f6", label: "Work" },
  family: { bg: "#1a3d2e", accent: "#34d399", label: "Family" },
  health: { bg: "#3d1a2e", accent: "#f472b6", label: "Health" },
  school: { bg: "#2d2a1a", accent: "#fbbf24", label: "School" },
  social: { bg: "#2a1a3d", accent: "#a78bfa", label: "Social" },
  default: { bg: "#1e2a3d", accent: "#60a5fa", label: "Event" },
};

export default function EventCard({
  event,
  onEdit,
  onDelete,
  compact = false,
}) {
  const [hovered, setHovered] = useState(false);
  const cat = categoryColors[event.category] || categoryColors.default;

  const timeStr = event.allDay
    ? "All day"
    : `${formatTime(event.startTime)}${event.endTime ? ` - ${formatTime(event.endTime)}` : ""}`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "#1e2d45" : "#162032",
        border: `1px solid ${hovered ? cat.accent : "#1e2d45"}`,
        borderLeft: `3px solid ${cat.accent}`,
        borderRadius: "10px",
        padding: compact ? "8px 12px" : "14px 16px",
        cursor: "pointer",
        transition: "all 0.18s ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered ? `0 4px 20px ${cat.accent}22` : "none",
        display: "flex",
        alignItems: compact ? "center" : "flex-start",
        gap: "12px",
        overflow: "hidden",
      }}
    >
      {/* Color dot */}
      <div
        style={{
          width: compact ? 8 : 10,
          height: compact ? 8 : 10,
          borderRadius: "50%",
          background: cat.accent,
          flexShrink: 0,
          marginTop: compact ? 0 : 3,
          boxShadow: `0 0 6px ${cat.accent}88`,
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: compact ? "13px" : "14px",
            color: "#e8f0fe",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: "-0.01em",
          }}
        >
          {event.title}
        </div>

        {!compact && (
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "#6b8cae",
              marginTop: "3px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <span>{timeStr}</span>
            {event.location && (
              <>
                <span style={{ opacity: 0.4 }}>·</span>
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  📍 {event.location}
                </span>
              </>
            )}
          </div>
        )}

        {compact && (
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: "#4a6d8c",
              marginLeft: 6,
            }}
          >
            {timeStr}
          </span>
        )}
      </div>

      {/* Category pill */}
      {!compact && (
        <div
          style={{
            flexShrink: 0,
            fontSize: "10px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: cat.accent,
            background: `${cat.accent}18`,
            padding: "2px 8px",
            borderRadius: "20px",
          }}
        >
          {cat.label}
        </div>
      )}

      {/* Action buttons on hover */}
      {hovered && !compact && (
        <div
          style={{
            position: "absolute",
            right: 12,
            bottom: 10,
            display: "flex",
            gap: 6,
          }}
        >
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(event);
              }}
              style={{
                background: "#1e3a5f",
                border: "1px solid #3b82f6",
                borderRadius: 6,
                color: "#3b82f6",
                fontSize: 11,
                fontFamily: "'DM Sans', sans-serif",
                padding: "2px 10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(event.id);
              }}
              style={{
                background: "#3d1a1a",
                border: "1px solid #ef4444",
                borderRadius: 6,
                color: "#ef4444",
                fontSize: 11,
                fontFamily: "'DM Sans', sans-serif",
                padding: "2px 10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
