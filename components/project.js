import React from "react"
import styles from "../assets/scss/Project.module.scss"
import ReactMarkdown from 'react-markdown'
import Seo from "./seo";
import Image from "./image";

const Project = ({project, isLeaving}) => {

  const categories = project.attributes.categories;

  const seo = {
    metaTitle: project.attributes.title,
    metaDescription: project.attributes.intro,
    shareImage: project.attributes.featuredImage,
    project: true,
  };

  return (
    <div className={isLeaving ? styles.projectBlockLeaving : styles.projectBlock}>
        <Seo metadata={seo} />
        <div className={styles.projectWrap}>
          <div className="uk-container"> 
            {categories &&
              <div id="categories">
                {categories.data.map((cat) => {
                  return <div key={cat.id} className={styles.projectCategory}>{cat.attributes.name}</div>
                })}
              </div>
            }
          <h1 className={styles.title}>{project.attributes.title}</h1>
          <p className={styles.intro}>{project.attributes.intro}</p>
        {project.attributes.Content.map((section) => { 
          //Gallery of Images
          if (section.__typename == 'ComponentContentBlockImages') return <section key={`gallery-${section.id}`} className={styles.gallerySection}>
            <div className="uk-grid uk-child-width-1-2@m">
              {section.images.data.map((image) => { return <div key={image.id}><Image image={image} /></div>})}
              </div>
          </section>
          
          // Single Image
          if (section.__typename == 'ComponentContentBlockImage') return <section key={`image-${section.id}`} className={styles.imageSection}>
            <Image image={section.image} />
          </section>
          
          // TEXT
          if (section.__typename == 'ComponentContentBlockText') return <section key={`text-${section.id}`} className={styles.textSection}>
            <ReactMarkdown>{section.text}</ReactMarkdown>
          </section>
        })}
      </div>
    </div>
  </div>
  );
};

export default Project;
