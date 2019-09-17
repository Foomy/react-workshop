import React from "react";
import ReactDOM from "react-dom";

import styled from "@emotion/styled";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { PageUserForm } from "./PageUserForm";
import { PageUsers } from "./PageUsers";

const HeaderBox = styled.header({
  border: "solid black",
  borderWidth: "0 0 1px 0",
  padding: "0 0 60px 0"
});

const Title = styled.h1({
  float: "left"
});

const MainNav = styled.nav({
  border: "solid 1px black",
  borderRadius: "5px",
  margin: "10px",
  padding: "5px"
});

const MainNavBtn = styled(Link)({
  display: "inline-block",
  margrin: "0 5px 0 0"
});

function App() {
  return (
    <Router>
      <div id="sitewrapper">
        <Header />

        <MainNav>
          <MainNavBtn to="/">Home</MainNavBtn>
          <MainNavBtn to="/users/">Users</MainNavBtn>
          <MainNavBtn to="/user-add/">Add User</MainNavBtn>
        </MainNav>

        <Switch>
          <Route path="/user-add/" component={PageUserForm} />
          <Route path="/users/:page?" component={PageUsers} />
          <Route path="/" component={PageHome} />
          <Route component={Err404} />
        </Switch>

        <div id="pagewrapper">
          <aside />
          <main />
        </div>

        <Footer />
      </div>
    </Router>
  );
}

function Err404() {
  return <div>Seite nicht gefunden.</div>;
}

function PageHome() {
  return (
    <p>
      <strong>:: Hier könnte Ihre Werbung stehen ::</strong>
    </p>
  );
}

function Header() {
  return (
    <HeaderBox>
      <Title>React-Userman</Title>
    </HeaderBox>
  );
}

function Footer() {
  return (
    <footer>
      <p>"Ich hab das mal ein Legacytool gebaut" (Sir Francisc Ruzsnyak)</p>
    </footer>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
