import { Button } from "react-bootstrap";

const categoryColors = {
  Grocery: "#34d399",
  Chore: "#fbbf24",
  School: "#3b82f6",
  Personal: "#a78bfa",
};

export default function ListItemCard({ item, onToggle, onDelete }) {
  return (
    <div
      style={{
        background: "#162032",
        border: "1px solid #1a2d42",
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <input
          id={`list-item-${item.id}`}
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          style={{ width: 18, height: 18 }}
        />

        <label
          htmlFor={`list-item-${item.id}`}
          style={{
            margin: 0,
            cursor: "pointer",
            textDecoration: item.completed ? "line-through" : "none",
            color: item.completed ? "#6b8cae" : "#e8f0fe",
          }}
        >
          {item.title}
        </label>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            color: categoryColors[item.category],
            background: `${categoryColors[item.category]}20`,
            borderRadius: 20,
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {item.category}
        </span>

        <span style={{ color: "#6b8cae", fontSize: 12 }}>
          {item.completed ? "Completed" : "Active"}
        </span>

        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
