import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Grid, Container, Typography } from '@mui/material'
import AuthContext from './auth-context'

function SignupForm() {
  let navigate = useNavigate();
  let auth = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nome = formData.get("nome");
    const email = formData.get("email");
    const senha = formData.get("senha");

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
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

  return (
    <Container fixed>
      <form onSubmit={handleSignup}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Cadastro</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nome" name="nome" type="text" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" name="email" type="email" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Senha" name="senha" type="password" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">Cadastrar</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignupForm;
