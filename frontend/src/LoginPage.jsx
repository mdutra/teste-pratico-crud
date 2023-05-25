import { Grid, Container, Divider, Typography } from '@mui/material'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

function LoginPage() {
  return (
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Autenticação</Typography>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <LoginForm />
          </Grid>
          <Grid item xs={6}>
            <SignupForm />
          </Grid>
        </Grid>
      </Container>
  );
}

export default LoginPage;
