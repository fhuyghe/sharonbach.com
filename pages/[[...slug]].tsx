import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import styles from '../assets/scss/Home.module.scss';
import BackToTop from '../components/BackToTop';
import Projects from '../components/Projects';
import ProjectWrap from '../components/ProjectWrap';
import Tag from '../components/Tag';
import {
  ProjectRelationResponseCollection,
  useGetPageHomeQuery,
} from '../generated/graphql';

export default function Home() {
  const { slug: slugs } = useParams<{ slug: string[] }>();

  const { loading, error, data } = useGetPageHomeQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const homeData = data.home.data.attributes;
  const currentSlug = (slugs ?? [])[0];

  const tagsString = homeData.tags ?? '';
  const tags = tagsString.split(',').map((tag) => tag.trim());

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="p-5 max-w-xxl">
          <section id="intro">
            <h1 className={styles.intro}>{homeData.intro}</h1>
            <div className="tags">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </section>

          <Projects
            projectsData={
              homeData.projects as ProjectRelationResponseCollection
            }
          />

          {/* Open Project */}
          <ProjectWrap slug={currentSlug} />

          {/* Bottom */}
          <section className={styles.about}>
            <div className="uk-grid uk-child-width-1-2@m">
              <div id="bio">
                <h2 className="text-2xl lg:text-5xl mt-10">About</h2>
                <ReactMarkdown>{homeData.about}</ReactMarkdown>
              </div>
              <div id="clients">
                <h2 className="text-2xl lg:text-5xl mt-10">Clients</h2>
                <ReactMarkdown>{homeData.clients}</ReactMarkdown>
              </div>
            </div>
          </section>

          <BackToTop />
        </div>
      </main>
    </div>
  );
}
