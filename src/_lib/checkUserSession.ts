import { setUser } from "./Store/Slices/UserSlice";
import { store } from "./Store/Store";
import supabase from "./supabase";

export async function checkUserSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    const user = data.session.user;
    const email = user.email || ""; // Default to an empty string if undefined
    const userName = user.user_metadata?.userName || ""; // Default to an empty string if undefined

    store.dispatch(setUser({ email, userName }));
  }
}
