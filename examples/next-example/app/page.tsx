"use client";

import { getNavigator } from "@/components/NavigatorXProvider";
import { createNavigateAction, ModifierKey } from "navigatorx";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const setChange = () => {
    const nav = getNavigator();

    const shortcuts = document.querySelectorAll(".shortcut");

    shortcuts.forEach((shortcut) => {
      const actionName = shortcut.querySelector(".action")?.textContent?.trim();
      function isModifierKey(value: string): value is ModifierKey {
        return ["Shift", "Ctrl", "Alt"].includes(value);
      }

      const rawModifier = (
        shortcut.querySelector(".modifier") as HTMLSelectElement
      )?.value;
      if (!isModifierKey(rawModifier)) return;
      const modifier = rawModifier;

      const key = (
        shortcut.querySelector(".key") as HTMLInputElement
      )?.value.toUpperCase();

      if (!actionName || !modifier || !key) return;

      let url: string | null = null;
      switch (actionName) {
        case "Home":
          url = "/";
          break;
        case "About":
          url = "/about";
          break;
        case "Contact":
          url = "/contact";
          break;
        case "DashBoard":
          url = "/dashboard";
          break;
        case "Previous":
          // example back action
          nav.registerShortcut(
            actionName.toLowerCase(),
            [modifier, key],
            () => router.back(),
            { type: "back" }
          );
          return;
        case "Search":
          // example custom action
          nav.registerShortcut(
            actionName.toLowerCase(),
            [modifier, key],
            () => alert("Open Search"),
            { type: "custom", message: "search triggered" }
          );
          return;
      }

      if (url) {
        nav.registerShortcut(
          actionName.toLowerCase(),
          [modifier, key],
          () => router.push(url),
          createNavigateAction(url)
        );
      }

      console.log(`Registered: ${actionName} → ${modifier} + ${key}`);
    });

    alert("Shortcuts saved!");
  };

  return (
    <main>
      <ul className="shortcuts">
        <li className="shortcut">
          <div className="action">Home</div>
          <select className="modifier">
            <option value="Shift">Shift</option>
            <option value="Ctrl">Ctrl</option>
            <option value="Alt">Alt</option>
          </select>
          <div className="plus">+</div>
          <input className="key" defaultValue="I" />
        </li>

        <li className="shortcut">
          <div className="action">About</div>
          <select className="modifier">
            <option value="Shift">Shift</option>
            <option value="Ctrl">Ctrl</option>
            <option value="Alt">Alt</option>
          </select>
          <div className="plus">+</div>
          <input className="key" defaultValue="A" />
        </li>

        <li className="shortcut">
          <div className="action">Contact</div>
          <select className="modifier">
            <option value="Shift">Shift</option>
            <option value="Ctrl">Ctrl</option>
            <option value="Alt">Alt</option>
          </select>
          <div className="plus">+</div>
          <input className="key" defaultValue="C" />
        </li>

        <li className="shortcut">
          <div className="action">DashBoard</div>
          <select className="modifier">
            <option value="Shift">Shift</option>
            <option value="Ctrl">Ctrl</option>
            <option value="Alt">Alt</option>
          </select>
          <div className="plus">+</div>
          <input className="key" defaultValue="D" />
        </li>

        <li className="shortcut">
          <div className="action">Previous</div>
          <select className="modifier">
            <option value="Shift">Shift</option>
            <option value="Ctrl">Ctrl</option>
            <option value="Alt">Alt</option>
          </select>
          <div className="plus">+</div>
          <input className="key" defaultValue="P" />
        </li>

        <li className="shortcut">
          <div className="action">Search</div>
          <select className="modifier">
            <option value="Shift">Shift</option>
            <option value="Ctrl">Ctrl</option>
            <option value="Alt">Alt</option>
          </select>
          <div className="plus">+</div>
          <input className="key" defaultValue="S" />
        </li>
      </ul>

      <button id="save" onClick={setChange}>
        Save
      </button>
    </main>
  );
}
