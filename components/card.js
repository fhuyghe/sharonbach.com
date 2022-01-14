import React from "react";
import { useRouter } from 'next/router'
import styles from '../assets/scss/Card.module.scss'
import Image from "./image";

const Card = (props)=>{
    
  const router = useRouter()
  let project = props.project;
  
  const openProject = (project) => {
    document.body.style.top = `-${window.scrollY}px`;
    router.push(project.attributes.slug && `?project=${project.attributes.slug}`)
  }

    return (
      <div className="project-card" onClick={() => openProject(project)}>
        <a className="uk-link-reset">
          <div className="uk-card uk-card-muted">
            <div className="uk-card-media-top"><Image image={project.attributes.featuredImage} /></div>
          </div>
          <div className="caption">
            <h3 className={styles.projectTitle}>{project.attributes.title}</h3>
            <div className={styles.projectBlurb}>{project.attributes.blurb}</div>
          </div>
        </a>
      </div>
    )
};

export default Card;