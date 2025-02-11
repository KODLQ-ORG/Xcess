// src/components/FullScreenLoading.tsx
"use client";

const FullScreenLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
    </div>
  );
};

export default FullScreenLoading;
