import React from "react";
import Card from "./card";
import { useQuery, gql } from "@apollo/client";

const Projects = () => {
const { loading, error, data } = useQuery(gql`
    query Projects {
        projects{
            data { 
                id
                attributes {
                    createdAt
                    title
                    blurb
                    slug
                    featuredImage{
                        data{
                            attributes{
                                url
                                width
                                height
                                alternativeText
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`);
if (loading) return <p>Loading...</p>;
if (error) { 
    console.log(error, data)
    return <p>Error :(</p>;
}
    
const projects = data.projects.data;

return (
    <div>
          <div className="uk-child-width-1-2@m uk-grid-match uk-grid-medium" data-uk-grid uk-grid="masonry: true">
            {projects.map((update, i) => {
              return (
                <Card
                  project={update}
                  key={update.id}
                />
              );
            })}
          </div>
    </div>
  );
};

export default Projects;
