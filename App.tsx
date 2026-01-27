
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Subscriptions from './pages/Subscriptions';
import Checkout from './pages/Checkout';
import Terms from './pages/Terms';
import Legal from './pages/Legal';
import Commerce from './pages/Commerce';
import MaterialsCatalog from './pages/MaterialsCatalog';
import Consultance from './pages/Consultance';
import Transport from './pages/Transport';
import ImportExport from './pages/ImportExport';
import ImportExportDetail from './pages/ImportExportDetail';
import Login from './pages/Login';

// Composant utilitaire pour scroller en haut de page à chaque changement de route
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/abonnements" element={<Subscriptions />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/conditions-generales" element={<Terms />} />
            <Route path="/mentions-legales" element={<Legal />} />
            <Route path="/commerce" element={<Commerce />} />
            <Route path="/commerce/catalogue-materiaux" element={<MaterialsCatalog />} />
            <Route path="/consultance" element={<Consultance />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/import-export" element={<ImportExport />} />
            <Route path="/import-export/:sector" element={<ImportExportDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
