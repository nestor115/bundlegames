import React from "react";
import ButtonComponent from "../components/ButtonComponent";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
const DashboardPage = () => {
  return (
    <Layout showButtons={false}>
      <div className="mt-10 mb-10 text-center">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        {/* <ButtonComponent route={'/register'} buttonText={'Register'}/> */}
        {/* <ButtonComponent route={'/login'} buttonText={'Login'}/> */}
      </div>
    </Layout>
  );
};

export default DashboardPage;
