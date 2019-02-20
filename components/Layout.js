import Header from './Header';
import Footer from './Footer';
import Router from 'next/router';

const Layout = ({children}) => (
  <div>
    <Header/>
    {children}
    <Footer/>
  </div>
);

export default Layout;