import { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

export default function NavigationBar({
  currentPage,
  onNavigate,
  onAdd,
  userName = "Alex",
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "calendar", label: "Calendar", icon: "📅" },
    { id: "lists", label: "Lists", icon: "✅" },
    { id: "meals", label: "Meals", icon: "🍽️" },
  ];

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={menuOpen}
      variant="dark"
      style={{
        background: "rgba(9, 17, 30, 0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #1a2a3d",
        minHeight: 60,
      }}
    >
      <Container fluid style={{ padding: "0 24px" }}>
        <Navbar.Brand
          onClick={() => onNavigate("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            marginRight: 36,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              boxShadow: "0 0 16px #3b82f640",
            }}
          >
            🗓
          </div>

          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: "#e8f0fe",
              letterSpacing: "-0.04em",
            }}
          >
            Padi<span style={{ color: "#3b82f6" }}>Cali</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="padicali-navbar"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            borderColor: "#1e3a5f",
            boxShadow: "none",
          }}
        />

        <Navbar.Collapse id="padicali-navbar">
          <Nav className="me-auto">
            {navItems.map((item) => {
              const active = currentPage === item.id;

              return (
                <Nav.Link
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMenuOpen(false);
                  }}
                  style={{
                    background: active ? "#1e3a5f" : "transparent",
                    borderRadius: 8,
                    color: active ? "#60a5fa" : "#4a6d8c",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    padding: "6px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    letterSpacing: "0.01em",
                    marginRight: 4,
                  }}
                >
                  <span aria-hidden = "true" style={{ fontSize: 14 }}>{item.icon}</span>
                  {item.label}
                </Nav.Link>
              );
            })}
          </Nav>

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <Button
              onClick={onAdd}
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                padding: "7px 16px",
                boxShadow: "0 2px 12px #3b82f640",
                letterSpacing: "0.01em",
              }}
            >
              + Add
            </Button>

            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1e3a5f, #2563eb)",
                border: "2px solid #2d4d6b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: "#60a5fa",
                flexShrink: 0,
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
