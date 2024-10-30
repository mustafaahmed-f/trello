import { updateTask } from "./APIs/TaskAPIs";
import {
  updateAssignedTasksSlice,
  updateCreatedTasksSlice,
} from "./Store/Slices/TasksSlice";
import { taskType } from "./taskType";

export async function handleDragEnd(
  event: any,
  dispatch: any,
  createdTasks: taskType[],
  assignedTasks: taskType[]
) {
  const { active, over } = event;
  if (!over) return;
  const fromState = active.id.split("-")[3];
  const toState = over.id.split("-")[1];
  if (fromState === toState) {
    return;
  }
  const isCreated = active.id.split("-")[2] === "true";
  const targetTasks = isCreated ? createdTasks : assignedTasks;
  const taskId = active.id.split("-")[1];

  const activeTask: taskType = targetTasks.find(
    (task) => task.id === Number(taskId)
  )!;
  console.log(activeTask);
  let editedTask = { ...activeTask, state: toState };
  await updateTask(Number(taskId), editedTask);
  if (isCreated) {
    dispatch(updateCreatedTasksSlice(editedTask));
  } else {
    dispatch(updateAssignedTasksSlice(editedTask));
  }
}
