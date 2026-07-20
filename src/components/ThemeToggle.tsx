"use client";

import { type Theme, ToggleButton, useTheme } from "@once-ui-system/core";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export const SHORTCUT = "d";

export const ThemeToggle: React.FC = ({ options }: { options?: KeyframeAnimationOptions }) => {
  const ref = useRef<HTMLElement>(null);
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  const animate = useCallback(
    (fn: () => void) => {
      if (!ref.current) return fn();

      const { top, left, width, height } = ref.current.getBoundingClientRect();
      const [x, y] = [left + width / 2, top + height / 2];
      const vw = visualViewport?.width ?? innerWidth;
      const vh = visualViewport?.height ?? innerHeight;
      const radius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));

      if (!document.startViewTransition) return fn();

      const root = document.documentElement;
      root.setAttribute("data-theme-transition", "true");

      const transition = document.startViewTransition(() => flushSync(fn));

      transition.ready.then(() =>
        root.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
          },
          {
            duration: 400,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
            ...options,
          },
        ),
      );

      transition.finished.finally(() => root.removeAttribute("data-theme-transition"));
    },
    [options],
  );

  const setMode = useCallback(
    (theme: Theme) => animate(() => setTheme(theme)),
    [animate, setTheme],
  );

  useEffect(() => {
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || theme);
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === SHORTCUT && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setMode(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
      }
    };

    addEventListener("keydown", onKeyDown);
    return () => removeEventListener("keydown", onKeyDown);
  }, [setMode]);

  return (
    <ToggleButton
      ref={ref}
      prefixIcon={icon}
      onClick={() => setMode(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};
