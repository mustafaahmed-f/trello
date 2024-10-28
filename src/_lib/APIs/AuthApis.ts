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

  const { data: profile } = await supabase
    .from("users")
    .select("userName")
    .eq("user_id", user?.id)
    .single();

  return {
    email: user?.email,
    userName: profile?.userName || null,
    userId: user?.id,
  };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
}

export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("userName")
    .eq("user_id", id)
    .single();
  if (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
  return data;
}
