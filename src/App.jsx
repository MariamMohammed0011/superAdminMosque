import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSuperAdmin from './components/LoginSuperAdmin';
import GetAllMosques from './components/GetAllMosques';
import ProfileMosque from './components/ProfileMosque';
import RegisterAdmin from './components/RegisterAdmin';
import GetAllAdmins from './components/GetAllAdmins';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSuperAdmin />} />
        <Route path="/mosques" element={<GetAllMosques />} />
        <Route path="/profile" element={<ProfileMosque />} />
        <Route path="/profile/:mosqueId" element={<ProfileMosque />} />
          <Route path="/admins" element={<GetAllAdmins />} />
         <Route path="/registerAdmin" element={<RegisterAdmin />} />
        <Route path="*" element={<LoginSuperAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;

