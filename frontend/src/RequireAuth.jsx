import { useContext } from 'react'
import AuthContext from './auth-context'
import { Navigate } from 'react-router-dom'

function RequireAuth({ children }) {
  let auth = useContext(AuthContext);

  if (!auth.user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAuth;
