import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import DiscsLandingPage from "./components/DiscsLandingPage";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import BagsNavigationBar from "./components/BagsNavigationBar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/admin">
            <AdminDashboard />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/discs">
            <DiscsLandingPage />
          </Route>
          <ProtectedRoute>
            <Route path="/bags">
              <BagsNavigationBar />
            </Route>
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
