import { useEffect, useRef, useState } from "react";
import { Settings2 } from "lucide-react";
function initial() {
  try {
    const value = JSON.parse(localStorage.getItem("cinevea-display") || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}
export function AccessibilitySettings() {
  const [settings, setSettings] = useState<{
    large?: boolean;
    still?: boolean;
    contrast?: boolean;
    theme?: string;
    mono?: boolean;
    language?: string;

  }>(initial);
  const panel = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const outside = (event:PointerEvent) => { if (!panel.current?.contains(event.target as Node)) panel.current?.removeAttribute("open"); };
    const sync = () => setSettings(initial());
    document.addEventListener("pointerdown",outside);
    window.addEventListener("cinevea-display-change",sync);
    return () => {document.removeEventListener("pointerdown",outside);window.removeEventListener("cinevea-display-change",sync);};
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme || "dark";
    root.dataset.mono = String(Boolean(settings.mono));
    try { localStorage.removeItem("cinevea-transcription"); } catch { /* Storage optional. */ }
    root.dataset.largeText = String(Boolean(settings.large));
    root.dataset.still = String(Boolean(settings.still));
    root.dataset.contrast = String(Boolean(settings.contrast));
    try {
      localStorage.setItem("cinevea-display", JSON.stringify(settings));
    } catch {
      /* Display settings still apply when storage is unavailable. */
    }
  }, [settings]);
  return (
    <details
      ref={panel}
      className="display-settings"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          panel.current?.removeAttribute("open");
          panel.current?.querySelector("summary")?.focus();
        }
      }}
    >
      <summary>
        <Settings2 size={17} aria-hidden="true" />
        <span>Display</span>
      </summary>
      <div className="display-popover">
        <h2>Display</h2>
        <label>Appearance<select value={settings.theme || "dark"} onChange={e => setSettings(s => ({...s, theme:e.target.value}))}><option value="dark">Dark</option><option value="light">Light</option></select></label>
        <label><input type="checkbox" checked={Boolean(settings.mono)} onChange={e => setSettings(s => ({...s, mono:e.target.checked}))}/>Monochrome</label>
        <label>
          <input
            type="checkbox"
            checked={Boolean(settings.large)}
            onChange={(e) =>
              setSettings((s) => ({ ...s, large: e.target.checked }))
            }
          />
          Larger text
        </label>
        <label>
          <input
            type="checkbox"
            checked={Boolean(settings.contrast)}
            onChange={(e) =>
              setSettings((s) => ({ ...s, contrast: e.target.checked }))
            }
          />
          Stronger borders and contrast
        </label>
        <label>
          <input
            type="checkbox"
            checked={Boolean(settings.still)}
            onChange={(e) =>
              setSettings((s) => ({ ...s, still: e.target.checked }))
            }
          />
          Reduce animation
        </label>

      </div>
    </details>
  );
}
