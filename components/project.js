import React from "react";
import { useQuery, gql } from "@apollo/client";
import style from "../assets/scss/Project.module.scss"
import Seo from "./seo";
import { useRouter } from 'next/router'

const closeProject = (router) => {
  console.log('close project')
  router.push('/', '')
}

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
              }
          }
      }
  }
  `, { variables: { slug: props.slug } });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( { console.log(error) }</p>;
  
  const project = data.projects.data[0];

  if (!project) return '';

  //Close Project
  

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
        <h1>{project.attributes.title}</h1>
        <p>{project.attributes.blurb}</p>
    </div>
      <div className={style.projectBackground} onClick={()=>closeProject(router)}></div>
      </div>
  );
};

export default Project;
