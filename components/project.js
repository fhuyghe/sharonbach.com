import React from "react";
import { useQuery, gql } from "@apollo/client";
import style from "../assets/scss/Project.module.scss"

const Project = (props) => {
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

const seo = {
  metaTitle: project.attributes.Name,
  metaDescription: project.description,
  shareImage: project.image,
  project: true,
};

return (
  <div className={style.projectBlock}>
      <h1>{project.attributes.title}</h1>
      <p>{project.attributes.blurb}</p>
    </div>
  );
};

export default Project;
