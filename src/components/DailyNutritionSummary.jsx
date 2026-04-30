function formatSelectedDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function DailyNutritionSummary({
  selectedDate,
  meals,
  onRemove,
}) {
  const totals = meals.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      sodium: acc.sodium + food.sodium,
      fat: acc.fat + food.fat,
      carbs: acc.carbs + food.carbs,
      fiber: acc.fiber + food.fiber,
    }),
    {
      calories: 0,
      protein: 0,
      sodium: 0,
      fat: 0,
      carbs: 0,
      fiber: 0,
    },
  );

  return (
    <div
      style={{
        marginTop: 30,
        background: "#111d2e",
        border: "1px solid #1a2d42",
        borderRadius: 16,
        padding: 22,
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 8,
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        Today&apos;s Summary
      </h2>

      <p
        style={{
          color: "#8aa8c3",
          marginBottom: 18,
          fontSize: 16,
        }}
      >
        {formatSelectedDate(selectedDate)}
      </p>

      {meals.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          {meals.map((meal, index) => (
            <div
              key={`${meal.logId || meal.id}-${index}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#162032",
                border: "1px solid #1a2d42",
                borderRadius: 10,
                padding: "10px 12px",
                marginBottom: 8,
              }}
            >
              <span>
                {meal.name} ({meal.serving}
                {meal.quantity ? `x ${meal.quantity}` : ""})
              </span>

              <button
                type = "button"
                onClick={() => onRemove(index)}
                style={{
                  background: "#3d1a1a",
                  border: "1px solid #ef4444",
                  color: "#ef4444",
                  borderRadius: 8,
                  padding: "6px 10px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {meals.length === 0 && (
        <p style={{ color: "#8aa8c3", marginBottom: 18 }}>
          No meals logged yet.
        </p>
      )}

      <div
        style={{
          background: "#162032",
          border: "1px solid #1a2d42",
          borderRadius: 12,
          padding: 16,
          lineHeight: 1.8,
          fontWeight: 600,
        }}
      >
        <div>{totals.calories} cal</div>
        <div>{totals.protein.toFixed(1)}g protein</div>
        <div>{totals.sodium}mg sodium</div>
        <div>{totals.fat.toFixed(1)}g fat</div>
        <div>{totals.carbs.toFixed(1)}g carbs</div>
        <div>{totals.fiber.toFixed(1)}g fiber</div>
      </div>
    </div>
  );
}
