import { useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(
    getWindowDimensions().width
  );

  useEffect(() => {
    function handleResize() {
        setWindowWidth(getWindowDimensions().width);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
