import type { Movie } from "@/types";

export function isMovieConversation(text:string) {
 return /^(?:(?:hi|hello|hey)[,! ]*)?(?:how are you(?: doing)?|how(?:'s| is) it going|thanks|thank you|good (?:morning|evening|afternoon))?[!.? ]*$/i.test(text.trim()) || /\b(?:recommend|suggest|looking for|in the mood|what (?:movie|film)|which (?:movie|film)|genre|something (?:funny|scary|romantic))\b/i.test(text);
}
export async function movieConversation(text:string, movies:Movie[], ...context: unknown[]) {
 void context;
 const smalltalk = /^(?:(?:hi|hello|hey)[,! ]*)?(?:how are you(?: doing)?|how(?:'s| is) it going|thanks|thank you|good (?:morning|evening|afternoon))?[!.? ]*$/i.test(text.trim());
 let fallback = smalltalk ? "Hi! I’m here to help. What kind of movie are you in the mood for?" : "What kind of film do you feel like: action, comedy, romance, horror or science fiction?";
 if (!smalltalk) {
   const categories:Record<string,RegExp>={Comedy:/funny|comedy|laugh/i,Horror:/scary|horror/i,Romance:/romantic|romance/i,Action:/action/i,"Sci-Fi":/sci.?fi|science fiction|space/i,Animation:/animation|animated|family/i,Adventure:/adventure/i};
   const wanted=Object.entries(categories).filter(([,rx])=>rx.test(text)).map(([g])=>g);
   const matches=movies.filter(m=>wanted.some(g=>m.genre.toLowerCase().includes(g.toLowerCase())));
   if(wanted.length) fallback=matches.length ? `From this location’s listings, you could try ${matches.slice(0,3).map(m=>m.title).join(", ")}. Which would you like?` : `I don’t see ${wanted.join(" or ").toLowerCase()} in this location’s listings. Try another genre or location.`;
   if(!movies.length) fallback="Choose a location first so I can recommend films you can actually book there. What genre do you enjoy?";
 }
 return fallback;
}
