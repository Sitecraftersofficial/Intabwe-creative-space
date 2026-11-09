import { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "intambwe_auth_users";
const SESSION_KEY = "intambwe_auth_session";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (session) setUser(session);
    } catch {
      /* no session */
    }
    setReady(true);
  }, []);

  const api = useMemo(() => {
    const persist = (users) =>
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

    return {
      signup(email, password, name) {
        const users = loadUsers();
        if (users.find((u) => u.email === email)) {
          throw new Error("An account with this email already exists.");
        }
        const newUser = { email, name, createdAt: Date.now() };
        users.push({ ...newUser, password });
        persist(users);
        localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
        setUser(newUser);
        return newUser;
      },
      login(email, password) {
        const found = loadUsers().find(
          (u) => u.email === email && u.password === password,
        );
        if (!found) throw new Error("Wrong email or password.");
        const session = { email: found.email, name: found.name };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setUser(session);
        return session;
      },
      continueAsGuest() {
        const session = {
          name: "Guest",
          email: "",
          isGuest: true,
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setUser(session);
        return session;
      },
      logout() {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      },
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, ready, ...api }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
