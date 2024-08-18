

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, Search } from 'lucide-react';
import { useAuthStore } from '../store/authUser';
import { useContentStore } from '../store/content';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { contentType, setContentType } = useContentStore();

  const toggleMobileMenuOpen = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleContentTypeChange = (type) => {
    setContentType(type);
  };

  return (
    <header className='max-w-6xl mx-auto flex flex-wrap justify-between items-center p-4 h-20 relative z-50'>
      <div className='flex items-center gap-10'>
        <Link to='/'>
          <img src="/netflix-logo.png" alt="Netflix-logo" className='w-32 sm:w-40' />
        </Link>

        {/* desktop navbar items */}
        <div className='hidden sm:flex gap-3 items-center'>
          <Link to='/' className='hover:underline' onClick={() => handleContentTypeChange("movie")}>
            Movies
          </Link>
          <Link to='/' className='hover:underline' onClick={() => handleContentTypeChange("tv")}>
            Tv Shows
          </Link>
          <Link to='/history' className='hover:underline'>
            Search
          </Link>
        </div>
      </div>

      <div className='flex gap-2 items-center relative z-50'>
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img src={user.image} alt="Avatar" className='h-8 rounded cursor-pointer' />
        <LogOut className='size-6 cursor-pointer' onClick={logout} />
        <div className='sm:hidden'>
          <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenuOpen} />
        </div>
      </div>

      {/* mobile navbar items */}
      {isMobileMenuOpen && (
        <div className='w-full sm:hidden mt-4 bg-black border rounded border-r-gray-500'>
          <Link to={"/"} className='block hover:underline p-2' onClick={() => handleContentTypeChange("movie")}>
            Movies
          </Link>
          <Link to={"/"} className='block hover:underline p-2' onClick={() => handleContentTypeChange("tv")}>
            Tv Shows
          </Link>
          <Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenuOpen}>
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
