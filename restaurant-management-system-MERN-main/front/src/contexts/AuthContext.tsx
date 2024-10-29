import React, { createContext, useState, useContext } from 'react';

// Define the shape of the user state
interface UserState {
  user: any; // Define the type for user data
  login: (userData: any) => void;
  logout: () => void;
}

// Create the authentication context with a default value
const AuthContext = createContext<UserState>({
  user: null,
  login: () => {},
  logout: () => {}
});

// Custom hook to consume the authentication context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap your application and provide the context
export const AuthProvider= ({ children} :any) => {
  const [user, setUser] = useState<any>(null);

  const login = (userData: any) => setUser(userData);
  const logout = () => setUser(null);

  // Value provided by the context
  const value = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
