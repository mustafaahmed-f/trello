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
    const { user } = data;
    const { error: insertError } = await supabase.from("users").insert({
      user_id: user.id, // links profile to auth user ID
      userName,
    });

    if (insertError) {
      console.error("Error inserting user into 'users' table:", insertError);
      throw new Error("Failed to add user to profile");
    }
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
      .eq("user_id", user.id)
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
