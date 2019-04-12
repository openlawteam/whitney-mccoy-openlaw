import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink} from 'react-router-dom';

export default class MenuBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>

        <Menu.Item
          name='landingPage'
          active={activeItem === 'landingPage'}
          onClick={this.handleItemClick}
          as = {NavLink}
          to = '/'
        >
        Token Tracker
        </Menu.Item>

        <Menu.Item name='newDonor' 
        active={activeItem === 'newDonor'}
        onClick={this.handleItemClick}
        as = {NavLink}
        to = '/New-Donor'
        >
          Sign up to be Donor of Record
        </Menu.Item>

        <Menu.Item
          name='transferDonor'
          active={activeItem === 'transferDonor'}
          onClick={this.handleItemClick}
          as = {NavLink}
          to = '/Transfer-Donor' 
        >
        Transfer Donor of Record Token
        </Menu.Item>

        <Menu.Item
          name='artistDashboard'
          active={activeItem === 'artistDashboard'}
          onClick={this.handleItemClick}
          as = {NavLink}
          to = '/Artist-Dashboard' 
        >
          Artist Dashboard
        </Menu.Item>
      </Menu>
    )
  }
}