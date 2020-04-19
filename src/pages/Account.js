import React from 'react'

import NavBar from '../components/NavBar';

const Account = ({user}) => {
  return (
    <div>
      <NavBar user={user}></NavBar>
      Account page
    </div>
  )
}

export default Account
