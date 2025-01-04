import Image from 'next/image';
import { useState } from 'react';

import backToTopIcon from '../assets/images/icon-backtotop.svg';
import style from '../assets/scss/BackToTop.module.scss';

const BackToTop = () => {
  const scrollThreshold = 200;
  const [displayButton, setDisplayButton] = useState(
    window.scrollY > scrollThreshold,
  );

  document.addEventListener('scroll', () => {
    setDisplayButton(window.scrollY > scrollThreshold);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="backToTop"
      className={displayButton ? style.backButton : style.backButtonHidden}
      onClick={scrollToTop}
    >
      <Image src={backToTopIcon} alt="Back to top" width="100" height="100" />
    </div>
  );
};

export default BackToTop;
