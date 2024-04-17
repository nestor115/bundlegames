import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import 'bootstrap/dist/css/bootstrap.min.css'; 
const Prueba = ({ texto }) => {
  const [textoValue, setTextoValue] = useState('');
  const [inputValue,setInputValue]= useState('');


  const handleInput = (e) =>{ 
    setInputValue(e.target.value);
  }
  const handleText= ()=>{
    setTextoValue(inputValue);
  }
return(
    <div>
    <input type="text" name="inputTexto" id="inputTexto"  placeholder='Escribre'/>
    <button onClick={handleText}>Enviar</button>
    <h1>{textoValue}</h1>
    <p>{Math.random()}</p>
</div>
)

}
export default Prueba;