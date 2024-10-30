import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TaskList from "./TaskList";
import { taskType } from "../../../_lib/taskType";
import { DndContext } from "@dnd-kit/core";
import { handleDragEnd } from "../../../_lib/handleDragEnd";
import { useAppDispatch } from "../../../_lib/Store/Store";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TasksTabs({
  createdTasks,
  assignedTasks,
}: {
  createdTasks: taskType[];
  assignedTasks: taskType[];
}) {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event.target);
    setValue(newValue);
  };

  return (
    <DndContext
      onDragEnd={(e) => handleDragEnd(e, dispatch, createdTasks, assignedTasks)}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="Tasks">
            <Tab label="Created Tasks" {...a11yProps(0)} />
            <Tab label="Assigned Tasks" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="max-sm:flex max-sm:flex-col items-center justify-between w-full gap-3 sm:grid sm:grid-cols-[1fr_1fr_1fr]">
            <TaskList
              tasks={createdTasks.filter((task) => task.state === "todo")}
              state="To Do"
            />
            <TaskList
              tasks={createdTasks.filter((task) => task.state === "doing")}
              state="On Progress"
            />
            <TaskList
              tasks={createdTasks.filter((task) => task.state === "done")}
              state="Done"
            />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="max-sm:flex max-sm:flex-col items-center justify-between w-full gap-3 sm:grid sm:grid-cols-[1fr_1fr_1fr]">
            <TaskList
              tasks={assignedTasks.filter((task) => task.state === "todo")}
              state="To Do"
            />
            <TaskList
              tasks={assignedTasks.filter((task) => task.state === "doing")}
              state="On Progress"
            />
            <TaskList
              tasks={assignedTasks.filter((task) => task.state === "done")}
              state="Done"
            />
          </div>
        </CustomTabPanel>
      </Box>
    </DndContext>
  );
}
