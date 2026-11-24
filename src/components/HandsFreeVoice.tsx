import { useEffect, useRef, useState } from "react";
import { MicOff, Pause } from "lucide-react";
import { speechController } from "@/lib/speech";
import {
  VoiceConversation,
  type VoiceSnapshot,
  type VoicePhase,
} from "@/lib/voiceConversation";
export function HandsFreeVoice({
  send,
  busy,
  speaking,
  onExit,
  onPhase,
}: {
  send: (t: string) => Promise<void>;
  busy: boolean;
  speaking: boolean;
  onExit: () => void;
  onPhase: (p: VoicePhase) => void;
}) {
  const latest = useRef({ send, busy, speaking, onPhase });
  latest.current = { send, busy, speaking, onPhase };
  const [snapshot, setSnapshot] = useState<VoiceSnapshot>({
    phase: "idle",
    message: "Starting voice conversation…",
    transcript: "",
  });
  const [pauseMs, setPauseMs] = useState(() => Number(localStorage.getItem("cinevea-pause")) || 2800);
  useEffect(()=>{const sync=()=>setPauseMs(Number(localStorage.getItem("cinevea-pause"))||2800);window.addEventListener("cinevea-pause-change",sync);return()=>window.removeEventListener("cinevea-pause-change",sync);},[]);
  const controller = useRef<VoiceConversation | null>(null);
  const running = useRef(true);
  useEffect(() => {
    try { localStorage.setItem("cinevea-pause",String(pauseMs)); } catch { /* Device storage optional. */ }
    const engine = new VoiceConversation({
      speech: speechController,
      send: (t) => latest.current.send(t),
      busy: () => latest.current.busy,
      speaking: () => latest.current.speaking,
      pauseMs,
      update: (s) => {
        running.current = !["paused", "error"].includes(s.phase);
        setSnapshot(s);
        latest.current.onPhase(s.phase);
      },
    });
    controller.current = engine;
    if (running.current) engine.start();
    const pauseWhenHidden = () => {
      if (document.hidden) engine.stop();
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      engine.stop(false);
      controller.current = null;
    };
  }, [pauseMs]);
  const paused = ["paused", "error"].includes(snapshot.phase);
  return (
    <section
      className="hands-free-panel"
      aria-label="Hands-free voice conversation"
    >
      <div className={`voice-orbit phase-${snapshot.phase}`} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <p className="voice-feedback" role="status" aria-live="polite">
        {snapshot.message}
      </p>
      {snapshot.transcript && (
        <div className="heard-transcript">
          <span>What I heard</span>
          <p>{snapshot.transcript}</p>
        </div>
      )}
      <div className="button-row">
        <button
          className="secondary-button compact-voice-button"
          onClick={() =>
            paused ? controller.current?.start() : controller.current?.stop()
          }
        >
          {paused ? "Resume voice" : "Pause voice"}
          {paused ? (
            <MicOff size={17} aria-hidden="true" />
          ) : (
            <Pause size={17} aria-hidden="true" />
          )}
        </button>
        <button
          className="secondary-button"
          onClick={() => {
            controller.current?.stop();
            onExit();
          }}
        >
          <span className="sr-only">Use text / review mode</span><span aria-hidden="true">Back to chat</span>
        </button>
      </div>

    </section>
  );
}
