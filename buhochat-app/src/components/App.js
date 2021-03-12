import "../styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ChatsPage from "../pages/ChatsPage";
import MainLayout from "./MainLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import Routes from "../constants/routes";
import MenuPage from "../pages/MenuPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { AuthProvider } from "../lib/auth";
import PostsPage from "../pages/PostsPage";

function App() {
  return (
    <>
      <AuthProvider>
        <MainLayout>
          <Switch>
            <Route path={Routes.HOME} exact={true}>
              <HomePage />
            </Route>
            <Route path={Routes.LOGIN}>
              <LoginPage />
            </Route>
            <Route path={Routes.REGISTER}>
              <RegisterPage />
            </Route>
            <Route path={Routes.CHAT}>
              <ChatsPage />
            </Route>

            <Route path={Routes.POSTS}>
              <PostsPage />
            </Route>

            <Route path={Routes.MENU}>
              <MenuPage />
            </Route>

            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </MainLayout>
      </AuthProvider>
    </>
  );
}

export default App;
