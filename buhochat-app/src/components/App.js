import "../styles/App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import ChatsLayout from "./ChatsLayout";
import MainLayout from "./MainLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage"
import Routes from '../constants/routes'
import Menu from './Menu'
import LoginPage from '../pages/LoginPage'
import ScreenRegister from './ScreenRegister'
import { AuthProvider } from "../lib/auth";
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
              <ScreenRegister />
            </Route> 
            <Route path={Routes.CHAT}>
              <ChatsLayout />
            </Route>
            {/*
            <Route path="/posts">
              <UsersPage />
            </Route>
            */}
            <Route path={Routes.MENU}>
              <Menu />
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