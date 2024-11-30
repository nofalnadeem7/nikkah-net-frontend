import './App.css';
import { AuthProvider } from "./AuthContext";
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomFooter from './components/Footer';
import Login from './components/LoginForm/Login';
import UserList from './components/UserList/UserList';
import ViewProfile from './components/ViewProfile/ViewProfile';
import UserReport from './components/UserReport/UserReport';
import ViewReport from './components/ViewReport/ViewReport';
import BugReport from './components/BugReport/BugReport';
import Resolve from './components/Resolve/Resolve';
import logoNN from './components/assets/images/logoNN.PNG';


function App() {
  return (
      <AuthProvider>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userlist" element={<UserList />} /> 
        <Route path="/viewprofile/:userId" element={<ViewProfile />} />
        <Route path="/userreport" element={<UserReport />} />
        <Route path="/viewreport/:reportId" element={<ViewReport />} />
        <Route path="/bugreport" element={<BugReport />} />
        <Route path="/viewbug/:bugId" element={<Resolve />} />
        {/* Uncomment and add other routes as needed */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
      <CustomFooter />
    </Router>
    </AuthProvider>

   
    
  );
}

export default App;
