import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Welcome to Stackquae Docs" description="Documentation homepage">
      <main className={styles.main}>
        <div className={styles.centered}>
          <h1>📘 Stackquae Documentation</h1>
          <p>A complete guide to using the Stackquae platform.</p>
          <Link className="button button--primary button--lg" to="/intro">
            Go to Docs →
          </Link>
        </div>
      </main>
    </Layout>
  );
}
