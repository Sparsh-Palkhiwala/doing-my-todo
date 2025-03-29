"use client";

import React, { useState } from "react";
import { CheckCircle, Circle, Calendar } from "lucide-react";
import { ProgressBar } from "@/src/ProgressBar";
import { Task } from "@/types";
import { AddTask } from "@/src/AddTask";
import { DeleteTaskButton } from "@/src/DeleteTaskButton";
import { Button } from "@/components/ui/button";

const TasksAILanding = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete quarterly report",
      priority: "high",
      completed: false,
      time: "9:00 AM",
    },
    {
      id: 2,
      title: "Review team presentation slides",
      priority: "medium",
      completed: false,
      time: "11:30 AM",
    },
    {
      id: 3,
      title: "Schedule client meeting",
      priority: "medium",
      completed: true,
      time: "1:00 PM",
    },
    {
      id: 4,
      title: "Update project timeline",
      priority: "high",
      completed: false,
      time: "3:00 PM",
    },
    {
      id: 5,
      title: "Prepare for tomorrow's stand-up",
      priority: "low",
      completed: false,
      time: "4:30 PM",
    },
  ]);

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Get today's date in a nice format
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  // Count completed tasks
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const progress = Math.round((completedCount / totalCount) * 100);
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-400";
      case "medium":
        return "bg-yellow-400";
      case "low":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <header className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-light">TasksAI</h1>
          <div className="flex items-center space-x-2 text-gray-400">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{formattedDate}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        {/* Progress Bar */}
        <ProgressBar
          completedCount={completedCount}
          totalCount={totalCount}
          progress={progress}
        />

        {/* Tasks List */}
        <div className="mb-6">
          <h2 className="text-sm text-gray-400 mb-4">Tasks for Today</h2>

          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center p-2 rounded-lg border border-gray-800 bg-gray-800/30"
              >
                <Button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="mr-3 flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5 text-purple-400" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-600" />
                  )}
                </Button>

                <div className="flex-1">
                  <p
                    className={`${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-200"
                    }`}
                  >
                    {task.title}
                  </p>
                </div>

                <div className="flex items-center">
                  <div
                    className={`h-2 w-2 rounded-full mr-2 ${getPriorityColor(
                      task.priority
                    )}`}
                  ></div>
                  <span className="text-xs text-gray-500">{task.time}</span>
                  <DeleteTaskButton
                    task={task}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add New Task - Minimal */}
        <AddTask tasks={tasks} setTasks={setTasks} />
      </main>
    </div>
  );
};

export default TasksAILanding;
