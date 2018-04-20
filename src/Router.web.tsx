import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const Router: React.SFC = ({children}) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);
