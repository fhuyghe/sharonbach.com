import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import {
  ProjectEntity,
  ProjectRelationResponseCollection,
} from '../generated/graphql';

import Card from './Card';

interface Props {
  projectsData: ProjectRelationResponseCollection;
}

const Projects = ({ projectsData }: Props) => {
  const projects = projectsData?.data ?? [];

  return (
    <div className="mt-10">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 900: 2 }}
        gutterBreakpoints={{ 350: '12px', 900: '25px' }}
      >
        <Masonry gutter={25}>
          {projects.map((project, index) => (
            <Card
              project={project as ProjectEntity}
              className={index === 1 ? 'md:pt-20' : ''}
              key={project.id}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Projects;
