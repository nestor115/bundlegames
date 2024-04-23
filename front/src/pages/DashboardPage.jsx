import React from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from '../components/ButtonComponent';

const DashboardPage = () => {
  

  return (
    <div>
      <h1>Bundlegames</h1>
      <ButtonComponent route={'/register'} buttonText={'Register'}/>
      <ButtonComponent route={'/login'} buttonText={'Login'}/>

      
    </div>
  );
};

export default DashboardPage;
