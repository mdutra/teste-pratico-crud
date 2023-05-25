import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import AuthContext from './auth-context'

function AuthStatus() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (auth.user) {
    return (
      <>
        <Button
          color="inherit"
          onClick={() => {
            auth.signout();
            navigate("/");
          }}
        >
          Sair da conta {auth.user.nome}
        </Button>
      </>
    );
  }
}

export default AuthStatus
