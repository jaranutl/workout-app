import { useState } from "react";

const days = [
  {
    id: 1,
    label: "Day 1",
    title: "Push",
    subtitle: "Chest · Shoulders · Triceps",
    color: "#e8453c",
    icon: "▲",
    exercises: [
      { name: "Barbell Bench Press", sets: "4", reps: "6–8", rest: "2–3 min", note: "Primary chest builder" },
      { name: "Incline Dumbbell Press", sets: "3", reps: "8–10", rest: "90 sec", note: "Upper chest emphasis" },
      { name: "Cable Fly (Low to High)", sets: "3", reps: "12–15", rest: "60 sec", note: "Chest isolation" },
      { name: "Overhead Press (Barbell)", sets: "4", reps: "6–8", rest: "2 min", note: "Main shoulder compound" },
      { name: "Lateral Raises", sets: "4", reps: "12–15", rest: "45 sec", note: "Side delt width" },
      { name: "Tricep Rope Pushdown", sets: "3", reps: "10–12", rest: "60 sec", note: "" },
      { name: "Overhead Tricep Extension", sets: "3", reps: "10–12", rest: "60 sec", note: "Long head stretch" },
    ],
  },
  {
    id: 2,
    label: "Day 2",
    title: "Pull",
    subtitle: "Back · Biceps · Rear Delts",
    color: "#2d7dd2",
    icon: "◆",
    exercises: [
      { name: "Barbell Deadlift", sets: "4", reps: "5–6", rest: "3 min", note: "Full posterior chain" },
      { name: "Weighted Pull-Ups", sets: "4", reps: "6–8", rest: "2 min", note: "Use belt if needed" },
      { name: "Seated Cable Row", sets: "3", reps: "8–10", rest: "90 sec", note: "Mid-back thickness" },
      { name: "Lat Pulldown (Wide Grip)", sets: "3", reps: "10–12", rest: "90 sec", note: "Lat width" },
      { name: "Face Pulls", sets: "3", reps: "15–20", rest: "60 sec", note: "Posture + rear delts" },
      { name: "Barbell Curl", sets: "3", reps: "8–10", rest: "60 sec", note: "" },
      { name: "Hammer Curl", sets: "3", reps: "10–12", rest: "60 sec", note: "Brachialis & forearms" },
    ],
  },
  {
    id: 3,
    label: "Day 3",
    title: "Legs",
    subtitle: "Quads · Hamstrings · Glutes · Calves",
    color: "#f18f01",
    icon: "●",
    exercises: [
      { name: "Barbell Back Squat", sets: "4", reps: "6–8", rest: "2–3 min", note: "King of leg exercises" },
      { name: "Romanian Deadlift", sets: "3", reps: "8–10", rest: "2 min", note: "Hamstring & glute focus" },
      { name: "Leg Press", sets: "3", reps: "10–12", rest: "90 sec", note: "High-foot placement for glutes" },
      { name: "Walking Lunges", sets: "3", reps: "12 each leg", rest: "90 sec", note: "Balance & unilateral" },
      { name: "Leg Curl (Machine)", sets: "3", reps: "10–12", rest: "60 sec", note: "" },
      { name: "Leg Extension (Machine)", sets: "3", reps: "12–15", rest: "60 sec", note: "Quad isolation" },
      { name: "Standing Calf Raise", sets: "4", reps: "15–20", rest: "45 sec", note: "Full range of motion" },
    ],
  },
  {
    id: 4,
    label: "Day 4",
    title: "Upper",
    subtitle: "Full Upper Body · Weak Points",
    color: "#3bb273",
    icon: "■",
    exercises: [
      { name: "Incline Barbell Press", sets: "4", reps: "6–8", rest: "2 min", note: "Chest + shoulder heavy" },
      { name: "Chest-Supported DB Row", sets: "4", reps: "8–10", rest: "90 sec", note: "No lower back fatigue" },
      { name: "Dumbbell Shoulder Press", sets: "3", reps: "10–12", rest: "90 sec", note: "" },
      { name: "Cable Row (Single Arm)", sets: "3", reps: "10 each", rest: "60 sec", note: "Unilateral balance" },
      { name: "Pec Deck / Cable Fly", sets: "3", reps: "12–15", rest: "60 sec", note: "Chest pump finisher" },
      { name: "EZ Bar Curl", sets: "3", reps: "10–12", rest: "60 sec", note: "" },
      { name: "Tricep Dips / Pushdown", sets: "3", reps: "10–12", rest: "60 sec", note: "Tricep finisher" },
    ],
  },
];

