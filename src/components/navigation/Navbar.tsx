import React, { useContext } from 'react'
import { logout } from '../../utilities/signOutUtilities'
import { ProfileContext } from '../../context/profile.context'

export const Navbar = () => {
  const { profile } = useContext(ProfileContext);
  return (
    <nav>
      {profile && <button onClick={logout}>Log Out</button>}
    </nav>
  )
}
