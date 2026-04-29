import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ListForm from "../components/ListForm";
import ListItemCard from "../components/ListItemCard";
import ListFilterBar from "../components/ListFilterBar";

const starterItems = [
  { id: 1, title: "Buy groceries", category: "Grocery", completed: false },
  { id: 2, title: "Finish CS571 work", category: "School", completed: false },
  { id: 3, title: "Clean kitchen", category: "Chore", completed: true },
];

export default function ListsPage() {
  const [items, setItems] = useState(starterItems);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedItems = localStorage.getItem("padicali-list-items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("padicali-list-items", JSON.stringify(items));
  }, [items]);

  const addItem = (title, category) => {
    const newItem = {
      id: Date.now(),
      title,
      category,
      completed: false,
    };

    setItems((prev) => [newItem, ...prev]);
  };

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Active") return !item.completed;
    if (filter === "Completed") return item.completed;
    return item.category === filter;
  });

  return (
    <Container fluid style={{ padding: "88px 32px 60px", color: "#e8f0fe" }}>
      <h1
        style={{
          fontSize: 36,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          marginBottom: 8,
        }}
      >
        Lists
      </h1>

      <p style={{ color: "#6b8cae", marginBottom: 24 }}>
        Organize groceries, chores, school tasks, and personal reminders.
      </p>

      <Row className="g-4">
        <Col lg={4}>
          <Card
            style={{
              background: "#111d2e",
              border: "1px solid #1a2d42",
              borderRadius: 16,
            }}
          >
            <Card.Body>
              <h2 style={{ fontSize: 22, marginBottom: 16, color: "#e8f0fe" }}>Add Item</h2>
              <ListForm onAdd={addItem} />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card
            style={{
              background: "#111d2e",
              border: "1px solid #1a2d42",
              borderRadius: 16,
            }}
          >
            <Card.Body>
              <h2 style={{ fontSize: 22, marginBottom: 16, color: "#e8f0fe" }}>Your List</h2>

              <ListFilterBar filter={filter} onChange={setFilter} />

              <div style={{ marginTop: 18 }}>
                {filteredItems.length === 0 ? (
                  <p style={{ color: "#6b8cae" }}>
                    No items match this filter.
                  </p>
                ) : (
                  filteredItems.map((item) => (
                    <ListItemCard
                      key={item.id}
                      item={item}
                      onToggle={toggleItem}
                      onDelete={deleteItem}
                    />
                  ))
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
