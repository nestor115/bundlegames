import React from "react";
import Login from "../components/Login";
import Layout from "../components/Layout";
const LoginPage = () => {
  return (
    <Layout showButtons={false}>
      <div>
        <Login />
      </div>
    </Layout>
  );
};

export default LoginPage;
