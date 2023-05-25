import { useState, useEffect } from 'react'
import AuthContext from './auth-context'

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const nome = localStorage.getItem('nome');
    if (token) {
      setUser({ token, nome });
    }
  }, []);

  const signin = ({ token, nome }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('nome', nome);
    setUser({ token, nome });
  };

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    setUser(null);
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
