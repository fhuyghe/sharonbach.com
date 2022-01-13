import React from "react"
import style from "../assets/scss/Project.module.scss"
import ReactMarkdown from 'react-markdown'
import Seo from "./seo";
import Image from "./image";

const Project = ({project, isLeaving}) => {

  const categories = project.attributes.categories;

  const seo = {
    metaTitle: project.attributes.title,
    metaDescription: project.description,
    shareImage: project.image,
    project: true,
  };

  return (
    <div className={isLeaving ? style.projectBlockLeaving : style.projectBlock}>
        <Seo seo={seo} />
        <div className={style.projectWrap}>
          <div className="uk-container"> 
            {categories &&
              <div id="categories">
                {categories.data.map((cat) => {
                  return <div key={cat.id} className={style.projectCategory}>{cat.attributes.name}</div>
                })}
              </div>
            }
          <h1 className={style.title}>{project.attributes.title}</h1>
          <p className={style.intro}>{project.attributes.intro}</p>
        {project.attributes.Content.map((section) => { 
          //Gallery of Images
          if (section.__typename == 'ComponentContentBlockImages') return <section className="gallery">
            <div className="uk-grid uk-child-width-1-2@m">
              {section.images.data.map((image) => { return <div key={image.id}><Image image={image} /></div>})}
              </div>
          </section>
          
          // Single Image
          if (section.__typename == 'ComponentContentBlockImage') return <section className="image">
            <Image image={section.image} />
          </section>
          
          // TEXT
          if (section.__typename == 'ComponentContentBlockText') return <section className="text">
            <ReactMarkdown>{section.text}</ReactMarkdown>
          </section>
        })}
      </div>
    </div>
  </div>
  );
};

export default Project;
