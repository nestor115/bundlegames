import useSWR from 'swr'
import axios from '../lib/axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useDatabase = () => { //2 props que se pasan
    const navigate = useNavigate()
    
    const getBoardgamesIds= async() => {
        return axios
        .get('/user/boardgames')
        .then(res => res.data)
        .catch(error => {
            if (error.response.status !== 409) throw error

        })
    }




    
    
    // 
    

  

    return {
       getBoardgamesIds
    }
}