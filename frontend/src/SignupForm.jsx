import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Grid, Container, Typography } from '@mui/material'
import AuthContext from './auth-context'
import UserRepository from './repository/user-repository'

function SignupForm() {
  let navigate = useNavigate();
  let auth = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await UserRepository.createUser('signup', {
         nome, email, senha
      });

      if (response.ok) {
        const { token, nome } = await response.json();

        auth.signin({ token, nome });

        navigate("/components", { replace: true });
      }
    } catch (error) {
      console.error('Error occurred:', error);
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
            <TextField label="Nome" name="nome" type="text" value={nome} onChange={e => setNome(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Senha" name="senha" type="password" value={senha} onChange={e => setSenha(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <Button disabled={!nome || !email || !senha} variant="contained" type="submit">Cadastrar</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignupForm;
