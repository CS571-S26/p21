import { Button } from "react-bootstrap";

export default function SectionTitle({ title, subtitle, action, actionLabel }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 16,
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: 20,
            color: "#d0e4f7",
            margin: 0,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#3d5a72",
              margin: "4px 0 0",
              fontWeight: 500,
              letterSpacing: "0.01em",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && actionLabel && (
        <Button
          onClick={action}
          variant="outline-primary"
          size="sm"
          style={{
            borderRadius: 8,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            padding: "5px 14px",
            letterSpacing: "0.02em",
          }}
        >
          {actionLabel} →
        </Button>
      )}
    </div>
  );
}
