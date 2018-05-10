import * as React from 'react';
import { MainView, Sidebar } from '../components';
import { AppContainer } from '../components/layout/AppContainer';

export const RootPage: React.SFC = (props) => {
  return (
    <AppContainer
      sidebar={<Sidebar />}
      main={<MainView />}
    />
  )
}
