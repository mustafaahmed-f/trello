import supabase from "../supabase";

export async function getTasks() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("created_by", user?.id);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch tasks");
  }
  return data;
}

export async function getSingleTask(id: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .eq("created_by", user?.id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch task");
  }

  return data;
}

export async function addTask(task: any) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ ...task, created_by: user?.id }]);

  if (error) {
    console.error(error);
    throw new Error("Failed to add task");
  }

  return data;
}

export async function deleteTask(id: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .eq("created_by", user?.id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete task");
  }

  return data;
}

export async function updateTask(id: number, updatedFields: any) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("tasks")
    .update(updatedFields)
    .eq("id", id)
    .eq("created_by", user?.id);

  if (error) {
    console.error(error);
    throw new Error("Failed to update task");
  }

  return data;
}
