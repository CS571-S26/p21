import { Container, Card } from "react-bootstrap";
import QuickStats from "../components/QuickStats";
import SectionTitle from "../components/SectionTitle";
import EventCard from "../components/EventCard";

export default function HomePage({
  events,
  onNavigate,
  onEditEvent,
  onDeleteEvent,
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parseLocal = (val) => {
    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const [y, m, d] = val.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    const d = new Date(val);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const todayEvents = events
    .filter((e) => parseLocal(e.date).getTime() === today.getTime())
    .sort((a, b) => (a.startTime || "").localeCompare(b.startTime || ""));

  const upcomingEvents = events
    .filter((e) => parseLocal(e.date).getTime() > today.getTime())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Container fluid style={{ padding: "88px 32px 60px" }}>
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "#3b82f6",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {dayName}
        </div>

        <h1
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 36,
            fontWeight: 900,
            color: "#e8f0fe",
            margin: 0,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
          }}
        >
          {dateStr}
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: "#3d5a72",
            margin: "8px 0 0",
            fontWeight: 500,
          }}
        >
          {todayEvents.length === 0
            ? "Nothing scheduled today. Enjoy the open day!"
            : `You have ${todayEvents.length} event${todayEvents.length > 1 ? "s" : ""} today.`}
        </p>
      </div>

      <div style={{ marginBottom: 40 }}>
        <QuickStats events={events} />
      </div>

      <div style={{ marginBottom: 40 }}>
        <SectionTitle
          title="Today"
          subtitle={
            todayEvents.length === 0
              ? "Clear schedule"
              : `${todayEvents.length} event${todayEvents.length !== 1 ? "s" : ""}`
          }
          action={() => onNavigate("calendar")}
          actionLabel="Open Calendar"
        />

        {todayEvents.length === 0 ? (
          <Card
            style={{
              background: "#0d1825",
              border: "1px dashed #1a2d42",
              borderRadius: 12,
              padding: "32px 24px",
              textAlign: "center",
            }}
          >
            <Card.Body>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🌤</div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#2d4d6b",
                  fontSize: 14,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                No events today
              </p>
            </Card.Body>
          </Card>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {todayEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={onEditEvent}
                onDelete={onDeleteEvent}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <SectionTitle
          title="Coming Up"
          subtitle="Next 5 events on your schedule"
          action={() => onNavigate("calendar")}
          actionLabel="View All"
        />

        {upcomingEvents.length === 0 ? (
          <Card
            style={{
              background: "#0d1825",
              border: "1px dashed #1a2d42",
              borderRadius: 12,
              padding: "32px 24px",
              textAlign: "center",
            }}
          >
            <Card.Body>
              <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#2d4d6b",
                  fontSize: 14,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Nothing scheduled ahead
              </p>
            </Card.Body>
          </Card>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={onEditEvent}
                onDelete={onDeleteEvent}
                compact
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
