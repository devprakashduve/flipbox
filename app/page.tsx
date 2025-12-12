"use client"
import  { useState } from "react";

interface Matched {
  index: number;
  value: number;
}

const Home = () => {
  const initialValue = [2, 2, 3, 5, 1, 2, 3, 4, 6, 2, 3, 4, 5];
  const [matched, setMatched] = useState<Matched[]>([]);
  const flipBox = (captureClickedBox:Matched) => {
    if (matched?.length >= 1) {
      setMatched([]);
    }
    if (matched.length <= 1) {
      setMatched([...matched, captureClickedBox]);
    }
    if (matched.length === 1 && matched[0].value !== captureClickedBox.value) {
      setMatched([]);
    }
  };
  console.log("matched", matched);
  const reset = () => {
    setMatched([]);
  };
  return (
    <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>
      {initialValue.map((item, index) => (
        <span key={"key" + index}>
          {matched.length >= 2 &&
          matched[0].value === matched[1].value &&
          (matched[0].index === index || matched[1].index === index) ? (
            <button
              onClick={() => {
                flipBox({ index, value: item });
              }}
              style={{
                margin: "4px",
                padding: "4px",
                width: "50px",
                height: "50px",
                visibility: "hidden",
              }}
            >
              {item}
            </button>
          ) : (
            <button
              onClick={() => {
                flipBox({ index, value: item });
              }}
              style={{
                margin: "4px",
                padding: "4px",
                width: "50px",
                height: "50px",
                background:"yellow",
                color: "red",
                
              }}
            >
              {matched.length &&
              matched[0].value === item &&
              matched[0].index === index
                ? item
                : ""}
            </button>
          )}
        </span>
      ))}
      <div>
        <button
          style={{ padding: "12px", marginTop: "30px", background: "yellow" , color: "red"}}
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Home;
