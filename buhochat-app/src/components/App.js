import "../styles/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Col, Row, Space } from "antd";
import ChatsLayout from "./ChatsLayout";
import MainLayout from "./MainLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage"
import Routes from '../constants/routes'
import Menu from './Menu'
import ScreenRegister from './ScreenRegister'

function App() {

  return (
    <>
      <Router>
        <MainLayout>
          <Switch>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
            {/*<Route path="/login">
              <AboutPage />
            </Route>*/}
            <Route path={Routes.REGISTER}>
              <ScreenRegister />
            </Route> 
            <Route path="/chat">
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
      </Router>
    
    </>
  );
}

export default App;