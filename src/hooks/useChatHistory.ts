
import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface ChatMessage {
  id: string;
  message: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  title: string;
}

export const useChatHistory = () => {
  const { user } = useAuth();
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveChatSession = async (messages: ChatMessage[], title: string) => {
    if (!user || user.uid === 'demo-user-123') return; // Don't save for demo user
    
    try {
      const chatSession = {
        userId: user.uid,
        messages,
        title,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await addDoc(collection(db, 'chat_sessions'), chatSession);
      console.log('Chat session saved successfully');
    } catch (err: any) {
      console.error('Error saving chat session:', err);
      setError(err.message);
    }
  };

  const loadChatHistory = async () => {
    if (!user || user.uid === 'demo-user-123') {
      setChatHistory([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const q = query(
        collection(db, 'chat_sessions'),
        where('userId', '==', user.uid),
        orderBy('updatedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const sessions: ChatSession[] = [];

      querySnapshot.forEach((doc) => {
        sessions.push({
          id: doc.id,
          ...doc.data()
        } as ChatSession);
      });

      setChatHistory(sessions);
    } catch (err: any) {
      console.error('Error loading chat history:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadChatHistory();
    }
  }, [user]);

  return {
    chatHistory,
    loading,
    error,
    saveChatSession,
    loadChatHistory
  };
};
