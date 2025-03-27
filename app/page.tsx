"use client";

import React, { useState } from "react";
import { PlusCircle, CheckCircle, Circle, Calendar, Clock } from "lucide-react";

const TasksAILanding = () => {
  const [tasks, setTasks] = useState([
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

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

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
      {/* Minimal Header */}
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
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <h2 className="text-gray-400">Today's Progress</h2>
            <span className="text-gray-400">
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full">
            <div
              className="h-1 bg-purple-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="mb-6">
          <h2 className="text-sm text-gray-400 mb-4">Today's Tasks</h2>

          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center p-2 rounded-lg border border-gray-800 bg-gray-800/30"
              >
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="mr-3 flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5 text-purple-400" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-600" />
                  )}
                </button>

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
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add New Task - Minimal */}
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
            <button
              onClick={addNewTask}
              className="ml-2 text-purple-400 hover:text-purple-300"
            >
              <PlusCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TasksAILanding;
