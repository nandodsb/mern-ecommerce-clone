import axios from 'axios'
import { api } from '../urlConfig'

const Axios = axios.create({
    baseURL: api,
    /*headers: {
        Authorization: '',
    },*/
})

export default Axios
