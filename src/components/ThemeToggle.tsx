import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
export function ThemeToggle() {
 const [light,setLight]=useState(document.documentElement.dataset.theme==="light");
 useEffect(()=>{
 try{const saved=JSON.parse(localStorage.getItem("cinevea-display")||"{}");document.documentElement.dataset.theme=saved.theme==="light"?"light":"dark";}catch{/* Default dark when storage is unavailable. */}
 for(const key of ["mono","largeText","still","contrast"]) delete document.documentElement.dataset[key];
 setLight(document.documentElement.dataset.theme==="light");
 const observer=new MutationObserver(()=>setLight(document.documentElement.dataset.theme==="light"));observer.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});return()=>observer.disconnect();},[]);
 return <button type="button" className="icon-button theme-toggle" aria-label={light?"Switch to dark mode":"Switch to light mode"} title={light?"Dark mode":"Light mode"} onClick={()=>{
 const theme=light?"dark":"light";document.documentElement.dataset.theme=theme;setLight(!light);
 try{const value=JSON.parse(localStorage.getItem("cinevea-display")||"{}");localStorage.setItem("cinevea-display",JSON.stringify({...value,theme}));}catch{/* Storage optional. */}
 window.dispatchEvent(new Event("cinevea-display-change"));
 }}>{light?<Moon size={19} aria-hidden="true"/>:<Sun size={19} aria-hidden="true"/>}</button>;
}
