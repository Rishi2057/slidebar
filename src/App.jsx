import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

function App() {
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

  // Auto scroll active tab into center
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

  // SWIPE HANDLERS
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeIndex < tabs.length - 1) setActiveIndex(activeIndex + 1);
    },
    onSwipedRight: () => {
      if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    },
    trackMouse: true,
  });

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>Swipe Tabs Like WhatsApp</h2>

      {/* Swipeable wrapper */}
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
              fontWeight: 600,
              whiteSpace: "nowrap",
              background: activeIndex === i ? "#25D366" : "#f2f2f2",
              color: activeIndex === i ? "white" : "#333",
              cursor: "pointer",
            }}
          >
            {t}
          </div>
        ))}
      </div>

      <style>
        {`
          .scroll-strip::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div
        style={{
          marginTop: 30,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 10,
        }}
      >
        <h3>Selected: {tabs[activeIndex]}</h3>
      </div>
    </div>
  );
}

export default App;
