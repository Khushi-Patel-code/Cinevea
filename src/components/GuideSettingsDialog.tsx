import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { VoiceSettings } from "@/components/VoiceSettings";
export function GuideSettingsDialog({onClose,onPreview,tts,onTts}:{onClose:()=>void;onPreview:()=>void;tts:boolean;onTts:()=>void}) {
 const panel=useRef<HTMLDivElement>(null);
 useEffect(()=>{const previous=document.activeElement as HTMLElement|null;panel.current?.querySelector<HTMLElement>("button")?.focus();return()=>previous?.focus();},[]);
 return <div className="guide-settings-backdrop" onPointerDown={e=>{if(e.target===e.currentTarget)onClose();}}><div className="guide-settings-dialog" ref={panel} role="dialog" aria-modal="true" aria-labelledby="guide-settings-title" onKeyDown={e=>{
 if(e.key==="Escape"){e.stopPropagation();onClose();}
 if(e.key==="Tab"){const items=[...panel.current!.querySelectorAll<HTMLElement>('button:not(:disabled),select,input')];const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
 }}><header><h2 id="guide-settings-title">Voice settings</h2><button type="button" className="icon-button" aria-label="Close voice settings" onClick={onClose}><X size={19} aria-hidden="true"/></button></header>
 <label className="settings-check"><input type="checkbox" checked={tts} onChange={onTts}/>Spoken replies</label>
 <VoiceSettings onPreview={onPreview}/>
 <div className="voice-settings-extra"><label>Recognition language<select defaultValue={localStorage.getItem("cinevea-speech-language")||"en-CA"} onChange={e=>localStorage.setItem("cinevea-speech-language",e.target.value)}><option value="en-CA">English Canada</option><option value="en-IN">English India</option><option value="en-US">English US</option><option value="en-GB">English UK</option></select></label><label>Pause before sending<select defaultValue={localStorage.getItem("cinevea-pause")||"2800"} onChange={e=>{localStorage.setItem("cinevea-pause",e.target.value);window.dispatchEvent(new Event("cinevea-pause-change"));}}><option value="1600">Short</option><option value="2800">Natural</option><option value="4000">Longer</option></select></label></div>
 </div></div>;
}
