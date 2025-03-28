export interface ProgressBarProps {
  completedCount: number;
  totalCount: number;
  progress: number;
}

export function ProgressBar({
  completedCount,
  totalCount,
  progress,
}: ProgressBarProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2 text-sm">
        <h2 className="text-gray-400">Progress</h2>
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
  );
}
