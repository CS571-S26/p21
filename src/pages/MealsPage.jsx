import { useEffect, useMemo, useState } from "react";
import MealOptionCard from "../components/MealOptionCard";
import DailyNutritionSummary from "../components/DailyNutritionSummary";

const defaultFoods = [
  {
    id: 1,
    name: "Chicken Breast",
    serving: "100g",
    calories: 165,
    protein: 31,
    sodium: 74,
    fat: 3.6,
    carbs: 0,
    fiber: 0,
  },
  {
    id: 2,
    name: "White Rice",
    serving: "100g",
    calories: 130,
    protein: 2.7,
    sodium: 1,
    fat: 0.3,
    carbs: 28,
    fiber: 0.4,
  },
  {
    id: 3,
    name: "Egg",
    serving: "50g",
    calories: 72,
    protein: 6.3,
    sodium: 71,
    fat: 4.8,
    carbs: 0.4,
    fiber: 0,
  },
  {
    id: 4,
    name: "Banana",
    serving: "100g",
    calories: 89,
    protein: 1.1,
    sodium: 1,
    fat: 0.3,
    carbs: 23,
    fiber: 2.6,
  },
  {
    id: 5,
    name: "Greek Yogurt",
    serving: "170g",
    calories: 100,
    protein: 17,
    sodium: 65,
    fat: 0.7,
    carbs: 6,
    fiber: 0,
  },
  {
    id: 6,
    name: "Broccoli",
    serving: "100g",
    calories: 35,
    protein: 2.4,
    sodium: 41,
    fat: 0.4,
    carbs: 7.2,
    fiber: 3.3,
  },
  {
    id: 7,
    name: "Salmon",
    serving: "100g",
    calories: 208,
    protein: 20,
    sodium: 59,
    fat: 13,
    carbs: 0,
    fiber: 0,
  },
  {
    id: 8,
    name: "Oatmeal",
    serving: "40g",
    calories: 150,
    protein: 5,
    sodium: 0,
    fat: 3,
    carbs: 27,
    fiber: 4,
  },
];

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekStart(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - copy.getDay());
  return copy;
}

function getWeekDates(date) {
  const start = getWeekStart(date);
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    dates.push(current);
  }

  return dates;
}

