import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSuperAdmin from './components/LoginSuperAdmin';
import GetAllMosques from './components/GetAllMosques';
import ProfileMosque from './components/ProfileMosque';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSuperAdmin />} />
        <Route path="/mosques" element={<GetAllMosques />} />
        <Route path="/profile" element={<ProfileMosque />} />
        <Route path="*" element={<LoginSuperAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;

