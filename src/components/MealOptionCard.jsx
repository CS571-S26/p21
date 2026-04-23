export default function MealOptionCard({ food, onAdd }) {
  return (
    <div
      style={{
        marginBottom: 10,
        padding: 14,
        borderRadius: 12,
        background: "#162032",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #1a2d42",
      }}
    >
      <div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>
          {food.name} ({food.serving})
        </div>
        <div style={{ fontSize: 13, color: "#6b8cae", marginTop: 4 }}>
          {food.calories} cal | {food.protein}g protein | {food.carbs}g carbs
        </div>
      </div>

      <button
        onClick={() => onAdd(food)}
        style={{
          background: "#3b82f6",
          border: "none",
          color: "#fff",
          borderRadius: 8,
          padding: "8px 14px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>
  );
}
