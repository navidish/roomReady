import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case 'logout':
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error('Unknown action!');
  }
}

const ADMIN_USER = {
  name: 'Shayesteh',
  email: 'Shayesteh@gmail.com',
  password: '123456',
};

export default function AuthProvier({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email, password) {
    if (email === ADMIN_USER.email && password === ADMIN_USER.password)
      dispatch({ type: 'login', payload: ADMIN_USER });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
