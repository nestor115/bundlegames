import useSWR from 'swr'
import axios from '../lib/axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useApiBoardgames = () => { //2 props que se pasan
    const navigate = useNavigate()
    

    const getBoardGameInfo = async ({setErrors ,id}) => {
        //    const response = await axios.get('/api/boardgameinfo',{
        //         params: {
        //             id:id
        //         }
        //     });
        //     return response.data;

            return axios
            .get('/api/boardgameinfo/'+id)
            .then(res =>res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
                setErrors(error);
            })
    }
    
    // 
    

  

    return {
       getBoardGameInfo
    }
}