import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import closeIcon from '../assets/images/icon-exit.svg';
import style from '../assets/scss/Project.module.scss';
import { Project as TProject, useGetProjectQuery } from '../generated/graphql';
import Project from './Project';

const ProjectWrap = ({ slug }: { slug?: string }) => {
  const router = useRouter();
  // States
  const [leaving, setLeaving] = useState(false);

  const { loading, error, data } = useGetProjectQuery({ variables: { slug } });

  useEffect(() => {
    if (loading || (data?.projects?.data ?? []).length > 0) return;
    router.push('/', '', { shallow: true });
  }, [data, loading, router, slug]);

  if (!slug) return null;
  if (loading) return null;
  if (error) return null;

  const project = data.projects.data[0];

  const closeProject = () => {
    setLeaving(true);
    setTimeout(() => {
      setLeaving(false);
      router.push('/', '', { shallow: true });
    }, 500);
  };

  const closeButtonStyles = leaving
    ? style.projectBackgroundLeaving
    : style.projectBackground;

  return (
    <div>
      {project && (
        <Project project={project.attributes as TProject} isLeaving={leaving} />
      )}
      <div
        className={leaving ? style.projectCloseLeaving : style.projectClose}
        onClick={closeProject}
      >
        <Image src={closeIcon} width="50" height="50" alt="Close icon" />
      </div>
      <div className={closeButtonStyles} onClick={closeProject} />
    </div>
  );
};

export default ProjectWrap;
