import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import MainData from './components/MainData';
import Finance from "./components/Finance";
import Youth from "./components/Youth";
import Secondary from "./components/Second";
import Child from "./components/Child";
import Contacts from './components/Contacts';
import AddMember from './components/Util/AddMember';
import Profile from './components/Profile';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useState } from 'react';
import Family from './components/Family';
import EditMember from './components/Util/EditMember';
import DeleteMember from './components/Util/DeleteMember';

export const UserContext = createContext(null);

function App() {
  const [currUser, setUser] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand">TEBAH Database</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link class="nav-link" to="/">Register <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item active">
              <Link class="nav-link" to="/login"> Log in </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/add">등록</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/edit">맴버수정</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/delete">맴버삭제</Link>
            </li>
            {/* Adults */}
            <li class="nav-item">
              <Link class="nav-link" to="/contacts/admin">기본주소록 B</Link>
            </li>
            {/* Youths */}
            <li class="nav-item">
              <Link class="nav-link" to="/contacts/youth">기본주소록 A</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to="/main">메인</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to="/main/finance">재정부</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to="/main/secondary">청년부</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to="/main/youth">중고등부</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/main/children">아동부</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/tebah-family">가족기록</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/profile">프로필</Link>
            </li>
          </ul>
        </div>
      </nav>
      <br />
      <UserContext.Provider value={[currUser, auth]}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        {currUser && currUser.email.includes("admin") ? <Route path="/main" element={<MainData />} /> : <Route path="/" element={<></>} />}
        {currUser && currUser.email.includes("admin") ? <Route path="/edit" element={<EditMember />} /> : <Route path="/" element={<></>} />}
        {currUser && currUser.email.includes("admin") ? <Route path="/delete" element={<DeleteMember />} /> : <Route path="/" element={<></>} />}
        {currUser &&  currUser.email.includes("admin") || currUser && currUser.email.includes("youth") ? <Route path="/main/youth" element={<Youth />} /> :  <Route path="/" element={<></>} />}
        {currUser &&  currUser.email.includes("admin") || currUser && currUser.email.includes("secondary") ? <Route path="/main/secondary" element={<Secondary />} /> :  <Route path="/" element={<></>} />}
        {currUser &&  currUser.email.includes("admin") || currUser && currUser.email.includes("children") ? <Route path="/main/children" element={<Child />} /> :  <Route path="/" element={<></>} />}
        {currUser &&  currUser.email.includes("admin") || currUser && currUser.email.includes("finance") ? <Route path="/main/finance" element={<Finance />} /> :  <Route path="/" element={<></>} />}
        <Route path="/add" element={<AddMember />} />
        <Route path={`/tebah-family`} element={<Family />}/>
        <Route path={`/contacts/${window.location.href.split("/")[4]}`} element={<Contacts route={window.location.href.split("/")[4]} />} />   
      </Routes>
      </UserContext.Provider>   
    </div>
  );
}

export default App;
