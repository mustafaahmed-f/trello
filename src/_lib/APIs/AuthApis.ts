import supabase from "../supabase";

export async function signUp(formdata: any) {
  const { email, password, userName } = formdata;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data?.user) {
    await supabase.from("users").insert({
      id: data.user.id, // links profile to auth user ID
      userName,
    });
  }
}

export async function logIn({ email, password }: any) {
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("userName")
      .eq("id", user.id)
      .single();

    return {
      email: user.email,
      userName: profile?.userName || null,
    };
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
}
