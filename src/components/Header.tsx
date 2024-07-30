// create header
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className='flex justify-center space-x-8 p-8'>
      <Link href='/'>
        Home
      </Link>
      <Link href='/products'>
        Products
      </Link>
      <Link href='/providers'>
        Providers
      </Link>
    </div>
  );
};

export default Header;