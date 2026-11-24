import { LayoutGrid, List, GalleryHorizontal } from "lucide-react";
export function ViewSwitch({view,onChange,label}:{view:string;onChange:(s:string)=>void;label:string}){
 const views=[{value:"grid",name:"Grid",Icon:LayoutGrid},{value:"list",name:"List",Icon:List},{value:"carousel",name:"Carousel",Icon:GalleryHorizontal}];
 return <div className="view-switch" role="group" aria-label={`${label} view`}>{views.map(({value,name,Icon})=><button key={value} type="button" aria-label={`${name} view`} title={`${name} view`} aria-pressed={view===value} onClick={()=>onChange(value)}><Icon size={18} aria-hidden="true"/></button>)}</div>;
}
