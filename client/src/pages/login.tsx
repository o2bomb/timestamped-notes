import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";

import styles from "../styles/Login.module.css";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

const login: React.FC = ({}) => {
  const router = useRouter();
  const { data } = useMeQuery();
  if (data?.me) {
    router.push("/");
  }

  return (
    <Layout variant="small" navigation={false}>
      <div className={styles.container}>
        <div className={styles.title}>
          Sign in to <span>timestamped_notes</span>
        </div>
        <div className={styles.buttonGroup}>
          <Link href="/auth/google">
            <button disabled>Sign in with Google</button>
          </Link>
          <Link href="/auth/facebook">
            <button disabled>Sign in with Facebook</button>
          </Link>
          <Link href="/auth/twitter">
            <button disabled>Sign in with Twitter</button>
          </Link>
          <Link href="/auth/github">
            <button>Sign in with GitHub</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default login;
