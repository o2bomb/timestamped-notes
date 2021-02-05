import React from 'react'
import Link from "next/link";
import Layout from '../components/Layout';

 const login: React.FC = ({}) => {
    return (
      <Layout>
        <Link href="/auth/github">
          Sign in with GitHub
        </Link>
      </Layout>
    );
}

export default login;