import React from "react";
import { useQuery, gql } from "@apollo/client";
import style from "../assets/scss/Project.module.scss"
import ReactMarkdown from 'react-markdown'
import Seo from "./seo";
import Image from "./image";
import { useRouter } from 'next/router'

const Project = (props) => {

  const router = useRouter()
  const { loading, error, data } = useQuery(gql`
  query Project($slug: String) {
    projects(filters: { slug: { eq: $slug }}){
        data {
            attributes {
                slug
                title
                blurb
                categories{
                  data{
                    id
                    attributes{
                      name
                    }
                  }
                }
              Content{
                __typename
                  ... on ComponentContentBlockText{
                    text
                }
                ... on ComponentContentBlockImage{
                  image{
                    data{
                      id
                      attributes{
                        url
                        width
                        height
                        caption
                        name
                      }
                    }
                  }
                }
                ... on ComponentContentBlockImages{
                  columns
                  images{
                    data{
                      id
                      attributes{
                        url
                        width
                        height
                        caption
                        name
                      }
                    }
                  }
                }
              }
            }
        }
    }
}
  `, { variables: { slug: props.slug } });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( { console.log(error) }</p>;
  
  const project = data.projects.data[0];
  if (!project) return ''
  const categories = project.attributes.categories;
  console.log(categories)

  //Close Project
  const closeProject = (router) => { 
    document.body.classList.remove('project-open');
    router.push('/', '')
  }

  const seo = {
    metaTitle: project.attributes.title,
    metaDescription: project.description,
    shareImage: project.image,
    project: true,
  };


  return (
    <div>
      <Seo seo={seo} />
      <div className={style.projectBlock}>
        <div className={style.projectWrap}>
          <div className="uk-container">
            {categories &&
              <div id="categories">
                {categories.data.map((cat) => {
                  return <div key={cat.id} className={style.projectCategory}>{cat.attributes.name}</div>
                })}
              </div>
            }
        <h1>{project.attributes.title}</h1>
        <p>{project.attributes.blurb}</p>
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
      <div className={style.projectBackground} onClick={()=>closeProject(router)}></div>
      </div>
  );
};

export default Project;
