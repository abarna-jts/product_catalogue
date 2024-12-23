import React, { useContext, useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    };
  }, [currentUser, navigate]);

  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className="flex justify-between items-center px-5 py-2 bg-primary fixed top-0 w-full z-40">
      <a href="/home" className="font-bold text-gray-200">Catalogue App</a>
      <nav className="hidden md:block">
        <ul className="flex items-center gap-3 text-white">
          {/* <li><Link className='hover:text-gray-700 hover:bg-teal-400 rounded-md px-4 mx-1 py-2' to='/home'>Home</Link></li>
          <li><Link className='hover:text-gray-700 hover:bg-teal-400 rounded-md px-4 mx-1 py-2' to='/new_catalogue'>Create New</Link></li> */}
          <li className='relative group hover:text-gray-700 hover:bg-teal-400 rounded-md px-4 mx-1 py-2'>
            <span className='group-hover:text-gray-800'>{currentUser?.username}</span>
            <ul className='absolute bg-teal-400 rounded-md top-8 right-0 hidden group-hover:block w-full'>
              <li className='my-1 hover:bg-teal-800 hover:text-white px-2 text-center py-2'>
                <Link onClick={logout} className='text-left'>Logout</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {toggleMenu && (
        <nav className="block md:hidden">
          <ul onClick={() => setToggleMenu(!toggleMenu)} className="flex flex-col fixed top-10 left-0 bg-gray-800 w-full h-1/6 text-white">
            {/* <li className='w-full h-full text-center flex items-center justify-center mb-2 border-white'><a href="/home">Home</a></li>
            <li className='w-full h-full text-center flex items-center justify-center'><a href="/new_catalogue">Create New</a></li> */}
            <li className='w-full h-full text-center flex items-center justify-center'><Link onClick={logout} className='text-red-600'>Logout</Link></li>
          </ul>
        </nav>
      )}
      <button className="block md:hidden" onClick={() => setToggleMenu(!toggleMenu)}>
        <GiHamburgerMenu className="text-white h-5" />
      </button>
    </header>

  );
};

export default Navbar;