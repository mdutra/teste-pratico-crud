import { getData, postData, updateData, deleteData } from '../fetch-data'

async function findComponentById(id_comp_fotovoltaico) {
  return getData(`componentes/${id_comp_fotovoltaico}`)
}

async function findAllComponents({ include_user, nome, id_grupo, ids_comp_fotovoltaico }) {
  const params = {}

  if (include_user) {
    params.include_user = include_user;
  }
  if (nome) {
    params.nome = nome;
  }
  if (id_grupo) {
    params.id_grupo = id_grupo;
  }
  if (ids_comp_fotovoltaico) {
    params.ids_comp_fotovoltaico = ids_comp_fotovoltaico;
  }

  const queryString = new URLSearchParams(params).toString()

  return getData('componentes?' + queryString)
}

async function createComponent({ nome, gtin, segmento, id_grupo, altura, largura, profundidade, peso_bruto, peso_liquido }) {
      return postData('componentes', { nome, gtin, segmento, id_grupo, altura, largura, profundidade, peso_bruto, peso_liquido });
}

async function updateComponentById(id_comp_fotovoltaico, fieldsToUpdate) {
  return updateData(`componentes/${id_comp_fotovoltaico}`, fieldsToUpdate);
}

async function deleteComponentById(id_comp_fotovoltaico) {
  await deleteData(`componentes/${id_comp_fotovoltaico}`);
}

async function getCubagem(input) {
  const body = input.map(({ id, quantity }) => ({
    id,
    quantidade: quantity || 1,
  }))

  return postData('projetos/cubagem?', body)
}

export default {
  findComponentById,
  findAllComponents,
  createComponent,
  updateComponentById,
  deleteComponentById,
  getCubagem,
}
