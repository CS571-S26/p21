import { useState } from "react";

export default function MealOptionCard({ food, onAdd }) {
  const [quantity, setQuantity] = useState("1");

  const handleAdd = () => {
    const amount = Number(quantity);

    if (!amount || amount <= 0) return;

    onAdd(food, amount);
    setQuantity("1");
  };

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
        <div style={{ fontSize: 13, color: "#8aa8c3", marginTop: 4 }}>
          {food.calories} cal | {food.protein}g protein | {food.carbs}g carbs
        </div>
      </div>

      <div style = {{ display: "flex", alignItems: "center", gap: 8 }}>
        <label htmlFor = {`quantity-${food.id}`} style ={{ fontSize: 13}}>
          Servings
        </label>

        <input
          id = {`quantity-${food.id}`}
          type = "number" 
          min = "0.25"
          step = "0.25"
          value = {quantity}
          onChange = {(e) => setQuantity(e.target.value)}
          style={{
            width: 70,
            background: "#111d2e",
            border: "1px solid #1a2d42",
            borderRadius: 8,
            color: "#e8f0fe",
            padding: "7px 8px",
          }}
        />

        <button
          type = "button"
          onClick = {handleAdd}
          style = {{
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
    </div>
  );
}
