import { Button } from "react-bootstrap";

const filters = [
  "All",
  "Active",
  "Completed",
  "Grocery",
  "Chore",
  "School",
  "Personal",
];

export default function ListFilterBar({ filter, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {filters.map((item) => (
        <Button
          key={item}
          size="sm"
          variant={filter === item ? "primary" : "outline-primary"}
          onClick={() => onChange(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
