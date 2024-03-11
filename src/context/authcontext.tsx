import { createContext, useContext, useReducer } from "react";

interface AuthState {
  isAuthenticated: boolean;
}



type Action = { type: "LOGIN" } | { type: "LOGOUT" };
type Dispatch = (action: Action) => void;

const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<Dispatch | undefined>(undefined);

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem('isAuthenticated:','true')
      return { isAuthenticated: true };
    case "LOGOUT":
      localStorage.setItem('isAuthenticated:','false')
      return { isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const value:boolean = JSON.parse( localStorage.getItem('isAuthenticated:')) | false
  const [state, dispatch] = useReducer(authReducer, { isAuthenticated: value });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
};
