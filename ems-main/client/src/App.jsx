import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import LoginAdmin from './components/LoginAdmin.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Screen/Home.jsx';
import Dashboard from './Screen/Dashboard.jsx';
import CreateEmp from './Screen/CreateEmp.jsx';
import EmpList from './Screen/EmpList.jsx';
import ProtectedRoute from './Screen/ProtectedRoute.jsx';
import Layout from './Screen/Layout.jsx';
import EmpDashboard from './Screen/EmpDashboard.jsx';
import UpdateEmp from './Screen/UpdateEmp.jsx';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewTask from './Screen/ViewTask.jsx';
import CreateTask from './Screen/CreateTask.jsx';
import TaskUpdate from './Screen/TaskUpdate.jsx';
import ViewTaskByEmp from './Screen/ViewTaskByEmp.jsx';
import Error from './Screen/Error.jsx';
import DashWelcome from './Screen/DashWelcome.jsx';
import EmpWelcome from './Screen/EmpWelcome.jsx';
import Profile from './Screen/Profile.jsx';
const App = () => {
  return (
    <Router>
      <Layout>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Bounce} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
          {/* <Route path="/register" element={<Admin />} /> */}
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="/empdashboard" element={<ProtectedRoute allowedRoles={["employee"]} Component={<EmpDashboard />} />} >
            <Route path="/empdashboard" element={<EmpWelcome />}> </Route>
            <Route path="/empdashboard/profile" element={<Profile />}> </Route>
            <Route path="/empdashboard/viewtask/:id" element={<ViewTaskByEmp />}> </Route>
          </Route>
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin"]} Component={<Dashboard />} />} >
            <Route path="/dashboard/" element={<DashWelcome />}> </Route>
            <Route path="/dashboard/profile" element={<Profile />}> </Route>
            <Route path="/dashboard/createemp" element={<CreateEmp />}> </Route>
            <Route path="/dashboard/emplist" element={<EmpList />}> </Route>
            <Route path="/dashboard/creattask" element={<CreateTask />}> </Route>
            <Route path="/dashboard/viewtask" element={<ViewTask />}> </Route>
            <Route path="/dashboard/updattask/:id" element={<TaskUpdate />}> </Route>
            <Route path="/dashboard/updateemp/:id" element={<UpdateEmp />}> </Route>
          </Route>
        </Routes>
      </Layout>
    </Router>

  );
};
export default App;
