import React, {useState} from "react";
import style from "../assets/scss/Project.module.scss"
import Project from "./project";
import { useRouter } from 'next/router'
import { useQuery, gql } from "@apollo/client";

const ProjectWrap = (props) => {
  // States
  const [leaving, setLeaving] = useState();

  const { loading, error, data } = useQuery(gql`
  query Project($slug: String) {
    projects(filters: { slug: { eq: $slug }}){
        data {
            attributes {
                slug
                title
                blurb
                intro
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
  if (error) return 'Error';

  
  const project = data.projects.data[0];
  
  
  //Close Project
  const router = useRouter()
  const closeProject = () => {
    setLeaving(true)
    setTimeout(() => { 
      document.body.classList.remove('project-open');
      router.push('/', '')
    }, 500)
  }

  return (
    <div>
      {project && <Project project={project} isLeaving={leaving}/>}
      <div className={leaving? style.projectBackgroundLeaving : style.projectBackground} onClick={closeProject}></div>
    </div>
  );
};

export default ProjectWrap;
