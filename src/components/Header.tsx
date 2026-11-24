import { ThemeToggle } from "@/components/ThemeToggle";
import { CinemaMark } from "@/components/CinemaMark";
import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-mark">
          <CinemaMark />
        </span>
        <span>
          Cinevea
        </span>
      </div>
      <div className="header-tools">
        <ThemeToggle />
        <div
          ref={root}
          className="account"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              trigger.current?.focus();
            }
          }}
        >
          <button
            ref={trigger}
            className="account-toggle"
            aria-expanded={open}
            aria-controls="account-details"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="account-avatar" aria-hidden="true">
              {user?.email?.slice(0, 1).toUpperCase() || "C"}
            </span>
            <span className="sr-only">Account</span>
            
          </button>
          {open && (
            <div id="account-details" className="account-popover">
              <p className="muted">Signed in as</p>
              <p className="account-email">{user?.email}</p>
              {error && <p role="alert">{error}</p>}
              <button
                className="secondary-button"
                onClick={async () => {
                  try {
                    await signOut();
                    setOpen(false);
                  } catch {
                    setError("Could not sign out. Please try again.");
                  }
                }}
              >
                <LogOut size={18} aria-hidden="true" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
