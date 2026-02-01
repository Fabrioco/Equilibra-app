import React, { createContext } from "react";
import { API_URL } from "../config/api";
import { translateError } from "../config/error-translate";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  register: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
};

type User = {
  id: number;
  name: string;
  email: string;
  plan: string;
  privacyMode: boolean;
  enableNotifications: boolean;
  createdAt: string;
  updatedAt: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  type RegisterData = {
    name: string;
    email: string;
    password: string;
  };

  const register = async ({ name, email, password }: RegisterData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      // 1. Verificar se a resposta foi bem-sucedida, mas está vazia
      const contentType = res.headers.get("content-type");
      let data = {};

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        // Pega a mensagem do JSON ou usa o status do HTTP como backup
        console.log(res);
        let msg = (data as any).message || `Erro do servidor (${res.status})`;

        if ((data as any).errors) {
          const firstField = Object.keys((data as any).errors)[0];
          msg = (data as any).errors[firstField][0];
        }
        throw new Error(translateError(msg));
      }

      setUser((data as any).user);
    } catch (error: any) {
      // Se o erro for do JSON parse, ele cai aqui
      if (error.message.includes("JSON Parse error")) {
        throw new Error("O servidor respondeu de forma inválida.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
