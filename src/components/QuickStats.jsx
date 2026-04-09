import { Row, Col, Card } from "react-bootstrap";

export default function QuickStats({ events = [] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayEvents = events.filter((e) => {
    const d = new Date(e.date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);

  const weekEvents = events.filter((e) => {
    const d = new Date(e.date);
    return d >= today && d <= weekEnd;
  });

  const upcomingNext = events
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const daysUntilNext = upcomingNext
    ? Math.ceil((new Date(upcomingNext.date) - today) / (1000 * 60 * 60 * 24))
    : null;

  const stats = [
    {
      label: "Today",
      value: todayEvents.length,
      sub: todayEvents.length === 1 ? "event" : "events",
      accent: "#3b82f6",
      icon: "◈",
    },
    {
      label: "This Week",
      value: weekEvents.length,
      sub: weekEvents.length === 1 ? "event" : "events",
      accent: "#60a5fa",
      icon: "◉",
    },
    {
      label: "Next Up",
      value:
        daysUntilNext !== null
          ? daysUntilNext === 0
            ? "Today"
            : `${daysUntilNext}d`
          : "—",
      sub: upcomingNext ? upcomingNext.title : "No upcoming",
      accent: "#93c5fd",
      icon: "◷",
      isText: typeof daysUntilNext !== "number" || daysUntilNext === 0,
    },
  ];

  return (
    <Row className="g-3">
      {stats.map((stat, i) => (
        <Col key={i} xs={12} md={4}>
          <Card
            style={{
              background: "#111d2e",
              border: "1px solid #1a2d42",
              borderRadius: 14,
              position: "relative",
              overflow: "hidden",
              minHeight: "100%",
            }}
          >
            <Card.Body style={{ padding: "18px 20px" }}>
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: `${stat.accent}0f`,
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#3d5a72",
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ color: stat.accent, fontSize: 14 }}>
                  {stat.icon}
                </span>
                {stat.label}
              </div>

              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: stat.isText ? 24 : 36,
                  fontWeight: 800,
                  color: stat.accent,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  marginBottom: 6,
                }}
              >
                {stat.value}
              </div>

              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "#4a6d8c",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: 500,
                }}
              >
                {stat.sub}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
