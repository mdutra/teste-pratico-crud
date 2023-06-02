import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { TextField, Select, MenuItem, Button, Grid, Container, Typography } from '@mui/material'
import AuthContext from './auth-context'
import ComponentRepository from './repository/component-repository'

function posify(value) {
  return value < 1 ? 1 : value
}

function CreateComponentPage() {
  const { id_comp_fotovoltaico } = useParams();

  let auth = useContext(AuthContext);
  let navigate = useNavigate();

  const [data, setData] = useState({
    nome: '',
    gtin: '',
    segmento: 'Ongrid',
    id_grupo: 1,
    altura: 1,
    largura: 1,
    profundidade: 1,
    peso_liquido: 1,
    peso_bruto: 1,
  });
  const {nome, gtin, segmento, id_grupo, altura, largura, profundidade, peso_bruto, peso_liquido} = data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ComponentRepository.findComponentById(id_comp_fotovoltaico)
        const {nome, gtin, segmento, id_grupo, altura, largura, profundidade, peso_bruto, peso_liquido} = await data.json()
        setData({nome, gtin, segmento, id_grupo, altura, largura, profundidade, peso_bruto, peso_liquido})
      } catch(e) {
        console.error(e)
      }
    }

    fetchData()
  }, [auth.user, id_comp_fotovoltaico])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ComponentRepository.updateComponentById(id_comp_fotovoltaico, {
        nome,
        gtin,
        segmento,
        id_grupo,
        altura,
        largura,
        profundidade,
        peso_bruto,
        peso_liquido,
      });

      if (response.ok) {
        navigate("/components");
      }
    } catch (error) {
      console.error('Error occurred:', error);
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
            <Typography variant="h5">Atualizar Componente Fotovoltaico</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nome" name="nome" type="text"
              value={nome}
              onChange={e => setData({ ...data, nome: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="GTIN" name="gtin" type="text"
              value={gtin}
              onChange={e => setData({ ...data, gtin: e.target.value })}
            />
          </Grid>
          <Grid item xs={2}>
            <Select
                labelId="select-segmento"
                id="select-segmento-1"
                value={segmento}
                label="Segmento"
                onChange={e => setData({ ...data, segmento: e.target.value })}
              >
              <MenuItem value={"Ongrid"}>Ongrid</MenuItem>
              <MenuItem value={"Offgrid"}>Offgrid</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={10}>
            <Select
                labelId="select-group"
                id="select-group-1"
                value={id_grupo}
                label="Grupo"
                onChange={e => setData({ ...data, id_grupo: e.target.value })}
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
            <TextField label="Altura" name="altura" type="number" value={altura}
              onChange={e => setData({ ...data, altura: posify(e.target.value) })}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField label="Largura" name="largura" type="number" value={largura}
              onChange={e => setData({ ...data, largura: posify(e.target.value) })}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField label="Profundidade" name="profundidade" type="number" value={profundidade}
              onChange={e => setData({ ...data, profundidade: posify(e.target.value) })}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField label="Peso líquido" name="peso_liquido" type="number" value={peso_liquido}
              onChange={e => setData({ ...data, peso_liquido: posify(e.target.value) })}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Peso bruto" name="peso_bruto" type="number" value={peso_bruto}
              onChange={e => setData({ ...data, peso_bruto: posify(e.target.value) })}
            />
          </Grid>
          <Grid item xs={2}>
            <Button disabled={hasMissingFields()} variant="contained" type="submit">Atualizar</Button>
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
