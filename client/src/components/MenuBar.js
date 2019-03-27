import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, Link,Switch, Route } from 'react-router-dom';

export default class MenuBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name='editorials'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
          //href='/'
        >
        <NavLink to='/'> Home </NavLink> 
      
        </Menu.Item>

        <Menu.Item name='reviews' 
        active={activeItem === 'reviews'}
        onClick={this.handleItemClick}>
          Sign up to be Donor
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
          
         // href='/Transfer-Donor'
        >
             
          <NavLink to='/Transfer-Donor'> Transfer-Donor </NavLink> 
        </Menu.Item>
      </Menu>
    )
  }
}