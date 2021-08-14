import "./App.css";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Login from "./components/Login";
import SingUp from "./components/SignUp";
import Home from "./components/Home";
import { Fragment, useEffect, useState } from "react";
import Loader from "react-loader-spinner";

function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const localStorageValue = localStorage.getItem("loggedIn");

    if (localStorageValue) {
      history.push("/");
      setLoggedIn(true);
    } else {
      if (location.pathname !== "/signUp") {
        history.push("/login");
      }
      setLoggedIn(false);
    }

    setIsAppReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!isAppReady) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader type="TailSpin" color="#000000" height={100} width={100} />
      </div>
    );
  }

  return (
    <div>
      <Switch>
        {loggedIn ? (
          <Route exact path="/">
            <Home />
          </Route>
        ) : (
          <Fragment>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signUp">
              <SingUp />
            </Route>
          </Fragment>
        )}
      </Switch>
    </div>
  );
}

export default App;
