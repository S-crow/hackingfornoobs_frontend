import React from "react";
import { slide as Menu } from "react-burger-menu";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


class Sidebar extends React.Component {

render() {

  return (
    <Router>
        <Menu>       
          <Link className="menu-item" to="/" onClick={() => this.props.action('accueil')}>Accueil</Link>
          <Link className="menu-item" to="/pentest/" onClick={() => this.props.action('pentest')}>Méthodologie Pentest</Link>
          <Link className="menu-item" to="/active-directory/" onClick={() => this.props.action('activedirectory')}>Active Directory</Link>
          <Link className="menu-item" to="/ntlm/" onClick={() => this.props.action('ntlm')}>Protocole NTLM</Link>
          <Link className="menu-item" to="/smb/" onClick={() => this.props.action('smb')}>Protocole SMB</Link>
          <Link className="menu-item" to="/kerberos/" onClick={() => this.props.action('kerberos')}>Kerberos</Link>
          <Link className="menu-item" to="/sneakymercury/" onClick={() => this.props.action('sneakymercury')}>SneakyMercury</Link>
          <Link className="menu-item" to="/redteam/" onClick={() => this.props.action('redteam')}>Redteam</Link>
          <Link className="menu-item" to="/hacker-manifesto/" onClick={() => this.props.action('hackermanifesto')}>Hacker Manifesto</Link>         

          <a className="menu-item" href="../portfolio/">Portfolio</a>
          <Switch>
            <Route exact path="/"/>
            <Route path="/pentest/"/>
            <Route path="/active-directory/"/>
            <Route path="/ntlm/"/>
            <Route path="/smb/"/>
            <Route path="/kerberos/"/>
            <Route path="/sneakymercury/"/>
            <Route path="/redteam/"/>
            <Route path="/hacker-manifesto/"/>
            <Route path="/portfolio/"/>

          </Switch>
        </Menu>
    </Router>
  );
  }
}

export default Sidebar;