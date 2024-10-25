import { taskType } from "../../taskType";
import { Trie } from "../../Trie";

export interface tasksStateType {
  tasks: taskType[];
  trie: Trie;
}
