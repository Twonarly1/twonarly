import React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Detects whether the user is on an actual phone device,
 * not just a narrow desktop/tablet window.
 *
 * Combines viewport width with touch + user-agent heuristics
 * so a resized desktop browser still gets the sidebar Sheet.
 */
export function useIsPhone() {
  const [isPhone, setIsPhone] = React.useState(false);

  React.useEffect(() => {
    const checkIsPhone = () => {
      const isNarrow = window.innerWidth < MOBILE_BREAKPOINT;

      // Touch capability check — phones always have touch
      const hasTouch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;

      // User-agent heuristic — matches phones but not tablets/iPads
      const mobileUA = /iPhone|Android.*Mobile|webOS|BlackBerry|Opera Mini/i.test(
        navigator.userAgent,
      );

      // Coarse pointer means finger, not mouse cursor
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

      // Must be narrow AND show device-like signals
      setIsPhone(isNarrow && hasTouch && (mobileUA || hasCoarsePointer));
    };

    checkIsPhone();

    // Re-check on resize (orientation changes, etc.)
    window.addEventListener("resize", checkIsPhone);
    return () => window.removeEventListener("resize", checkIsPhone);
  }, []);

  return isPhone;
}
