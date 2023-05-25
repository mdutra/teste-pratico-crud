import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './auth-context'
import { TextField, Button, Grid, Container, Typography } from '@mui/material'

function LoginForm() {
  let navigate = useNavigate();
  let auth = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const senha = formData.get("senha");

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const { token, nome } = await response.json();

        auth.signin({ token, nome });

        navigate("/components", { replace: true });
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  useEffect(() => {
    console.log('useEffect LoginForm')
    if (auth.user) {
      navigate("/components", { replace: true });
    }
  })

  return (
    <Container fixed>
      <form onSubmit={handleLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Login</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" name="email" type="email" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Senha" name="senha" type="password" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">Entrar</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default LoginForm;
