import { FC } from 'react';

import Header from 'src/components/molecules/Header';
import Main from 'src/components/organisms/Main';

const Widget: FC = () => {
  return (
    <div className='septa-widget'>
      <Header />

      <Main />
    </div>
  );
};

export default Widget;
