import { useRouter } from 'next/router';
import React from 'react';

import { ProjectEntity } from '../generated/graphql';
import { StrapiImage } from './StrapiImage';

interface Props {
  project: ProjectEntity;
}

const Card = ({project}: Props) => {
  const router = useRouter();
  const openProject = (project) => router.push(project.attributes.slug, undefined, {shallow: true});

  return (
    <button className="p-0 text-left mt-20 flex flex-col gap-2" onClick={() => openProject(project)}>
      <StrapiImage
        image={project.attributes.featuredImage.data.attributes}
      />
      <div>
        <h3 className="text-xl lg:text-2xl mb-0 font-serif">{project.attributes.title}</h3>
        <p className="text-md lg:text-xl">{project.attributes.blurb}</p>
      </div>
    </button>
  );
};

export default Card;
