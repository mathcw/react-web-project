import React from 'react';
import { RootProvider } from '@/rootState';
import PageLoading from '@/components/PageLoading';
import { sysInit } from '@/utils/core';
import ErrorBoundary from '@/components/ErrorBoundary';

const Layout: React.FC = ({ children }) => {
  sysInit();
  return (
    <ErrorBoundary><RootProvider><PageLoading/>{children}</RootProvider></ErrorBoundary>
  )
}

export default Layout;
