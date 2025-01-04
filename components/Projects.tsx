import React from "react";

import { ProjectEntity, useGetProjectsQuery } from "../generated/graphql";
import Card from "./Card";


const Projects = () => {
  const { loading, error, data } = useGetProjectsQuery()
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
    
  const projects = data.projects.data;

return (
      <section className="lg:columns-2 gap-5 items-start">
        {projects.map((project) => (<Card
              project={project as ProjectEntity}
              key={project.id}
            />)
        )}
      </section>
  );
};

export default Projects;
