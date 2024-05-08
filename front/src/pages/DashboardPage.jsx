import React from 'react';
import ButtonComponent from '../components/ButtonComponent';
import Layout from '../components/Layout';

const DashboardPage = () => {
  

  return (
    <Layout showButtons={false}>
    <div>
      <h1>Bundlegames</h1>
      <ButtonComponent route={'/register'} buttonText={'Register'}/>
      <ButtonComponent route={'/login'} buttonText={'Login'}/>

      
    </div>
    </Layout>
  );
};

export default DashboardPage;
