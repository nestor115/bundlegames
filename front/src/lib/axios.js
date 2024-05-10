import Axios from 'axios'

const axios = Axios.create({
    baseURL: "http://79.143.93.91/back",
    // baseURL: "http://localhost:8000",//local
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios