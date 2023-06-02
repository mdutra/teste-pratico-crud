import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { TextField, Button, Toolbar, Grid, Typography, Divider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import AuthContext from './auth-context'

function posify(n) {
  return n < 1 ? 1 : n;
}

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
]

const quantities = {}

function QuantityInput({ row }) {
  const [value, setValue] = useState(1)

  return (
    <TextField
      type="number"
      value={value}
      onChange={e => {
        const value = posify(parseInt(e.target.value))
        quantities[row.id] = value
        setValue(posify(value))
      }}
    />
  )
}

function DataTable() {
  const { ids } = useParams();
  let auth = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);

  const columns = [
    ...staticColumns,
    {
      field: 'quantity',
      headerName: 'Quantidade',
      width: 130,
      renderCell: QuantityInput,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        ids_comp_fotovoltaico: ids
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
          ...d,
        })))
      } catch (e) {
        console.error(e)
      }
    }

    fetchData()
  }, [auth, ids])

  async function handleCubagemClick() {
    const body = data.map(({ id }) => ({
      id,
      quantidade: quantities[id] || 1.
    }))

    try {
      const data = await fetch('http://localhost:5000/projetos/cubagem?', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user.token}`
        },
        body: JSON.stringify(body),
      })
      if (!data.ok && data.status === 403) {
        auth.signout()
      }
      const json = await data.json()
      setResult(json)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Toolbar>
        <Button
          variant="contained"
          onClick={async () => {
            await handleCubagemClick()
          }}
        >
          Calcular cubagem
        </Button>
        <Button color="secondary" component={Link} to="/components" variant="contained">Voltar</Button>
        {result ?
          <Typography variant="h6" style={{ margin: '10px' }}>
            Cubagem total: {result.cubagem},
            peso líquido total: {result.pesoLiquido},
            peso bruto total: {result.pesoBruto}
          </Typography>
          : null
        }
      </Toolbar>
      <div style={{ minHeight: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick
          onRowEditCommit={(row) => console.log(row)}
          hideFooter
        />
      </div>
    </>
  );
}

function CubagemPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Cubagem</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <DataTable />
      </Grid>
    </Grid>
  );
}

export default CubagemPage;
