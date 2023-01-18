import Axios from "./Components/Axios/Axios";
import React, {
  useState,
  useEffect,
  createContext,
  Suspense,
} from "react";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import { NewtonsCradle } from "@uiball/loaders";
export const AuthContext = createContext();

const App = () => {
  const [Auth, setAuth] = useState(false);
  const [loading, setloading] = useState(true);
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
    return () => {
      setloading(false);
    };
  }, []);
  useEffect(() => {
    const refreshToken = JSON.parse(localStorage.getItem("refreshTokenAdmin"));
    if (refreshToken) {
      Axios.post("/refreshtoken", {
        token: refreshToken,
      })
        .then((res) => {
          setuserData(res.data.user);
          setAuth(true);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    } else {
      setAuth(false);
    }
  }, []);
  return (
    <>
      <AuthContext.Provider
        value={{
          Auth,
          setAuth,
          userData,
          setuserData,
          setloading,
        }}
      >
        {loading && (
          <div className="loader">
            <NewtonsCradle size={60} speed={1.75} color="#7F7B7D" />
            <p>Loading...</p>
          </div>
        )}
        <main className="main">
          {!loading && Auth && (
            <Suspense>
              <Navbar />
            </Suspense>
          )}
          {!loading && !Auth && <Login />}
        </main>
      </AuthContext.Provider>
    </>
  );
};

export default App;
