import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './app.module.css';
import Search from '../../components/Search';

export default function AppLayout() {
  return (
    <div className={styles.container}>
      <Search />
      <Outlet />
    </div>
  );
}
