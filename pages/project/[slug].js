import React from "react";
import { fetchAPI } from "../../lib/api";
import Image from "../../components/image";
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";
import { useQuery, gql } from "@apollo/client";

const Project = ({ params }) => {
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
    `, { variables: { slug: params.slug } });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( { console.log(error) }</p>;
    
  const project = data.projects.data[0];
  
  if (!project) return '';
    
  const imageUrl = getStrapiMedia(project.image);

  const seo = {
    metaTitle: project.attributes.Name,
    metaDescription: project.description,
    shareImage: project.image,
    project: true,
  };

    return (
      <div>
      {/* <Seo seo={seo} /> */}
      <div
        id="banner"
        className="uk-flex uk-flex-center uk-flex-middle uk-padding uk-margin"
      >
      </div>
          <div className="uk-section">
        <div className="uk-container uk-container-small">
        <h1>{project.attributes.title}</h1>
        <p>{project.attributes.blurb}</p>
              
              </div>
        </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
          </div>
        </div>
            </div>
    </div>
  );
};

export async function getStaticPaths() {
  const projects = await fetchAPI("/api/projects?populate=*");
  return {
      paths: projects.data ? projects.data.map((project) => ({
          params: {
              slug: project.attributes.slug,
            },
        })) : [],
        fallback: false,
    };
}

export async function getStaticProps({ params }) {

  return {
    props: {params},
    revalidate: 1,
  };
}

export default Project;