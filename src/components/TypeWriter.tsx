import React, { useEffect } from "react";

interface TypeWriterProps {
  text: string;
}

function TypeWriter({ text }: TypeWriterProps) {
  const { 0: currentIndex, 1: setCurrentIndex } = React.useState(0);
  const { 0: currentText, 1: setCurrentText } = React.useState("");

  useEffect(() => {
    let timeOut: any = null;
    if (currentIndex < text.length) {
      timeOut = setTimeout(() => {
        setCurrentText((curr) => curr + text[currentIndex]);
        setCurrentIndex((curr) => curr + 1);
      }, 20);
    }

    return () => clearTimeout(timeOut);
  }, [currentIndex, currentText, text, setCurrentIndex, setCurrentText]);

  return (
    <p className="text-3xl font-semibold text-center">
      {currentText} <span className="w-1 h-2 animate-typer">|</span>
    </p>
  );
}

export default TypeWriter;
