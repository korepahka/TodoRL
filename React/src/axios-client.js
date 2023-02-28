import axios from "axios";
import {useStateContext} from "./context/ContextProvider.jsx";



// TODO импотртировать ссылку
const axiosClient = axios.create({
    baseURL: `http://127.0.0.1:8000/`
})


//interceptors - перехватываем запросы до обработки
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')

    console.log(token);

    config.headers.Authorization = `Bearer ${token}`
    return config;
    console.log({token});

})

axiosClient.interceptors.response.use((response) => {
    return response
  }, (error) => {
    const {response} = error;
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN')
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }
  
    throw error;
  })

export default axiosClient