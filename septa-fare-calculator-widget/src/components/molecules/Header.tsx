import { FC } from 'react';

import { ReactComponent as Logo } from 'src/assets/septa-logo.svg';

const Header: FC = () => {
  return (
    <header className='septa-widget-header'>
      <Logo className='septa-widget-logo' />
      <h1 className='septa-widget-name'>Regional Rail Fares</h1>
    </header>
  );
};

export default Header;
