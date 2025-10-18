"use client";

import { useEffect } from "react";
import { NavigatorX, createBackAction, createNavigateAction } from "navigatorx";
import { useRouter } from "next/navigation";

// Singleton instance
let navigatorInstance: NavigatorX | null = null;

export function getNavigator(): NavigatorX {
  if (!navigatorInstance) {
    navigatorInstance = new NavigatorX();
  }
  return navigatorInstance;
}

export function NavigatorXProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Initialize NavigatorX on client side only
    const nav = getNavigator();

    // Register global shortcuts here
    nav.registerShortcut(
      "home",
      ["Shift", "h"],
      () => router.push("/"),
      createNavigateAction("/")
    );

    nav.registerShortcut(
      "about",
      ["Shift", "a"],
      () => router.push("/about"),
      createNavigateAction("/about")
    );

    nav.registerShortcut(
      "dashboard",
      ["Shift", "d"],
      () => router.push("/dashboard"),
      createNavigateAction("/dashboard")
    );

    nav.registerShortcut(
      "contact",
      ["Shift", "c"],
      () => router.push("/contact"),
      createNavigateAction("/contact")
    );

    nav.registerShortcut(
      "previous",
      ["Shift", "p"],
      () => router.back(),
      createBackAction("/")
    );

    nav.registerShortcut(
      "search",
      ["Shift", "s"],
      () => {
        // Trigger search modal
        const event = new CustomEvent("open-search");
        window.dispatchEvent(event);
      },
      { type: "custom", message: "search" }
    );

    // Cleanup on unmount
    return () => {
      nav.destroy();
      navigatorInstance = null;
    };
  }, []);

  return <>{children}</>;
}
