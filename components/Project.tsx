import React from 'react';
import ReactMarkdown from 'react-markdown';

import styles from '../assets/scss/Project.module.scss';
import type { Project as TProject } from '../generated/graphql';
import Image from './Image';
import Seo from './Seo';

interface Props {
  project: TProject;
  isLeaving: boolean;
}

const Project = ({ project, isLeaving }: Props) => {
  const categories = project.categories;

  const seo = {
    metaTitle: project.title,
    metaDescription: project.intro,
    shareImage: project.featuredImage,
    project: true,
  };

  return (
    <div
      className={isLeaving ? styles.projectBlockLeaving : styles.projectBlock}
    >
      <Seo metadata={seo} />
      <div className={styles.projectWrap}>
        <div className="uk-container">
          {categories && (
            <div id="categories">
              {categories.data.map((cat) => {
                return (
                  <div key={cat.id} className={styles.projectCategory}>
                    {cat.attributes.name}
                  </div>
                );
              })}
            </div>
          )}
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.intro}>{project.intro}</p>
          {project.Content.map((section) => {
            //Gallery of Images
            if (section.__typename == 'ComponentContentBlockImages')
              return (
                <section
                  key={`gallery-${section.id}`}
                  className={styles.gallerySection}
                >
                  <div
                    className={
                      section.columns == 'three'
                        ? 'uk-grid uk-child-width-1-3@m'
                        : section.columns == 'two'
                          ? 'uk-grid uk-child-width-1-2@m'
                          : ''
                    }
                  >
                    {section.images.data.map((image) => {
                      return (
                        <div key={image.id} className={styles.galleryColumn}>
                          <Image image={image.attributes} alt="project image" />
                        </div>
                      );
                    })}
                  </div>
                </section>
              );

            // Single Image
            if (section.__typename == 'ComponentContentBlockImage')
              return (
                <section
                  key={`image-${section.id}`}
                  className={styles.imageSection}
                >
                  <Image image={section.image.data.attributes} alt="project image" />
                </section>
              );

            // TEXT
            if (section.__typename == 'ComponentContentBlockText')
              return (
                <section
                  key={`text-${section.id}`}
                  className={styles.textSection}
                >
                  <ReactMarkdown linkTarget="_blank">
                    {section.text}
                  </ReactMarkdown>
                </section>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default Project;
