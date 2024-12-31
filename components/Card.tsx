import { useRouter } from 'next/router';
import React from 'react';

import styles from '../assets/scss/Card.module.scss';
import { ProjectEntity } from '../generated/graphql';
import Image from './Image';

interface Props {
  project: ProjectEntity;
}

const Card = ({project}: Props) => {
  const router = useRouter();
  const openProject = (project) => router.push(project.attributes.slug);

  return (
    <div className={styles.projectCard} onClick={() => openProject(project)}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <Image
              image={project.attributes.featuredImage.data.attributes}
              alt="Project image"
            />
          </div>
        </div>
        <div className="caption">
          <h3 className={styles.projectTitle}>{project.attributes.title}</h3>
          <div className={styles.projectBlurb}>{project.attributes.blurb}</div>
        </div>
      </a>
    </div>
  );
};

export default Card;
