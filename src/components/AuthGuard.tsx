
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#171212]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#171212]">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-6">Welcome to Movie Chatbot</h1>
          <p className="text-gray-400 mb-8">Sign in to start chatting about movies</p>
          <Button onClick={signInWithGoogle} className="bg-blue-600 hover:bg-blue-700">
            Sign in with Google
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
