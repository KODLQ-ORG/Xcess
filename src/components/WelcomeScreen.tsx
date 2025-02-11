// src/components/WelcomeScreen.tsx
"use client";

const WelcomeScreen = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-[5rem]">
          Welcome to
          <span className="text-indigo-600"> Xcess</span>
        </h1>
      </div>
    </main>
  );
};

export default WelcomeScreen;
