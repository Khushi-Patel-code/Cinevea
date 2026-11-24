import { computeTicketPrice, type BookingState } from "@/types";
import { readableDate } from "@/lib/bookingPresentation";
export type DemoPaymentMethod = "venue" | "card_demo";
export function paymentLabel(method?: DemoPaymentMethod | null) {
  return method === "venue"
    ? "Pay at venue"
    : method === "card_demo"
      ? "Card payment"
      : "Not selected";
}
export function parsePaymentChoice(text: string): DemoPaymentMethod | null {
  const t = text.toLowerCase().trim().replace(/[.!?]/g, "");
  if (
    /^(?:why|what|how|do|did|is|are)\b/.test(t) ||
    /\b(?:don't|do not|not|never)\b/.test(t)
  )
    return null;
  if (
    /^(?:(?:i(?:'d| would)? (?:like|want) (?:to )?|please |use |choose |select |pay (?:by |with )?|i(?:'ll| will) pay (?:by |with )?))*?(?:a |the )?(?:card|credit card|debit card|simulated card|card payment|card demo)(?: option)?(?: please)?$/.test(
      t,
    )
  )
    return "card_demo";
  if (
    /^(?:(?:i(?:'ll| will) )?(?:pay )?(?:at (?:the )?)?(?:venue|cinema|theatre|theater)|pay at (?:the )?(?:venue|cinema|theatre|theater)|cash|pay later)(?: option)?(?: please)?$/.test(
      t,
    )
  )
    return "venue";
  return null;
}
export function describeBooking(booking: BookingState): string {
  const tickets = Object.entries(booking.ticketBreakdown)
    .filter(([, n]) => n > 0)
    .map(([name, n]) => `${n} ${name}${n === 1 ? "" : " tickets"}`)
    .join(", ");
  return `${booking.movie?.title || "No movie selected"}, ${readableDate(booking.date)}, ${booking.showtime || "no showtime"}. ${tickets || `${booking.ticketCount} tickets`}. Seats ${booking.seats.map((s) => `${s.row}${s.col}`).join(", ") || "not selected"}. Total $${computeTicketPrice(booking.ticketBreakdown).toFixed(2)}. ${booking.paymentMethod ? `Payment method: ${paymentLabel(booking.paymentMethod)}.` : "Choose a payment method: pay at venue or card payment."}`;
}
