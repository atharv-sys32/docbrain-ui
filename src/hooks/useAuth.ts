import { useAuthContext } from '../context/AuthContext';
import { login as apiLogin, register as apiRegister } from '../api/auth';

export function useAuth() {
  const { user, token, setAuth, logout, loading } = useAuthContext();

  const login = async (email: string, password: string) => {
    const res = await apiLogin(email, password);
    setAuth(res.data.token, { email: res.data.email, fullName: res.data.fullName } as any);
  };

  const register = async (email: string, password: string, fullName: string) => {
    const res = await apiRegister(email, password, fullName);
    setAuth(res.data.token, { email: res.data.email, fullName: res.data.fullName } as any);
  };

  return { user, token, login, register, logout, loading, isAuthenticated: !!token };
}
