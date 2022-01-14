import style from '../assets/scss/backToTop.module.scss'
import { useState, useEffect } from 'react'

const BackToTop = () => { 
    const scrollThreshold = 200
    const [displayButton, setDisplayButton] = useState(window.scrollY > scrollThreshold);

    document.addEventListener("scroll", () => { 
        setDisplayButton(window.scrollY > scrollThreshold)
    });

    const scrollToTop = () => { 
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    
    console.log(displayButton)
    return <div id="backToTop" className={displayButton ? style.backButton : style.backButtonHidden} onClick={scrollToTop}>
        Back
    </div>
}

export default BackToTop