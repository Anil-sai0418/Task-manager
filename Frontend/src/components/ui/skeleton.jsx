import React from 'react';

const shimmerStyle = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  .shimmer {
    animation: shimmer 2s infinite;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 1000px 100%;
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = shimmerStyle;
  document.head.appendChild(styleSheet);
}

export function TaskCardSkeleton() {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 shimmer"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full shimmer"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 shimmer"></div>
        </div>
        
        {/* Amount skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4 shimmer"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4 shimmer"></div>
        </div>
        
        {/* Footer skeleton */}
        <div className="flex justify-between items-center pt-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 shimmer"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16 shimmer"></div>
        </div>
      </div>
    </div>
  );
}

export function TaskListSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <TaskCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function TaskDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 shimmer"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 shimmer"></div>
      </div>

      {/* Content sections */}
      <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg space-y-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 shimmer"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded shimmer"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 shimmer"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6 shimmer"></div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 shimmer"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded shimmer"></div>
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg space-y-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4 shimmer"></div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1 shimmer"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 shimmer"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }) {
  return (
    <div className="flex gap-4 py-3 border-b border-gray-200 dark:border-gray-700">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1 shimmer"></div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 6, columns = 4 }) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex gap-4 py-3 bg-gray-100 dark:bg-gray-800 px-4 rounded">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1 shimmer"></div>
        ))}
      </div>
      
      {/* Rows */}
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} columns={columns} />
        ))}
      </div>
    </div>
  );
}
