import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
const DashboardPage = () => {
  return (
    <Layout showButtons={false}>
      <div className="mt-10 mb-10 text-center">
        <div className="flex justify-center">
          <button className="mt-10 mr-20 mb-10 bg-blue-300 text-black hover:bg-blue-400 border border-gray-400 px-4 py-2 rounded-lg cursor-pointer">
            <Link to="/register">Register</Link>
          </button>
          <button className="mt-10 mb-10 bg-blue-300 text-black hover:bg-blue-400 border border-gray-400 px-4 py-2 rounded-lg cursor-pointer">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
