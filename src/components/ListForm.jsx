import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function ListForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Grocery");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim(), category);
    setTitle("");
    setCategory("Grocery");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Item name</Form.Label>
        <Form.Control
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Buy eggs"
          style={{
            background: "#162032",
            border: "1px solid #1a2d42",
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            background: "#162032",
            border: "1px solid #1a2d42",
            color: "#e8f0fe",
          }}
        >
          <option>Grocery</option>
          <option>Chore</option>
          <option>School</option>
          <option>Personal</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" style={{ width: "100%" }}>
        Add to List
      </Button>
    </Form>
  );
}
