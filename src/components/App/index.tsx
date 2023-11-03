import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './global.css';
import AppLayout from '../../layouts/AppLayout';

import CardContainer from '../CardContainer';
import ErrorBoundary from '../ErrorBoundary';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Navigate to="search" replace />} />
      <Route path="search">
        <Route index element={<CardContainer />} errorElement={<ErrorBoundary />} />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
