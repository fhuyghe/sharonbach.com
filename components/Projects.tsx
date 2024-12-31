import React from "react";

import { ProjectEntity, useGetProjectsQuery } from "../generated/graphql";
import Card from "./Card";


const Projects = () => {
  const { loading, error, data } = useGetProjectsQuery()
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
    
  const projects = data.projects.data;

return (
    <div>
          <div className="uk-child-width-1-2@m uk-grid-match uk-grid-medium" data-uk-grid uk-grid="masonry: true">
            {projects.map((project) => {
              return (
                <Card
                  project={project as ProjectEntity}
                  key={project.id}
                />
              );
            })}
          </div>
    </div>
  );
};

export default Projects;
