import { paymentLabel } from "@/lib/payment";
import { QRCodeSVG } from "qrcode.react";
import { Film } from "lucide-react";
import { readableDate } from "@/lib/bookingPresentation";
import { TICKET_TYPES, type BookingState } from "@/types";
export function MovieTicket({booking,reference,location}:{booking:BookingState;reference:string;location:string}) {
  const types = TICKET_TYPES.flatMap(t => Array.from({length:booking.ticketBreakdown[t.code] || 0},()=>t));
  return <div className="ticket-collection print-separate">
    {booking.seats.map((seat,i)=> <article key={`${seat.row}${seat.col}`} className="admission-ticket individual-ticket" aria-label={`Movie ticket ${i+1}, seat ${seat.row}${seat.col}`}>
      <div className="ticket-main">
        <header className="ticket-brand"><span><Film size={21} aria-hidden="true"/> CINEVEA</span><span className="ticket-admit">ADMIT 1</span></header>
        <div className="ticket-title-row">{booking.movie?.poster && <img className="ticket-poster" src={booking.movie.poster} alt="" onError={e=>{e.currentTarget.style.display="none";}}/>}<div><h2 className="ticket-film">{booking.movie?.title}</h2><p className="ticket-meta">{booking.movie?.rating} · {booking.movie?.duration} min · {booking.movie?.genre}</p></div></div>
        <dl className="ticket-data"><div><dt>Date</dt><dd>{readableDate(booking.date)}</dd></div><div><dt>Showtime</dt><dd>{booking.showtime}</dd></div><div><dt>Location</dt><dd>{location}</dd></div><div className="ticket-seat-block"><dt>Seat</dt><dd>{seat.row}{seat.col}</dd></div></dl>
        <div className="ticket-bottom"><p>{types[i]?.label || "Admission"} · {paymentLabel(booking.paymentMethod)}</p><strong>${(types[i]?.price || 0).toFixed(2)}</strong></div>
      </div>
      <div className="ticket-stub"><p className="ticket-stub-label">TICKET {i+1} OF {booking.seats.length}</p><QRCodeSVG value={JSON.stringify({format:"cinevea.prototype-ticket.v2",reference,seat:`${seat.row}${seat.col}`,ticket:i+1,prototype:true})} size={140} marginSize={4} level="M" bgColor="#fff" fgColor="#101b2e" role="img" title={`QR code for ${reference}, seat ${seat.row}${seat.col}`} aria-label={`QR code for ${reference}, seat ${seat.row}${seat.col}`}/><p className="ticket-ref-label">BOOKING REFERENCE</p><p className="ticket-reference">{reference}</p></div>
    </article>)}
  </div>;
}
