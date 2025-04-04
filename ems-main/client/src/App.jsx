import Admin from './components/Admin'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import LoginAdmin from './components/LoginAdmin.jsx'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Screen/Home.jsx';
import Dashboard from './Screen/Dashboard.jsx';
import CreateEmp from './Screen/CreateEmp.jsx';
import EmpList from './Screen/EmpList.jsx';
import ProtectedRoute from './Screen/ProtectedRoute.jsx';
import Layout from './Screen/Layout.jsx';
import EmpDashboard from './Screen/EmpDashboard.jsx';
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Admin />} />
          <Route path="/login" element={<LoginAdmin />} />

          <Route path="/empdashboard" element={<ProtectedRoute Component={<EmpDashboard />} />} ></Route>
          <Route path="/dashboard" element={<ProtectedRoute Component={<Dashboard />} />} >
            <Route path="/dashboard/createemp" element={<CreateEmp />}> </Route>
            <Route path="/dashboard/emplist" element={<EmpList />}> </Route>
            <Route path="/dashboard/creattask" element={<EmpList />}> </Route>
          </Route>
        </Routes>
      </Layout>
    </Router>

  );
};
export default App;
