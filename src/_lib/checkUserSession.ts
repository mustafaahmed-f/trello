import { setUser } from "./Store/Slices/UserSlice";
import { store } from "./Store/Store";
import supabase from "./supabase";

export async function checkUserSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    const user = data.session.user;
    const email = user.email || ""; // Default to an empty string if undefined
    const { data: userData } = await supabase
      .from("users")
      .select("userName")
      .eq("user_id", user.id)
      .single();
    const userName = userData?.userName || ""; // Default to an empty string if undefined

    store.dispatch(setUser({ email, userName, userId: user.id }));
  }
}
