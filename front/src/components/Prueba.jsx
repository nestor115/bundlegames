import xml2js from 'xml2js';
import 'bootstrap/dist/css/bootstrap.min.css'; 

  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  
  const Prueba = () => {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const url = 'https://www.boardgamegeek.com/xmlapi2/thing?id=402206';
  
        try {
          const response = await axios.get(url, {
            headers: {
              'Origin': 'https://www.boardgamegeek.com/'
            }
          });
  
          setData(response.data);
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    );
  }
  export default Prueba;

  















  
//   const [textoValue, setTextoValue] = useState('');
//   const [inputValue,setInputValue]= useState('');







  

//   const handleInput = (e) =>{ 
//     setInputValue(e.target.value);
//   }
//   const handleText= ()=>{
//     setTextoValue(inputValue);
//   }
// return(
//     <div>
//     <input type="text" name="inputTexto" id="inputTexto"  placeholder='Escribre'/>
//     <button onClick={handleText}>Enviar</button>
//     <h1>{textoValue}</h1>
//     <p>{Math.random()}</p>
// </div>
// )

// }
