
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading, signInWithGoogle } = useAuth();

  const handleDemoLogin = () => {
    // Create a mock user object for demo purposes
    const mockUser = {
      uid: 'demo-user-123',
      email: 'demo@example.com',
      displayName: 'Demo User',
      photoURL: 'https://via.placeholder.com/150',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'demo-token',
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
    };

    // Manually set the user in localStorage for demo
    localStorage.setItem('demo-user', JSON.stringify(mockUser));
    window.location.reload();
  };

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
          <div className="space-y-4">
            <Button onClick={signInWithGoogle} className="bg-blue-600 hover:bg-blue-700 w-full">
              Sign in with Google
            </Button>
            <Button 
              onClick={handleDemoLogin} 
              className="bg-green-600 hover:bg-green-700 w-full"
            >
              🎬 Demo Login (No Setup Required)
            </Button>
          </div>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg text-left">
            <p className="text-gray-300 text-sm font-medium mb-2">Demo Login Details:</p>
            <p className="text-gray-400 text-xs">Email: demo@example.com</p>
            <p className="text-gray-400 text-xs">Name: Demo User</p>
            <p className="text-yellow-400 text-xs mt-2">⚠️ This is for testing only - no real authentication</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
