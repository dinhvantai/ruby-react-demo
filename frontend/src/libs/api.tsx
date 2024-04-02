import Cookies from 'js-cookie'

const baseUrl = 'http://localhost:3000/api'

const api = async (endPoint: string, options = {headers: {}}) => {

  options.headers = {
    ...(options.headers || {}),
    'Authorization': 'Bearer ' + Cookies.get('token'),
  }
  const response = await window.fetch(`${baseUrl}${endPoint}`, options)

  const data = await response.json()

  if (response.ok) {
    return {data, status: response.status}
  }

  return {errors: data, status: response.status}
}

export default api
