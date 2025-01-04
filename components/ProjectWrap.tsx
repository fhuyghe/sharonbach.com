import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import closeIcon from '../assets/images/icon-exit.svg';
import style from '../assets/scss/Project.module.scss';
import { Project as TProject, useGetProjectQuery } from '../generated/graphql';
import Project from './Project';

const ProjectWrap = ({slug}: {slug: string}) => {
  const router = useRouter();
  // States
  const [leaving, setLeaving] = useState(false);
  
  const { loading, error, data } = useGetProjectQuery(
    { variables: { slug } },
  );
  if (loading) return null;
  if (error) return null;

  const project = data.projects.data[0];

  const closeProject = () => {
    setLeaving(true);
    setTimeout(() => {
      setLeaving(false);
      router.push('/', '', {shallow: true});
    }, 500);
  };

  return (
    <div>
      {project && <Project project={project.attributes as TProject} isLeaving={leaving} />}
      <div
        className={leaving ? style.projectCloseLeaving : style.projectClose}
        onClick={closeProject}
      >
        <Image src={closeIcon} width="50" height="50" alt="Close icon" />
      </div>
      <div
        className={
          leaving ? style.projectBackgroundLeaving : style.projectBackground
        }
        onClick={closeProject}
      ></div>
    </div>
  );
};

export default ProjectWrap;
