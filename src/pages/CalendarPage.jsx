import { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import SectionTitle from "../components/SectionTitle";
import EventCard from "../components/EventCard";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const categoryColors = {
  work: "#3b82f6",
  family: "#34d399",
  health: "#f472b6",
  school: "#fbbf24",
  social: "#a78bfa",
  default: "#60a5fa",
};

export default function CalendarPage({
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push({
      day: daysInPrev - firstDay + 1 + i,
      currentMonth: false,
      date: new Date(year, month - 1, daysInPrev - firstDay + 1 + i),
    });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({
      day: i,
      currentMonth: true,
      date: new Date(year, month, i),
    });
  }
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({
      day: i,
      currentMonth: false,
      date: new Date(year, month + 1, i),
    });
  }

  const parseLocal = (val) => {
    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const [y, m, d] = val.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    const d = new Date(val);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const eventsOnDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return events.filter((e) => parseLocal(e.date).getTime() === d.getTime());
  };

  const selectedEvents = eventsOnDate(selectedDate).sort((a, b) =>
    (a.startTime || "").localeCompare(b.startTime || ""),
  );

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const isToday = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const t = new Date(today);
    t.setHours(0, 0, 0, 0);
    return d.getTime() === t.getTime();
  };

  const isSelected = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const s = new Date(selectedDate);
    s.setHours(0, 0, 0, 0);
    return d.getTime() === s.getTime();
  };

  const selectedStr = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <Container fluid style={{ padding: "88px 32px 60px" }}>
      <Row className="g-4 align-items-start">
        <Col lg={8}>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              <Button onClick={prevMonth} variant="dark" style={navBtnStyle}>
                ‹
              </Button>

              <Button onClick={nextMonth} variant="dark" style={navBtnStyle}>
                ›
              </Button>

              <h2
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  color: "#d0e4f7",
                  margin: 0,
                  letterSpacing: "-0.04em",
                  flex: 1,
                }}
              >
                {MONTHS[month]} <span style={{ color: "#2d4d6b" }}>{year}</span>
              </h2>

              <Button
                onClick={goToday}
                variant="outline-primary"
                size="sm"
                style={{
                  borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "6px 14px",
                  letterSpacing: "0.04em",
                }}
              >
                Today
              </Button>

              <Button
                onClick={() => onAddEvent(selectedDate)}
                size="sm"
                style={{
                  background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "7px 16px",
                  boxShadow: "0 2px 12px #3b82f640",
                  letterSpacing: "0.02em",
                }}
              >
                + New Event
              </Button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                marginBottom: 4,
              }}
            >
              {DAYS.map((d) => (
                <div
                  key={d}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#2d4d6b",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textAlign: "center",
                    padding: "6px 0",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
              }}
            >
              {cells.map((cell, i) => {
                const cellEvents = eventsOnDate(cell.date);
                const today_ = isToday(cell.date);
                const selected_ = isSelected(cell.date);

                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDate(cell.date)}
                    style={{
                      minHeight: 80,
                      background: selected_
                        ? "#1e3a5f"
                        : today_
                          ? "#111d2e"
                          : "#0d1825",
                      border: selected_
                        ? "1.5px solid #3b82f6"
                        : today_
                          ? "1px solid #1e3a5f"
                          : "1px solid #111d2e",
                      borderRadius: 10,
                      padding: "8px 8px 6px",
                      cursor: "pointer",
                      transition: "all 0.12s ease",
                      opacity: cell.currentMonth ? 1 : 0.35,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        fontWeight: today_ ? 800 : selected_ ? 700 : 500,
                        color: today_
                          ? "#3b82f6"
                          : selected_
                            ? "#60a5fa"
                            : "#6b8cae",
                        marginBottom: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {cell.day}
                      {today_ && (
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: "#3b82f6",
                            display: "inline-block",
                            boxShadow: "0 0 6px #3b82f6",
                          }}
                        />
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      {cellEvents.slice(0, 3).map((ev, j) => (
                        <div
                          key={j}
                          style={{
                            height: 5,
                            borderRadius: 3,
                            background:
                              categoryColors[ev.category] ||
                              categoryColors.default,
                            opacity: 0.85,
                            boxShadow: `0 0 4px ${
                              categoryColors[ev.category] ||
                              categoryColors.default
                            }80`,
                          }}
                        />
                      ))}

                      {cellEvents.length > 3 && (
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 9,
                            color: "#3b82f6",
                            fontWeight: 700,
                          }}
                        >
                          +{cellEvents.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>

        <Col lg={4}>
          <Card
            style={{
              background: "#0d1825",
              border: "1px solid #1a2d42",
              borderRadius: 16,
              padding: "22px 20px",
              position: "sticky",
              top: 76,
            }}
          >
            <Card.Body style={{ padding: 0 }}>
              <SectionTitle
                title={selectedStr}
                subtitle={
                  selectedEvents.length === 0
                    ? "Nothing scheduled"
                    : `${selectedEvents.length} event${selectedEvents.length !== 1 ? "s" : ""}`
                }
                action={() => onAddEvent(selectedDate)}
                actionLabel="Add"
              />

              {selectedEvents.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 0",
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📋</div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#2d4d6b",
                      fontSize: 13,
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    No events on this day.
                    <br />
                    <span
                      onClick={() => onAddEvent(selectedDate)}
                      style={{
                        color: "#3b82f6",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Add one?
                    </span>
                  </p>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {selectedEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onEdit={onEditEvent}
                      onDelete={onDeleteEvent}
                    />
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const navBtnStyle = {
  background: "#111d2e",
  border: "1px solid #1a2d42",
  borderRadius: 8,
  color: "#4a6d8c",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 20,
  width: 36,
  height: 36,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "all 0.15s ease",
  padding: 0,
  lineHeight: 1,
};
