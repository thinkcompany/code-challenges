import { FC } from 'react';

interface IProps {
  title: string;
  dark?: boolean;
  children?: React.ReactNode;
}

const Section: FC<IProps> = ({ title, dark, children }) => {
  return (
    <section
      className={`septa-widget-section ${
        dark ? 'septa-widget-section--dark' : ''
      }`}
    >
      <h2 className='septa-widget-section__title'>{title}</h2>

      {children && <div className='septa-widget-section-body'>{children}</div>}
    </section>
  );
};

export default Section;