export default function MealsPage() {
  const today = new Date();

  const [currentWeekDate, setCurrentWeekDate] = useState(today);
  const weekDates = useMemo(
    () => getWeekDates(currentWeekDate),
    [currentWeekDate],
  );
  const [selectedDate, setSelectedDate] = useState(formatDateKey(today));

  const [foods, setFoods] = useState(defaultFoods);
  const [mealsByDate, setMealsByDate] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [customFood, setCustomFood] = useState({
    name: "",
    serving: "",
    calories: "",
    protein: "",
    sodium: "",
    fat: "",
    carbs: "",
    fiber: "",
  });

  useEffect(() => {
    const savedMeals = localStorage.getItem("padicali-meals-by-date");
    if (savedMeals) {
      setMealsByDate(JSON.parse(savedMeals));
    }

    const savedFoods = localStorage.getItem("padicali-custom-foods");
    if (savedFoods) {
      setFoods([...defaultFoods, ...JSON.parse(savedFoods)]);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("padicali-meals-by-date", JSON.stringify(mealsByDate));

      const customFoodsOnly = foods.filter((food) => food.id >= 1000);
      localStorage.setItem("padicali-custom-foods", JSON.stringify(customFoodsOnly));
    }
  }, [mealsByDate, foods, loaded]);

  const goToPreviousWeek = () => {
    const prev = new Date(currentWeekDate);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekDate(prev);
  };

  const goToNextWeek = () => {
    const next = new Date(currentWeekDate);
    next.setDate(next.getDate() + 7);
    setCurrentWeekDate(next);
  };

  const addFoodToDate = (food, quantity = 1) => {
    const loggedFood = {
      ...food,
      logId: Date.now(),
      quantity,
      calories: food.calories * quantity,
      protein: food.protein * quantity,
      sodium: food.sodium * quantity,
      fat: food.fat * quantity, 
      carbs: food.carbs * quantity,
      fiber: food.fiber * quantity,
    };

    setMealsByDate((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), loggedFood],
    }));
  };

  const removeFoodFromDate = (indexToRemove) => {
    setMealsByDate((prev) => ({
      ...prev,
      [selectedDate]: (prev[selectedDate] || []).filter(
        (_, index) => index !== indexToRemove,
      ),
    }));
  };

  const addCustomFood = () => {
    if (!customFood.name.trim() || !customFood.serving.trim()) return;

    const newFood = {
      id: Date.now(),
      name: customFood.name.trim(),
      serving: customFood.serving.trim(),
      calories: Number(customFood.calories) || 0,
      protein: Number(customFood.protein) || 0,
      sodium: Number(customFood.sodium) || 0,
      fat: Number(customFood.fat) || 0,
      carbs: Number(customFood.carbs) || 0,
      fiber: Number(customFood.fiber) || 0,
    };

    setFoods((prev) => [...prev, newFood]);
    setCustomFood({
      name: "",
      serving: "",
      calories: "",
      protein: "",
      sodium: "",
      fat: "",
      carbs: "",
      fiber: "",
    });
  };

  const selectedMeals = mealsByDate[selectedDate] || [];

  return (
    <div style={{ padding: "88px 32px 60px", color: "#e8f0fe" }}>
      <h1
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 36,
          fontWeight: 900,
          marginBottom: 6,
          letterSpacing: "-0.04em",
        }}
      >
        Meals
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            color: "#6b8cae",
            fontSize: 15,
            margin: 0,
          }}
        >
          This Week&apos;s Meals
        </p>

        <button onClick={goToPreviousWeek} style={weekNavButtonStyle}>
          ← Prev Week
        </button>

        <button onClick={goToNextWeek} style={weekNavButtonStyle}>
          Next Week →
        </button>
      </div>

      <div
        style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}
      >
        {weekDates.map((date) => {
          const key = formatDateKey(date);
          const active = selectedDate === key;

          return (
            <button
              type = "button"
              key={key}
              onClick={() => setSelectedDate(key)}
              style={{
                padding: "8px 14px",
                borderRadius: 10,
                border: "1px solid #1a2d42",
                background: active ? "#3b82f6" : "#1e2d45",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {date.toLocaleDateString("en-US", { weekday: "short" })}{" "}
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div
        style={{
          background: "#111d2e",
          border: "1px solid #1a2d42",
          borderRadius: 16,
          padding: 20,
          marginBottom: 28,
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: 22 }}>Add Custom Food</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <input
            value={customFood.name}
            onChange={(e) =>
              setCustomFood({ ...customFood, name: e.target.value })
            }
            placeholder="Food name"
            style={inputStyle}
          />
          <input
            value={customFood.serving}
            onChange={(e) =>
              setCustomFood({ ...customFood, serving: e.target.value })
            }
            placeholder="Serving"
            style={inputStyle}
          />
          <input
            value={customFood.calories}
            onChange={(e) =>
              setCustomFood({ ...customFood, calories: e.target.value })
            }
            placeholder="Cal"
            style={inputStyle}
          />
          <input
            value={customFood.protein}
            onChange={(e) =>
              setCustomFood({ ...customFood, protein: e.target.value })
            }
            placeholder="Protein"
            style={inputStyle}
          />
          <input
            value={customFood.sodium}
            onChange={(e) =>
              setCustomFood({ ...customFood, sodium: e.target.value })
            }
            placeholder="Sodium"
            style={inputStyle}
          />
          <input
            value={customFood.fat}
            onChange={(e) =>
              setCustomFood({ ...customFood, fat: e.target.value })
            }
            placeholder="Fat"
            style={inputStyle}
          />
          <input
            value={customFood.carbs}
            onChange={(e) =>
              setCustomFood({ ...customFood, carbs: e.target.value })
            }
            placeholder="Carbs"
            style={inputStyle}
          />
          <input
            value={customFood.fiber}
            onChange={(e) =>
              setCustomFood({ ...customFood, fiber: e.target.value })
            }
            placeholder="Fiber"
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={addCustomFood} style={addButtonStyle}>
            Add Food
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}> Food Options</h2>
        {foods.map((food) => (
          <MealOptionCard key={food.id} food={food} onAdd={addFoodToDate} />
        ))}
      </div>

      <DailyNutritionSummary
        selectedDate={selectedDate}
        meals={selectedMeals}
        onRemove={removeFoodFromDate}
      />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "#162032",
  border: "1px solid #1a2d42",
  borderRadius: 10,
  color: "#e8f0fe",
  padding: "10px 12px",
  fontSize: 14,
  outline: "none",
  marginTop: 4,
};

const addButtonStyle = {
  background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
  border: "none",
  borderRadius: 10,
  color: "#fff",
  padding: "10px 18px",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 14,
  whiteSpace: "nowrap",
  minWidth: "120px",
};

const weekNavButtonStyle = {
  background: "#1e2d45",
  border: "1px solid #1a2d42",
  borderRadius: 8,
  color: "#e8f0fe",
  padding: "8px 12px",
  fontWeight: 600,
  cursor: "pointer",
};
