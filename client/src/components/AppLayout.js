import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

const AppLayout = ({ children }) => (
  <div>
    <Header />

    <div>{children}</div>

    <Footer />
  </div>
);

export default AppLayout;
