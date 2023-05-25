import { Outlet } from 'react-router-dom'
import { Toolbar, Container, Grid, Paper, AppBar, Typography } from '@mui/material';
import AuthStatus from './AuthStatus';

function Layout() {
  return (
    <>
      <AppBar position="static" style={{ margin: 0}}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Teste Prático
          </Typography>
          <AuthStatus />
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ margin: '20px', padding: '10px' }}>
              <Outlet />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Layout
