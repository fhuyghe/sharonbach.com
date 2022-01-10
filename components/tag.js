import React from "react";
import style from "../assets/scss/Tag.module.scss"

class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.tagRef = React.createRef();
    }
    
    animateTags() { 
        let tagEl = this.tagRef.current;
        if (tagEl) { 
        //     // x and y are the co-ordinates of the circle
        //     // vx and vy are the respective speeds
        let tagWidth = tagEl.offsetWidth;
            let tagHeight = tagEl.offsetHeight;
            console.log(tagEl, tagWidth)
 
        var x = Math.floor(Math.random() * (window.innerWidth - tagWidth));
        var y = Math.floor(Math.random() * (window.innerHeight - tagHeight));
        var vx = Math.floor(Math.random() * 2) + 1;
        var vy = Math.floor(Math.random() * 2) + 1;

        //Move to their initial position
        tagEl.style.left = x + 'px';
        tagEl.style.top = y + 'px';
 
        move();
        
        let introEl = document.getElementById("intro");
        // introEl.addEventListener('mousemove', move);

        setInterval(move, 34)
           
        //     // This function will do the animation
        function move() {
 
        //         // Conditions sso that the ball bounces
        //         // from the edges
                if (tagWidth + x > window.innerWidth)
                    vx = 0 - vx;
 
                if (x < 0)
                    vx = 0 - vx;
 
                if (y + tagHeight > window.innerHeight)
                    vy = 0 - vy;
 
                if (y < 0)
                    vy = 0 - vy;
 
                    x = x + vx;
                    y = y + vy;
                    
                tagEl.style.left = x + 'px';
                tagEl.style.top = y + 'px';
            }
        }
    }

    render() { 
        return <>
            <div className={style.tagWrap} ref={this.tagRef}>
                <div className={style.tag} >
                    {this.props.children}
                </div>
            </div>
        </>
    }
}

export default Tag;