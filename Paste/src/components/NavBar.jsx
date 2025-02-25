import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="flex gap-4 justify-center p-3 bg-gradient-to-r from-blue-400 to-green-400 w-full">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "!text-black" : "!text-white"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          isActive ? "!text-black" : "!text-white"
        }
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default NavBar;
