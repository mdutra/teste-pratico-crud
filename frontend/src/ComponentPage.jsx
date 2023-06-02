import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button, Box, Toolbar, Divider, Typography, Select, TextField, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import AuthContext from './auth-context'

const Grupos = {
  "1": "Perfil",
  "2": "Modulo",
  "3": "Inversor",
  "4": "Cabos",
  "5": "Conectores",
  "6": "Bateria",
}

const staticColumns = [
  { field: 'nome', headerName: 'Nome', width: 200 },
  { field: 'gtin', headerName: 'GTIN', width: 130 },
  { field: 'segmento', headerName: 'Segmento', width: 80 },
  {
    field: 'grupo',
    headerName: 'Grupo',
    width: 100,
    valueGetter: (params) => Grupos[params.row.id_grupo],
  },
  {
    field: 'altura',
    headerName: 'Altura',
    type: 'number',
    width: 90,
  },
  {
    field: 'largura',
    headerName: 'Largura',
    type: 'number',
    width: 90,
  },
  {
    field: 'profundidade',
    headerName: 'Profundidade',
    type: 'number',
    width: 100,
  },
  {
    field: 'peso_liquido',
    headerName: 'Peso líquido',
    type: 'number',
    width: 90,
  },
  {
    field: 'peso_bruto',
    headerName: 'Peso bruto',
    type: 'number',
    width: 90,
  },
  {
    field: 'usuario_nome',
    headerName: 'Usuário que criou/alterou',
    width: 200,
  },
]

function DataTable() {
  let auth = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [nomeFilter, setNomeFilter] = useState('');
  const [grupoFilter, setGrupoFilter] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const columns = [
    {
      field: 'editar',
      headerName: 'Editar',
      width: 90,
      renderCell: ({ row }) =>
        <Button
          component={Link} to={`/components/update/${row.id}`}
        >
          Editar
        </Button>,
    },
    {
      field: 'remover',
      headerName: 'Remover',
      width: 90,
      renderCell: ({ row }) => (
        <Button
          onClick={async () => {
            await deleteComponent(row.id)
            // force refreshing the table
            setRefreshFlag((prevFlag) => !prevFlag);
          }}
        >
          Remover
        </Button>
      ),
    },
    ...staticColumns,
  ];

  const deleteComponent = async (rowId) => {
    try {
      await fetch(`http://localhost:5000/componentes/${rowId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.user.token}`,
        },
      });
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        include_user: true
      }

      if (nomeFilter) {
        params.nome = nomeFilter;
      }
      if (grupoFilter) {
        params.id_grupo = grupoFilter;
      }

      const queryString = new URLSearchParams(params).toString()

      try {
        const data = await fetch('http://localhost:5000/componentes?' + queryString, {
          headers: {
            'Authorization': `Bearer ${auth.user.token}`
          }
        })
        if (!data.ok && data.status === 403) {
          auth.signout()
        }
        const json = await data.json()
        setData(json.map(d => ({
          id: d.id_comp_fotovoltaico,
          usuario_nome: d.usuario.nome,
          ...d,
        })))
      } catch (e) {
        console.error(e)
      }
    }

    fetchData()
  }, [auth, refreshFlag, nomeFilter, grupoFilter])

  return (
    <>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <TextField label="Filtrar por nome" name="filter" type="text"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setNomeFilter(event.target.value);
              }
            }}
          />
          <Select
            labelId="select-group"
            id="select-group-1"
            value={grupoFilter}
            label="Grupo"
            onChange={e => setGrupoFilter(e.target.value)}
          >
            <MenuItem value={0}>Todos os Grupos</MenuItem>
            <MenuItem value={1}>Perfil</MenuItem>
            <MenuItem value={2}>Modulo</MenuItem>
            <MenuItem value={3}>Inversor</MenuItem>
            <MenuItem value={4}>Cabos</MenuItem>
            <MenuItem value={5}>Conectores</MenuItem>
            <MenuItem value={6}>Bateria</MenuItem>
          </Select>
        </Box>
        <Button
          disabled={!selectedIds.length}
          component={Link}
          to={`/projeto/cubagem/${selectedIds.join(',')}`}
          variant="contained"
        >
          Calcular cubagem
        </Button>
        <Button component={Link} to="/components/create" variant="contained">Cadastrar Novo Componente</Button>
      </Toolbar>
      <div style={{ minHeight: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={setSelectedIds}
          disableRowSelectionOnClick
          hideFooter
        />
      </div>
    </>
  );
}

function ComponentPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Componentes</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <DataTable />
      </Grid>
    </Grid>
  );
}

export default ComponentPage;
