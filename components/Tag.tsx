import React, { createRef, useEffect } from "react";

import style from "../assets/scss/Tag.module.scss"

const Tag = ({children}) => {

    const tagRef = createRef<HTMLDivElement>();
    
    useEffect(() => {
    const animateTags = () => { 
        let tagEl = tagRef.current;
        if (tagEl) { 
        //     // x and y are the co-ordinates of the circle
        //     // vx and vy are the respective speeds
        let tagWidth = tagEl.offsetWidth;
        let tagHeight = tagEl.offsetHeight;
 
        var x = Math.floor(Math.random() * (window.innerWidth - tagWidth));
        var y = Math.floor(Math.random() * (window.innerHeight - tagHeight));
        var vx = Math.floor(Math.random() * 2) + 1;
        var vy = Math.floor(Math.random() * 2) + 1;

        //Move to their initial position
        tagEl.style.left = x + 'px';
        tagEl.style.top = y + 'px';
 
        move();

        setInterval(move, 34)
           
        function move() {
            if (tagWidth + x > window.innerWidth) vx = 0 - vx;
            if (x < 0) vx = 0 - vx;
            if (y + tagHeight > window.innerHeight) vy = 0 - vy;
            if (y < 0) vy = 0 - vy;

            x = x + vx;
            y = y + vy;
                
            tagEl.style.left = x + 'px';
            tagEl.style.top = y + 'px';
            }
        }
    };
    animateTags();
}, [tagRef]);

        return <>
            <div className={style.tagWrap} ref={tagRef}>
                <div className={style.tag} >
                    {children}
                </div>
            </div>
        </>
}

export default Tag;