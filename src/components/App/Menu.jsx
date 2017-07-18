import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class TopMenu extends Component {

  @autobind
  handleItemClick(e, { name }) {
    this.props.history.push(name);
  }

  currentPath() {
    const { pathname } = this.props.location;
    const first = pathname.split('/')[1];
    return `/${first}`;
  }

  render() {
    const currentPath = this.currentPath();
    return (
      <Menu pointing secondary>
        <Menu.Item name="/" active={currentPath === '/'} onClick={this.handleItemClick}>Home</Menu.Item>
        <Menu.Item name="/client" active={currentPath === '/client'} onClick={this.handleItemClick}>New Client</Menu.Item>
      </Menu>
    );
  }
}

TopMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(TopMenu);
