import React from "react";
import Register from "../components/Register";
import Layout from "../components/Layout";
const RegisterPage = () => {
  return (
    <Layout showButtons={false}>
      <div>
        <Register />
      </div>
    </Layout>
  );
};

export default RegisterPage;
