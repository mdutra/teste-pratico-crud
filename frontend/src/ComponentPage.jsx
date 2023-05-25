import { Grid, Container, Divider, Typography } from '@mui/material'

function ComponentPage() {
  return (
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Componentes</Typography>
            <Divider />
          </Grid>
        </Grid>
      </Container>
  );
}

export default ComponentPage;
