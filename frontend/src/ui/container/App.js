import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getSession } from 'reducers/authentication';
import { setLocale } from 'reducers/locale';
import counterpart from 'counterpart';
import { locales } from 'config/translation';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import InternLabel from 'utils/intern-label';
import LogoImg from 'img/logo.png';

import 'stylus/main.styl';

let translate = counterpart.translate.bind(counterpart)

const Flag = (props) => {
  let flag = props.lang
  if (flag === 'en') flag = 'gb'
  if (flag === 'zh') flag = 'hk'
  return (
    <span className="f16"><span className={`flag ${flag}`} alt="{props.lang}"></span></span>
  )
}

const TopMenu = (props) => {
  const items = props.items.map((item, key) => (
    <IndexLinkContainer key={key} to={{ pathname: item.link }}>
      <NavItem>{translate(item.label)}</NavItem>
    </IndexLinkContainer>
  ));
  const loc = locales.map((lang, key) => (
    <MenuItem key={key} onSelect={() => props.setLocale(lang)}>
      <Flag lang={lang}/>
    </MenuItem>
  ));
  const right = props.isAuthenticated ? (
    <NavDropdown title={ <InternLabel icon="user" labelKey="app.menu.settings"/> } id="basic-nav-dropdown">
      <IndexLinkContainer to={{ pathname: '/settings/account' }}>
        <NavItem><InternLabel icon="envelope" labelKey="app.menu.account"/></NavItem>
      </IndexLinkContainer>
      <MenuItem divider />
      <IndexLinkContainer to={{ pathname: '/settings/logout' }}>
        <NavItem><InternLabel icon="sign-out" labelKey="app.menu.logout"/></NavItem>
      </IndexLinkContainer>
    </NavDropdown>
  ) : (
    <IndexLinkContainer to={{ pathname: '/login' }}>
      <NavItem><i className="fa fa-sign-in fa-fw"></i> {translate('app.menu.login')}</NavItem>
    </IndexLinkContainer>
  )

  return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"><img src={LogoImg} /></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {items}
          </Nav>
          <Nav pullRight>
            {right}
            <NavDropdown title={ <Flag lang={props.currentLocale}/> } id="basic-nav-dropdown">
              {loc}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export class App extends Component {

  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const {currentLocale, setLocale, isAuthenticated} = this.props;
    const menuItems = [
      {label: 'app.menu.home', link: '/'},
      {label: 'app.menu.private', link: '/private'}
    ];

    return (
      <div id="application">
        <TopMenu items={menuItems} isAuthenticated={isAuthenticated} currentLocale={currentLocale} setLocale={setLocale}/>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  state => ({isAuthenticated: state.authentication.isAuthenticated, currentLocale: state.locale.currentLocale}),
  {getSession, setLocale}
)(App);
