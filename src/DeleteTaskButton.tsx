import { Button } from "@/components/ui/button";
import { Task } from "@/types";
import { Trash } from "lucide-react";

interface DeleteTaskProps {
  task: Task;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export function DeleteTaskButton({ task, tasks, setTasks }: DeleteTaskProps) {
  const handleDelete = () => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleDelete}>
      <Trash className="h-4 w-4" />
    </Button>
  );
}
