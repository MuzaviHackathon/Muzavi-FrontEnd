import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Lecture from './pages/Lecture';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
import InitialSetup from './pages/InitialSetup';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const path = location.pathname;

  const hideNavbar = path === '/' || path === '/initialsetup';
  const hideTopbar = path === '/';

  const topPaddingClass = hideTopbar ? '' : 'pt-[4rem]';

  return (
    <div className={`min-h-screen pb-[5.5rem] ${topPaddingClass}`}>
      {!hideTopbar && <Topbar />}
      {children}
      {!hideNavbar && <Navbar />}
    </div>
  );
};

function App() {
  const isLoggedIn = !!localStorage.getItem('userId');

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/initialsetup" /> : <Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/initialsetup" element={<InitialSetup />} />
          <Route path="/lecture" element={<Lecture />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
