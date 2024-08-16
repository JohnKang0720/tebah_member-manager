import './App.css';
import Register from './components/Register';
import Login from './components/LogIn/Login';
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
import Verify from './components/Util/Verify';
import SearchCard from './components/SearchCard';
import Database from './components/Database';

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
    let eng_param = ""
    if (param == "새가족") eng_param = "admin"
    else if (param === "아동부") eng_param = "child"
    else if (param === "재정부") eng_param = "finance"
    else if (param === "유스") eng_param = "youth"
    else eng_param = "general"
    return currUser && (currUser.email.includes(eng_param) || currUser.level === param)
  }

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">

        {/* IF logged in, /profile else /login */}
        <a class="navbar-brand" href="/login"> <img src={`${process.env.PUBLIC_URL}/tebah.jpg`} width={'50px'} /> </a>
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
            {checkLevel("새가족") ? <section style={{ display: "flex", flexDirection: "row" }}>
              <li class="nav-item">
                <Link class="nav-link" to="/add">등록</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/edit">맴버수정</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/delete">맴버삭제</Link>
              </li>
              <Link class="nav-link " to="/agreement">Agreement</Link>
              <Link class="nav-link " to="/database/all">Database - All </Link>
              <Link class="nav-link" to="/database/family"> Database - Family </Link>
              <Link class="nav-link" to="/database/archive"> Database - Archive </Link>
              <Link class="nav-link" to="/database/active"> Database - Active </Link>
              <Link class="nav-link" to="/database/visitor"> Database - Visitor </Link>
              <li class="nav-item">
                <Link class="nav-link" to="/search-card">등록카드</Link>
              </li>
            </section> : null}
            {/* 아동부 */}
            {checkLevel("새가족") || checkLevel("아동부") ? <li class="nav-item">
              <Link class="nav-link" to="/contacts/children">아동부</Link>
            </li> : null}
            {checkLevel("재정부") ?
              <li class="nav-item">
                <Link class="nav-link" to="/main/finance">재정부</Link>
              </li> : null}
            {checkLevel("새가족") || checkLevel("유스") ? <li class="nav-item">
              <Link class="nav-link " to="/main/youth">중고등부</Link>
            </li> : null}
            {/* Anyone can see */}
            {checkLevel("general") || checkLevel("새가족") ? <section style={{ display: "flex", flexDirection: "row" }}>
              <li class="nav-item">
                <Link class="nav-link" to="/main/secondary">청년부</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/main/pastors">교역자</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/contacts/adults">장년부</Link>
              </li>
            </section> : null}
            {/* remove if logged in */}
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
          <Route path="/edit" element={<EditMember />} /> : <Route path="/" element={<></>} />
          <Route path="/delete" element={<DeleteMember />} /> : <Route path="/" element={<></>} />
          <Route path="/main/secondary" element={<Secondary />} />
          <Route path="/main/youth" element={<Youth />} />
          <Route path="/main/children" element={<Child />} />
          <Route path="/main/finance" element={<Finance />} /> :  <Route path="/" element={<></>} />
          <Route path="/add" element={<AddMember />} />
          <Route path={`/tebah-family`} element={<Family />} />
          <Route path={`/agreement`} element={<Agreement />} />
          <Route path={`/search-card`} element={<SearchCard />} />

          <Route path={`/password/:username`} element={<Password />} />
          <Route path={`/contacts/:route`} element={<Contacts />} />
          <Route path={`/main/pastors`} element={<Pastor />} />
          <Route path="/verify" element={<Verify />} />
          <Route path={`/database/:type`} element={<Database/>} /> 

        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
