import React from 'react';
import ButtonComponent from '../components/ButtonComponent';
import Layout from '../components/Layout';

const DashboardPage = () => {
  

  return (
    <Layout showButtons={false}>
    <div className='mt-10 mb-10 text-center'>
      <ButtonComponent route={'/register'} buttonText={'Register'}/>
      <ButtonComponent route={'/login'} buttonText={'Login'}/>

      
    </div>
    </Layout>
  );
};

export default DashboardPage;
