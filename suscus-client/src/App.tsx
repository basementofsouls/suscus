import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Login from "./pages/LoginPage";
import HelloPage from "./pages/HelloPage";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SideBar from "./components/SideBar";
import RegistrationPage from "./pages/RegistrationPage";
import PublicationPage from "./pages/PublicationPage";
import ArtistPage from "./pages/ArtistPage";
import SettingsPage from "./pages/SettingsPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    store.checkAuth();
  }, []);

  useEffect(() => {
    if (
      !store.isAuth &&
      !(
        window.location.pathname == "/home" ||
        window.location.pathname.includes("/login") ||
        window.location.pathname.includes("/registration")
      )
    ) {
      window.location.href = "/home";
    }
  }, [store]);

  if (store.isLoading) {
    return <div>Loading</div>;
  } else {
    return (
      <Router>
        <div className="app-wrapper">
          {store.isAuth && <SideBar />}
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<RegistrationPage />} />

              {store.isAuth ? (
                <>
                  <Route path="/gallery" element={<MainPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route
                    path="/publication/:id"
                    element={<PublicationPage />}
                  />
                  <Route path="/artist/:id" element={<ArtistPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<MainPage />} />
                </>
              ) : (
                ""
              )}
              <Route path="*" element={<HelloPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default observer(App);
