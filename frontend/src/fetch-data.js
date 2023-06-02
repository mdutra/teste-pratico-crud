const baseUrl = import.meta.env.VITE_API_URL

async function fetchData(endpoint, method, body) {
  const options = {
    headers: {}
  }
  if (method) {
    options.method = method

    if (method === 'PUT' || method === 'POST') {
      options.headers['Content-Type'] = 'application/json'
    }
  }

  const token = localStorage.getItem('token');
  if (token) {
    options.headers.Authorization = `Bearer ${token}`
  }
  if (body) {
    options.body = JSON.stringify(body)
  }

  return fetch(`${baseUrl}/${endpoint}`, options)
}

export async function getData(endpoint) {
  return fetchData(endpoint)
}

export async function postData(endpoint, body) {
  return fetchData(endpoint, 'POST', body)
}

export async function updateData(endpoint, body) {
  return fetchData(endpoint, 'PUT', body)
}

export async function deleteData(endpoint) {
  await fetchData(endpoint, 'DELETE')
}
