import './App.css';
import Register from './Register/Register';
import Login from './components/LogIn/Login';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import MainData from './components/MainData';
import Finance from "./components/Finance";
import Youth from "./components/Youth";
import Secondary from "./components/Second";
import Contacts from './components/Contacts';
import AddMember from './components/Util/AddMember';
import Profile from './components/Profile/Profile';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import EditMember from './components/Util/EditMember';
import DeleteMember from './components/Util/DeleteMember';
import Password from './components/Password';
import Pastor from './components/Pastor'
import Agreement from './components/Agreement';
import Verify from './components/Util/Verify';
import SearchCard from './components/SearchCard/SearchCard';
import Database from './components/Database/Database';
import Adults from './components/Adults';

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: "10px" }}>
        <a className="navbar-brand" href="/login" style={{ margin: 0 }}>
          <img src={`${process.env.PUBLIC_URL}/tebah.jpg`} width="50px" alt="brand-logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!currUser && (
              <>
                {/* <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Register <span className="sr-only">(current)</span>
                  </Link>
                </li> */}
                {/* <li className="nav-item active">
                  <Link className="nav-link" to="/login">Log in</Link>
                </li> */}
              </>
            )}
            {checkLevel("새가족") && (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    새가족
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li className="nav-item dropdown-item">
                      <Link className="nav-link" to="/add">등록</Link>
                    </li>
                    <li className="nav-item dropdown-item">
                      <Link className="nav-link" to="/edit">맴버수정</Link>
                    </li>
                    <li className="nav-item dropdown-item">
                      <Link className="nav-link" to="/delete">맴버삭제</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    DB
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="nav-link" to="/database/active"> Members </Link>
                    <Link className="nav-link" to="/database/family"> Family</Link>
                    <Link className="nav-link" to="/database/visitor"> Visitor</Link>
                    <Link className="nav-link" to="/database/archive"> Archive</Link>
                    <Link className="nav-link" to="/database/all"> All</Link>
                    <Link className="nav-link" to="/agreement">Consent</Link>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search-card">등록카드 검색</Link>
                </li>
              </>
            )}
            {currUser ? <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                부서별
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {(checkLevel("새가족") || checkLevel("아동부")) && (
                  <li>
                    <Link className="nav-item dropdown-item" to="/contacts/children">아동부</Link>
                  </li>
                )}
                {(checkLevel("재정부") || checkLevel("새가족")) && (
                  <li>
                    <Link className="nav-item dropdown-item" to="/main/finance">재정부</Link>
                  </li>
                )}
                {(checkLevel("새가족") || checkLevel("유스")) && (
                  <li>
                    <Link className="nav-item dropdown-item" to="/main/youth">중고등부</Link>
                  </li>
                )}
                {(checkLevel("general") || checkLevel("새가족")) && (
                  <>
                    <li>
                      <Link className="nav-item dropdown-item" to="/main/secondary">청년부</Link>
                    </li>
                    <li>
                      <Link className="nav-item dropdown-item" to="/main/pastors">교역자</Link>
                    </li>
                    <li>
                      <Link className="nav-item dropdown-item" to="/main/adults">장년부</Link>
                    </li>
                  </>
                )}
              </ul>
            </li> : null}
            {currUser ? <li className="nav-item">
              <Link className="nav-link" to="/profile">프로필</Link>
            </li> : null}
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
          <Route path="/main/finance" element={<Finance />} /> :  <Route path="/" element={<></>} />
          <Route path="/add" element={<AddMember />} />
          <Route path={`/agreement`} element={<Agreement />} />
          <Route path={`/search-card`} element={<SearchCard />} />
          <Route path={`/main/adults`} element={<Adults />} />
          <Route path={`/password/:username`} element={<Password />} />
          <Route path={`/contacts/:route`} element={<Contacts />} />
          <Route path={`/main/pastors`} element={<Pastor />} />
          <Route path="/verify" element={<Verify />} />
          <Route path={`/database/:type`} element={<Database />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
