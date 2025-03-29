import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Task } from "@/types";
import { Button } from "@/components/ui/button";

interface AddTaskProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export function AddTask({ tasks, setTasks }: AddTaskProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addNewTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      priority: "medium",
      completed: false,
      time: "12:00 PM",
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  return (
    <div className="border border-gray-800 rounded-lg bg-gray-800/30 p-3">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Add a new task..."
          className="flex-1 p-2 bg-transparent border-b border-gray-700 focus:border-purple-500 outline-none text-gray-200 placeholder-gray-600"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addNewTask()}
        />
        <Button
          onClick={addNewTask}
          className="ml-2 text-purple-400 hover:text-purple-300"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
