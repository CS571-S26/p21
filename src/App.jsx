import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import NavigationBar from "./components/NavigationBar";
import MealsPage from "./pages/MealsPage"
import ListsPage from "./pages/ListsPage"

// ── SEED DATA ──────────────────────────────────────────────────
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function offsetDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const SEED_EVENTS = [];

// ── MODAL ──────────────────────────────────────────────────────
const C = {
  bg: "#07101c",
  surface: "#0d1825",
  surface2: "#111d2e",
  border: "#1a2d42",
  border2: "#1e3a5f",
  blue: "#3b82f6",
  blueDim: "#2563eb",
  text: "#e8f0fe",
  textMid: "#6b8cae",
  textDim: "#3d5a72",
  red: "#ef4444",
};

function EventModal({ event, defaultDate, onSave, onClose }) {
  const isEdit = !!event;
  const fmt = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

  const [form, setForm] = useState({
    title: isEdit ? event.title : "",
    date: isEdit ? fmt(event.date) : fmt(defaultDate || new Date()),
    startTime: isEdit ? event.startTime || "" : "",
    endTime: isEdit ? event.endTime || "" : "",
    category: isEdit ? event.category || "default" : "default",
    location: isEdit ? event.location || "" : "",
    allDay: isEdit ? !!event.allDay : false,
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim() || !form.date) return;
    onSave({ ...event, ...form, id: event?.id || Date.now() });
  };

  const inputStyle = {
    width: "100%",
    background: C.surface2,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    color: C.text,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    padding: "9px 12px",
    outline: "none",
    boxSizing: "border-box",
  };
  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    color: C.textDim,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 5,
    display: "block",
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(7,16,28,0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border2}`,
          borderRadius: 18,
          padding: "28px 28px 24px",
          width: "100%",
          maxWidth: 480,
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: C.text,
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            {isEdit ? "Edit Event" : "New Event"}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: C.textMid,
              fontSize: 22,
              cursor: "pointer",
              lineHeight: 1,
              padding: 0,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Event Title *</label>
            <input
              style={inputStyle}
              value={form.title}
              placeholder="What's happening?"
              onChange={(e) => set("title", e.target.value)}
            />
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div>
              <label style={labelStyle}>Date *</label>
              <input
                type="date"
                style={inputStyle}
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="default">General</option>
                <option value="work">Work</option>
                <option value="family">Family</option>
                <option value="health">Health</option>
                <option value="school">School</option>
                <option value="social">Social</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="checkbox"
              id="allday"
              checked={form.allDay}
              onChange={(e) => set("allDay", e.target.checked)}
              style={{ width: 15, height: 15, accentColor: C.blue }}
            />
            <label
              htmlFor="allday"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: C.textMid,
                cursor: "pointer",
              }}
            >
              All day event
            </label>
          </div>

          {!form.allDay && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div>
                <label style={labelStyle}>Start Time</label>
                <input
                  type="time"
                  style={inputStyle}
                  value={form.startTime}
                  onChange={(e) => set("startTime", e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>End Time</label>
                <input
                  type="time"
                  style={inputStyle}
                  value={form.endTime}
                  onChange={(e) => set("endTime", e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label style={labelStyle}>Location</label>
            <input
              style={inputStyle}
              value={form.location}
              placeholder="Optional location"
              onChange={(e) => set("location", e.target.value)}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 24,
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              color: C.textMid,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              padding: "8px 20px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              padding: "9px 24px",
              cursor: "pointer",
              boxShadow: "0 2px 12px #3b82f640",
            }}
          >
            {isEdit ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── INNER APP (has access to useNavigate) ──────────────────────
function PadiCaliApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [modal, setModal] = useState(null); // { mode: "add"|"edit", event?, defaultDate? }

  useEffect (() => {
    const savedEvents = localStorage.getItem("padicali-events");

    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      setEvents(SEED_EVENTS);
    }
    
    setEventsLoaded(true);
  }, []);
  
  useEffect(() => {
    if (eventsLoaded) {
      localStorage.setItem("padicali-events", JSON.stringify(events));
    }
  }, [events, eventsLoaded]);

  const openAdd = (date) =>
    setModal({ mode: "add", defaultDate: date || new Date() });
  const openEdit = (ev) => setModal({ mode: "edit", event: ev });
  const closeModal = () => setModal(null);

  const handleSave = (ev) => {
    setEvents((prev) =>
      modal.mode === "edit"
        ? prev.map((e) => (e.id === ev.id ? ev : e))
        : [...prev, ev],
    );
    closeModal();
  };

  const handleDelete = (id) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        backgroundImage:
          "radial-gradient(ellipse 60% 40% at 50% 0%, #0d2340 0%, transparent 70%)",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <NavigationBar
        currentPage={location.pathname === "/calendar"
          ? "calendar" 
          : location.pathname === "/meals"
          ? "meals"
          : location.pathname === "/lists"
          ? "lists"
          : "home"
        }
        onNavigate={(page) => navigate(page === "home" ? "/" : `/${page}`)}
        onAdd={() => openAdd(new Date())}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              events={events}
              onNavigate={(page) =>
                navigate(page === "home" ? "/" : `/${page}`)
              }
              onEditEvent={openEdit}
              onDeleteEvent={handleDelete}
              onAddEvent={openAdd}
            />
          }
        />

        <Route
          path="/calendar"
          element={
            <CalendarPage
              events={events}
              onAddEvent={openAdd}
              onEditEvent={openEdit}
              onDeleteEvent={handleDelete}
            />
          }
        />

          <Route 
            path = "/meals"
            element = {<MealsPage/>}
          />

          <Route
            path = "/lists"
            element = {<ListsPage />} />
      </Routes>

      {modal && (
        <EventModal
          event={modal.event}
          defaultDate={modal.defaultDate}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter basename="/p21/">
      <PadiCaliApp />
    </BrowserRouter>
  );
}
