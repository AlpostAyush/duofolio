import React from 'react';
import ThemeToggle from '../components/UI/ThemeToggle';
import LoginForm from '../components/Auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
           DuoFolio-Nothing undone
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Your cosmic to-do list manager
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
