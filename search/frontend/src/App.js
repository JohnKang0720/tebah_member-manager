import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import MainData from './components/MainData';
import Finance from "./components/Finance";
import Youth from "./components/Youth";
import Secondary from "./components/Second";
import Child from "./components/Child";
import Contacts from './components/Contacts';
import AddMember from './components/Util/AddMember';
import Profile from './components/Profile';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import Family from './components/Family';
import EditMember from './components/Util/EditMember';
import DeleteMember from './components/Util/DeleteMember';
import Password from './components/Password';
import Pastor from './components/Pastor'
import Agreement from './components/Agreement';

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

  const checkLevel = (param) => {
    return currUser && currUser.email.includes(param)
  }

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand">TEBAH Database</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            {!currUser ? <li class="nav-item active">
              <Link class="nav-link" to="/">Register <span class="sr-only">(current)</span></Link>
            </li> : null}
            {!currUser ? <li class="nav-item active">
              <Link class="nav-link" to="/login"> Log in </Link>
            </li> : null}
            {checkLevel("admin") ? <section>
              <li class="nav-item">
                <Link class="nav-link" to="/add">등록</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/edit">맴버수정</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/delete">맴버삭제</Link>
              </li>
            </section> : null}
            {/* 아동부 */}
            <li class="nav-item">
              <Link class="nav-link" to="/contacts/children">아동부</Link>
            </li>
            {/* 장년부 */}
            <li class="nav-item">
              <Link class="nav-link" to="/contacts/adults">장년부</Link>
            </li>
            {/* {checkLevel("admin") ? <li class="nav-item">
              <Link class="nav-link " to="/main">메인</Link>
            </li> : null} */}
            <Link class="nav-link " to="/main">메인</Link>
            <Link class="nav-link " to="/agreement">Agreement</Link>
            {checkLevel("finance") ?
              <li class="nav-item">
                <Link class="nav-link " to="/main/finance">재정부</Link>
              </li> : null}
            <li class="nav-item">
              <Link class="nav-link " to="/main/secondary">청년부</Link>
            </li>
            {checkLevel("admin") || checkLevel("secondary") ? <li class="nav-item">
              <Link class="nav-link " to="/main/youth">중고등부</Link>
            </li> : null}
            {checkLevel("admin") || checkLevel("pastor") ? <li class="nav-item">
              <Link class="nav-link" to="/main/pastors">교역자</Link>
            </li> : null}
            <li class="nav-item">
              <Link class="nav-link" to="/tebah-family"> 전교인 </Link>
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
          <Route path="/main" element={<MainData />} />
          {/* {checkLevel("admin") ? <Route path="/main" element={<MainData />} /> : <Route path="/" element={<></>} />} */}
          {checkLevel("admin") ? <Route path="/edit" element={<EditMember />} /> : <Route path="/" element={<></>} />}
          {checkLevel("admin") ? <Route path="/delete" element={<DeleteMember />} /> : <Route path="/" element={<></>} />}
          <Route path="/main/secondary" element={<Secondary />} />
          {checkLevel("admin") || checkLevel("youth") ? <Route path="/main/youth" element={<Youth />} /> : <Route path="/" element={<></>} />}
          {checkLevel("admin") || checkLevel("children") ? <Route path="/main/children" element={<Child />} /> : <Route path="/" element={<></>} />}
          <Route path="/main/finance" element={<Finance />} /> :  <Route path="/" element={<></>} />
          <Route path="/add" element={<AddMember />} />
          <Route path={`/tebah-family`} element={<Family />} />
          <Route path={`/agreement`} element={<Agreement />} />

          <Route path={`/password/:username`} element={<Password />} />
          <Route path={`/contacts/:route`} element={<Contacts />} />
          <Route path={`/main/pastors`} element={<Pastor />} />

        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
