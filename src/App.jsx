import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

export function App() {
  const tabs = [
    "Salad",
    "Barnyard",
    "HenHouse",
    "Biriyani",
    "Fast Food",
    "Sea Food",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // Auto-scroll active tab into center
  useEffect(() => {
    const el = document.getElementById(`tab-${activeIndex}`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  // Swipe left/right only on tab strip
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeIndex < tabs.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    },
    trackMouse: true,
  });

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>Swipe Tabs Like WhatsApp</h2>

      {/* Swipeable Tab Strip */}
      <div
        {...handlers}
        ref={scrollRef}
        className="scroll-strip"
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 16,
          padding: "12px 8px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y", // IMPORTANT: enables horizontal swipe
        }}
      >
        {tabs.map((t, i) => (
          <div
            id={`tab-${i}`}
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              flexShrink: 0,
              padding: "10px 20px",
              borderRadius: 30,
              whiteSpace: "nowrap",
              fontWeight: 600,
              background: activeIndex === i ? "#25D366" : "#f2f2f2",
              color: activeIndex === i ? "white" : "#333",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Hide scrollbar */}
      <style>
        {`
          .scroll-strip::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {/* Content section */}
      <div
        style={{
          marginTop: 30,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 10,
        }}
      >
        <h3>Selected: {tabs[activeIndex]}</h3>
        <p>Swipe left or right on the tab strip to change tabs.</p>
      </div>
    </div>
  );
}


export default App;
