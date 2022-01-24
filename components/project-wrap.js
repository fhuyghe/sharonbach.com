import React, {useState} from "react";
import style from "../assets/scss/Project.module.scss"
import Project from "./project";
import { useRouter } from 'next/router'
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import closeIcon from "../assets/images/icon-exit.svg"

const ProjectWrap = (props) => {
  const router = useRouter()
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
                    id
                    text
                }
                ... on ComponentContentBlockImage{
                  id
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
                  id
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
  if (loading) return '';
  if (error) return '';

  
  const project = data.projects.data[0];
  
  
  //Close Project
  const closeProject = () => {
    setLeaving(true)
    setTimeout(() => { 
      router.push('/', '')
    }, 500)
  }

  return (
    <div>
      {project && <Project project={project} isLeaving={leaving} />}
      <div className={leaving? style.projectCloseLeaving : style.projectClose} onClick={closeProject}>
        <Image
          src={closeIcon}
          width="50"
          height="50"
          ></Image>
        </div>
      <div className={leaving? style.projectBackgroundLeaving : style.projectBackground} onClick={closeProject}></div>
    </div>
  );
};

export default ProjectWrap;
