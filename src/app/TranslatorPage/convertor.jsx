"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Mic, Square, ArrowLeftRight, Volume2, Copy } from "lucide-react";
import "./page.css"; // keep your theme vars here

// ---- Language catalog (label + BCP-47 speech code) ----
const LANGS = [
  { label: "English", code: "en-US" },
  { label: "Hindi", code: "hi-IN" },
  { label: "Spanish", code: "es-ES" },
  { label: "French", code: "fr-FR" },
  { label: "German", code: "de-DE" },
  { label: "Chinese", code: "zh-CN" },
  { label: "Japanese", code: "ja-JP" },
  { label: "Arabic", code: "ar-SA" },
];

const byLabel = (label) => LANGS.find((x) => x.label === label) || LANGS[0];

// ---- Translation stub: plug your API here ----
// Return a Promise<string>. Keep as-is to echo the source (dev mode).
async function translateText({ text, from, to }) {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, from, to }),
  });

  // Try to parse JSON either way
  let payload;
  try {
    payload = await res.json();
  } catch {
    throw new Error(`Translate failed: non-JSON response (HTTP ${res.status})`);
  }

  if (!res.ok) {
    // Surface whatever the API route returned (status/detail)
    const detail =
      payload?.error ||
      payload?.detail ||
      payload?.message ||
      `HTTP ${res.status}`;
    throw new Error(`Translate failed: ${detail}`);
  }

  if (!payload?.translated) {
    throw new Error("Translate failed: missing 'translated' in response");
  }

  return payload.translated;
}




export default function VoiceConverter() {
  const [fromLabel, setFromLabel] = useState("English");
  const [toLabel, setToLabel] = useState("Hindi");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [supportsSR, setSupportsSR] = useState(true);
  const [supportsTTS, setSupportsTTS] = useState(true);
  const [busy, setBusy] = useState(false);
  const [hint, setHint] = useState("Tap the mic to start recording");

  // Audio level animation (pure CSS + time-based pulse)
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    let raf;
    if (isListening) {
      const loop = (t) => {
        setPulse((Math.sin(t / 150) + 1) / 2); // 0..1
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(raf);
  }, [isListening]);

  // SpeechRecognition wiring
  const recRef = useRef(null);
  const interimRef = useRef("");
  const { code: fromCode } = byLabel(fromLabel);
  const { code: toCode } = byLabel(toLabel);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSupportsSR(false);
      setHint("Speech Recognition not supported in this browser.");
      return;
    }
    const rec = new SR();
    rec.lang = fromCode;
    rec.continuous = true;
    rec.interimResults = true;

    rec.onstart = () => setHint("Listening… click the mic again to stop");
    rec.onerror = (e) => setHint(`Mic error: ${e.error || "unknown"}`);
    rec.onend = () => {
      setIsListening(false);
      setHint("Tap the mic to start recording");
    };
    rec.onresult = (e) => {
      let finalChunk = "";
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalChunk += r[0].transcript + " ";
        else interim += r[0].transcript;
      }
      if (finalChunk) setInputText((prev) => (prev + " " + finalChunk).trim());
      interimRef.current = interim;
    };

    recRef.current = rec;
    return () => {
      try { rec.stop(); } catch {}
      recRef.current = null;
    };
  }, [fromCode]);

  const toggleListen = () => {
    if (!supportsSR) return;
    if (isListening) {
      try { recRef.current?.stop(); } catch {}
      setIsListening(false);
    } else {
      try {
        setOutputText("");
        interimRef.current = "";
        recRef.current.lang = fromCode;
        recRef.current.start();
        setIsListening(true);
      } catch (e) {
        setHint("Could not access microphone. Check permissions.");
      }
    }
  };

  // Speech Synthesis
  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSupportsTTS(false);
    }
  }, []);
  const speak = (text, langCode) => {
    if (!supportsTTS || !text?.trim()) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langCode;
    // try to pick a matching voice
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang.toLowerCase().startsWith(langCode.toLowerCase()));
    if (match) utter.voice = match;
    window.speechSynthesis.cancel(); // stop any previous
    window.speechSynthesis.speak(utter);
  };

  const onTranslate = async () => {
  if (!inputText.trim()) return;
  setBusy(true);
  try {
    const translated = await translateText({
      text: inputText.trim(),
      from: fromCode,
      to: toCode,
    });
    setOutputText(translated);
    speak(translated, toCode);
    setHint("Translated successfully.");
  } catch (e) {
    setHint(String(e.message || e));
  } finally {
    setBusy(false);
  }
};


  const swap = () => {
    setFromLabel(toLabel);
    setToLabel(fromLabel);
    setInputText(outputText);
    setOutputText("");
  };

  const copy = (which) => {
    const t = which === "left" ? inputText : outputText;
    if (!t) return;
    navigator.clipboard?.writeText(t);
  };

  const liveText = inputText + (interimRef.current ? " " + interimRef.current : "");

  return (
    <div className="vc-wrap">
      <div className="vc-card">
        <header className="vc-head">
          <h1 className="vc-brand">
            Cabit <span className="accent">Translate</span>
          </h1>
          <p className="vc-hint">{hint}</p>
        </header>

        <div className="vc-controls">
          <div className="selects">
            <div className="select">
              <label>From</label>
              <select value={fromLabel} onChange={(e) => setFromLabel(e.target.value)}>
                {LANGS.map((l) => (
                  <option key={l.code} value={l.label}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="swap" type="button" onClick={swap} title="Swap languages">
              <ArrowLeftRight size={18} />
            </button>

            <div className="select">
              <label>To</label>
              <select value={toLabel} onChange={(e) => setToLabel(e.target.value)}>
                {LANGS.map((l) => (
                  <option key={l.code} value={l.label}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            className={`mic ${isListening ? "on" : ""} ${!supportsSR ? "disabled" : ""}`}
            onClick={toggleListen}
            disabled={!supportsSR}
            aria-pressed={isListening}
            aria-label={isListening ? "Stop recording" : "Start recording"}
          >
            <div className="pulse" style={{ "--pulse": pulse }} />
            {isListening ? <Square size={22} /> : <Mic size={22} />}
          </button>
        </div>

        <div className="vc-panels">
          <div className="panel">
            <div className="panel-head">
              <span>{fromLabel}</span>
              <div className="panel-actions">
                {supportsTTS && (
                  <button className="icon" onClick={() => speak(liveText, fromCode)} title="Speak">
                    <Volume2 size={18} />
                  </button>
                )}
                <button className="icon" onClick={() => copy("left")} title="Copy">
                  <Copy size={18} />
                </button>
              </div>
            </div>
            <textarea
              value={liveText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Speak or type in ${fromLabel}...`}
            />
          </div>

          <div className="panel">
            <div className="panel-head">
              <span>{toLabel}</span>
              <div className="panel-actions">
                {supportsTTS && (
                  <button className="icon" onClick={() => speak(outputText, toCode)} title="Speak">
                    <Volume2 size={18} />
                  </button>
                )}
                <button className="icon" onClick={() => copy("right")} title="Copy">
                  <Copy size={18} />
                </button>
              </div>
            </div>
            <textarea
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
              placeholder={`Translation will appear here in ${toLabel}...`}
            />
          </div>
        </div>

        <footer className="vc-foot">
          <button className="cta" onClick={onTranslate} disabled={busy || !liveText.trim()}>
            {busy ? "Translating…" : "Translate & Speak"}
          </button>
        </footer>
      </div>
    </div>
  );
}
