import React, { createContext, useContext, useState } from 'react';

interface User {
    xp: number;
    level: number;
    correctly_answered_questions: number[];
    incorrectly_answered_questions: number[];
    questions_pased: number[];
    used_combinations: number[];
    task_count: number;
    id: number;
    username: string;
}

interface UserContextValue {
  user: User | null; 
  setUser: React.Dispatch<React.SetStateAction<User | null>>; 
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null); 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
