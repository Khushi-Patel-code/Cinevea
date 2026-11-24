-- Apply once using the Supabase SQL editor or CLI migrations.
-- Only the owner can release a hold. A confirmed booking cannot be released here.
CREATE OR REPLACE FUNCTION public.release_my_seat_hold(p_hold_token uuid)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE owned seat_holds;
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
 SELECT * INTO owned FROM seat_holds WHERE hold_token=p_hold_token AND user_id=auth.uid() FOR UPDATE;
 IF NOT FOUND THEN RETURN false; END IF;
 UPDATE showtime_seats SET status='available',hold_token=NULL,hold_expires_at=NULL,updated_at=now()
 WHERE hold_token=p_hold_token AND showtime_id=owned.showtime_id AND status='held';
 DELETE FROM seat_holds WHERE hold_token=p_hold_token AND user_id=auth.uid();
 RETURN true;
END; $$;
REVOKE ALL ON FUNCTION public.release_my_seat_hold(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.release_my_seat_hold(uuid) TO authenticated;