const height =182;
const weight = 69;

const cardio = [
  { type: "Zone 2 Cardio", desc: "30–40 min incline treadmill walk or cycling at conversational pace speed 4-5 km/hr and 10-15 steep", freq: "2× / week", icon: "🚶", tag: "Fat loss + heart health" },
  { type: "HIIT Sprints", desc: "15–20 min: 30 sec sprint / 90 sec walk, 6–8 rounds", freq: "1× / week", icon: "⚡", tag: "Metabolic boost" },
  { type: "Active Recovery", desc: "20 min light walk, stretching, or yoga on rest days", freq: "Optional", icon: "🧘", tag: "Mobility & recovery" },
];

const schedule = [
  { day: "Mon", session: "Push", color: "#e8453c" },
  { day: "Tue", session: "Zone 2 Cardio", color: "#888" },
  { day: "Wed", session: "Pull", color: "#2d7dd2" },
  { day: "Thu", session: "Rest / Active", color: "#555" },
  { day: "Fri", session: "Legs", color: "#f18f01" },
  { day: "Sat", session: "Upper + HIIT", color: "#3bb273" },
  { day: "Sun", session: "Rest", color: "#444" },
];

export default function WorkoutApp() {
  const [activeDay, setActiveDay] = useState(0);
  const [completedSets, setCompletedSets] = useState({});
  const [tab, setTab] = useState("program");

  const toggleSet = (exIdx, setIdx) => {
    const key = `${activeDay}-${exIdx}-${setIdx}`;
    setCompletedSets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isSetDone = (exIdx, setIdx) => completedSets[`${activeDay}-${exIdx}-${setIdx}`];

  const dayProgress = (dayIdx) => {
    const d = days[dayIdx];
    let total = 0, done = 0;
    d.exercises.forEach((ex, ei) => {
      const sets = parseInt(ex.sets);
      for (let s = 0; s < sets; s++) {
        total++;
        if (completedSets[`${dayIdx}-${ei}-${s}`]) done++;
      }
    });
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      background: "#0e0e0e",
      minHeight: "100vh",
      color: "#f0f0f0",
      maxWidth: 800,
      margin: "0 auto",
      padding: "0 0 60px",
    }}>
      {/* Header */}
      <div style={{
        padding: "32px 18px 20px",
        borderBottom: "1px solid #1e1e1e",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#666", textTransform: "uppercase", marginBottom: 6 }}>
              Intermediate · Bulk
            </div>
            <h1 style={{ color:"white", fontSize: 28, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
              4-Days Push Pull<br />
              <span style={{ color: "#e8453c" }}>Legs Upper</span>
            </h1>
          </div>
          <div style={{
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: 12,
            padding: "10px 14px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{height}cm</div>
            <div style={{ fontSize: 12, color: "#888" }}>{weight} kg</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          {["program", "schedule", "cardio"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? "#e8453c" : "#1a1a1a",
              color: tab === t ? "#fff" : "#888",
              border: "none",
              borderRadius: 20,
              padding: "6px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Program Tab */}
      {tab === "program" && (
        <div style={{ padding: "20px 24px" }}>
          {/* Day Selector */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 35, marginBottom: 24 }}>
            {days.map((d, i) => {
              const prog = dayProgress(i);
              return (
                <button key={i} onClick={() => setActiveDay(i)} style={{
                  background: activeDay === i ? d.color : "#1a1a1a",
                  border: activeDay === i ? `2px solid ${d.color}` : "2px solid #2a2a2a",
                  borderRadius: 14,
                  padding: "14px 8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 18, marginBottom: 2 }}>{d.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: activeDay === i ? "#fff" : "#aaa", letterSpacing: 1 }}>
                    {d.label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: activeDay === i ? "#fff" : "#fff", marginTop: 2 }}>
                    {d.title}
                  </div>
                  {prog > 0 && (
                    <div style={{ marginTop: 6, height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 2 }}>
                      <div style={{ width: `${prog}%`, height: "100%", background: "#fff", borderRadius: 2 }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Day Header */}
          <div style={{
            background: "#1a1a1a",
            borderLeft: `4px solid ${days[activeDay].color}`,
            borderRadius: "0 12px 12px 0",
            padding: "14px 18px",
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, textTransform: "uppercase" }}>
              {days[activeDay].subtitle}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 2 }}>
              {days[activeDay].title} Day
            </div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>
              {days[activeDay].exercises.length} exercises · Tap sets to track progress
            </div>
          </div>

          {/* Exercises */}
          {days[activeDay].exercises.map((ex, ei) => (
            <div key={ei} style={{
              background: "#141414",
              border: "1px solid #222",
              borderRadius: 14,
              padding: "16px",
              marginBottom: 10,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{ex.name}</div>
                  {ex.note && <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{ex.note}</div>}
                </div>
                <div style={{ textAlign: "right", fontSize: 12, color: "#888" }}>
                  <div>{ex.sets} sets × {ex.reps}</div>
                  <div style={{ color: "#555", marginTop: 2 }}>Rest: {ex.rest}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {Array.from({ length: parseInt(ex.sets) }).map((_, si) => {
                  const done = isSetDone(ei, si);
                  return (
                    <button key={si} onClick={() => toggleSet(ei, si)} style={{
                      width: 36, height: 36,
                      borderRadius: 8,
                      border: done ? `2px solid ${days[activeDay].color}` : "2px solid #333",
                      background: done ? days[activeDay].color : "transparent",
                      color: done ? "#fff" : "#666",
                      fontWeight: 800,
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}>
                      {done ? "✓" : si + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule Tab */}
      {tab === "schedule" && (
        <div style={{ padding: "20px 24px" }}>
          <div style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>
            A sample weekly layout — adjust days to fit your schedule.
          </div>
          {schedule.map((s, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: "#141414",
              border: "1px solid #222",
              borderRadius: 12,
              padding: "14px 18px",
              marginBottom: 8,
            }}>
              <div style={{
                width: 42, height: 42,
                borderRadius: 10,
                background: s.color + "22",
                border: `2px solid ${s.color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 13, color: s.color, flexShrink: 0,
              }}>
                {s.day}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{s.session}</div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                  {s.session === "Rest" ? "Full recovery" :
                    s.session === "Rest / Active" ? "Walk, stretch, or light mobility" :
                    s.session.includes("Cardio") ? "Zone 2 — treadmill or bike" :
                    s.session.includes("HIIT") ? "Upper body + HIIT finisher" :
                    "Resistance training"}
                </div>
              </div>
            </div>
          ))}
          <div style={{
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: 12,
            padding: "16px 18px",
            marginTop: 16,
          }}>
            <div style={{ fontWeight: 700, marginBottom: 8, color: "#e8453c" }}>💡 Programmer Tips</div>
            {[
              "Add face pulls & band pull-aparts daily — counteracts forward head posture",
              "Every 45 min of coding: stand, stretch chest & hip flexors for 2 min",
              "Sleep 7–8 hrs — muscle is built during recovery, not during training",
              "Aim for 2.0–2.2g protein per kg bodyweight (~138–152g/day for you) and add creatine for additional",
            ].map((tip, i) => (
              <div key={i} style={{ fontSize: 13, color: "#aaa", padding: "5px 0", borderBottom: i < 3 ? "1px solid #222" : "none" }}>
                {tip}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cardio Tab */}
      {tab === "cardio" && (
        <div style={{ padding: "20px 24px" }}>
          <div style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>
            Cardio is kept minimal to protect your calorie surplus while supporting heart health.
          </div>
          {cardio.map((c, i) => (
            <div key={i} style={{
              background: "#141414",
              border: "1px solid #222",
              borderRadius: 14,
              padding: "18px",
              marginBottom: 12,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 24 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{c.type}</div>
                    <div style={{ fontSize: 12, color: "#e8453c", marginTop: 2 }}>{c.freq}</div>
                  </div>
                </div>
                <div style={{
                  background: "#222",
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: 11,
                  color: "#888",
                }}>
                  {c.tag}
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#aaa", lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}

          {/* Calorie note */}
          <div style={{
            background: "#0f1f0f",
            border: "1px solid #1e3a1e",
            borderRadius: 12,
            padding: "16px 18px",
            marginTop: 8,
          }}>
            <div style={{ fontWeight: 700, marginBottom: 6, color: "#3bb273" }}>🔢 Bulking Calorie Target</div>
            <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>
              At 182 cm / 69 kg, your TDEE is roughly <strong style={{ color: "#fff" }}>2,400–2,600 kcal/day</strong>.<br />
              For a lean bulk, eat <strong style={{ color: "#3bb273" }}>+250–350 kcal above maintenance</strong> (~2,650–2,950 kcal).<br />
              Target <strong style={{ color: "#fff" }}>~140–152g protein/day</strong> and track weekly weight — aim for +0.25–0.5 kg/week.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
