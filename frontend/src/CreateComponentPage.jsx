import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { TextField, Select, MenuItem, Button, Grid, Container, Typography } from '@mui/material'
import AuthContext from './auth-context'

function posify(value) {
  return value < 1 ? 1 : value
}

function CreateComponentPage() {
  let auth = useContext(AuthContext);
  let navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [gtin, setGtin] = useState('');
  const [segmento, setSegmento] = useState('Ongrid');
  const [id_grupo, setGrupo] = useState(1);
  const [altura, setAltura] = useState(1);
  const [largura, setLargura] = useState(1);
  const [profundidade, setProfundidade] = useState(1);
  const [peso_bruto, setPesoBruto] = useState(1);
  const [peso_liquido, setPesoLiquido] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/componentes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, gtin, segmento, id_grupo, altura, largura, profundidade, peso_bruto, peso_liquido }),
      });

      if (response.ok) {
        navigate("/components");
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  const hasMissingFields = () => {
    return !nome || !gtin || !segmento || !id_grupo
        || !altura || !largura || !profundidade
        || !peso_bruto || !peso_liquido
  }

  return (
    <Container fixed>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Cadastrar Componente Fotovoltaico</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nome" name="nome" type="text" onChange={e => setNome(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="GTIN" name="gtin" type="text" onChange={e => setGtin(e.target.value)}/>
          </Grid>
          <Grid item xs={2}>
            <Select
                labelId="select-segmento"
                id="select-segmento-1"
                value={"Ongrid"}
                label="Segmento"
                onChange={e => setSegmento(e.target.value)}
              >
              <MenuItem value={"Ongrid"}>Ongrid</MenuItem>
              <MenuItem value={"Offgrid"}>Offgrid</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={10}>
            <Select
                labelId="select-group"
                id="select-group-1"
                value={1}
                label="Grupo"
                onChange={e => setGrupo(e.target.value)}
              >
              <MenuItem value={1}>Perfil</MenuItem>
              <MenuItem value={2}>Modulo</MenuItem>
              <MenuItem value={3}>Inversor</MenuItem>
              <MenuItem value={4}>Cabos</MenuItem>
              <MenuItem value={5}>Conectores</MenuItem>
              <MenuItem value={6}>Bateria</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <TextField label="Altura" name="altura" type="number" value={altura} onChange={e => setAltura(posify(e.target.value))}/>
          </Grid>
          <Grid item xs={2}>
            <TextField label="Largura" name="largura" type="number" value={largura} onChange={e => setLargura(posify(e.target.value))}/>
          </Grid>
          <Grid item xs={8}>
            <TextField label="Profundidade" name="profundidade" type="number" value={profundidade} onChange={e => setProfundidade(posify(e.target.value))}/>
          </Grid>
          <Grid item xs={2}>
            <TextField label="Peso líquido" name="peso_bruto" type="number" value={peso_bruto} onChange={e => setPesoBruto(posify(e.target.value))}/>
          </Grid>
          <Grid item xs={10}>
            <TextField label="Peso bruto" name="peso_liquido" type="number" value={peso_liquido} onChange={e => setPesoLiquido(posify(e.target.value))}/>
          </Grid>
          <Grid item xs={2}>
            <Button disabled={hasMissingFields()} variant="contained" type="submit">Cadastrar</Button>
          </Grid>
          <Grid item xs={10}>
            <Button component={Link} to="/components" variant="contained" color="secondary">Cancelar</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default CreateComponentPage;
