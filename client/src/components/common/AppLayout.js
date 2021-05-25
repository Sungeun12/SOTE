import React from 'react';
import Header from './Header';
import Footer from './Footer';

const AppLayout = ({ children }) => (
  <div>
    <Header />
    <div>{children}</div>
    <Footer />
  </div>
);

export default AppLayout;
