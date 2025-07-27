import { useEffect, useState } from "react";

export const useTypewriter = (text, speed = 30) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let i = 0;
    let currentText = "";
    setDisplayedText(""); // Reset before new typing starts

    const interval = setInterval(() => {
      currentText += text[i];
      setDisplayedText(currentText);
      i++;

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return displayedText;
};
