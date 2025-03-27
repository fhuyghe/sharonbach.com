import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown'

import styles from '../assets/scss/Home.module.scss' 
import BackToTop from '../components/BackToTop';
import Projects from '../components/Projects'
import ProjectWrap from '../components/ProjectWrap'
import Tag from '../components/Tag'
import { useGetPageHomeQuery } from "../generated/graphql";


export default function Home() {
  const {slug: slugs} = useParams<{slug: string[]}>()
  
  const { loading, error, data } = useGetPageHomeQuery();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    
  const homeData = data.home.data.attributes
  const currentSlug = (slugs ?? [])[0]

  return (
    <div className={styles.container}>
      <main className={styles.main}>
          <div className="p-5 max-w-xxl">

        <section id="intro">
            <h1 className={styles.intro}>{homeData.intro}</h1>
            <div className="tags">
              <Tag>Interactivity</Tag>
              <Tag>Packaging</Tag>
              <Tag>Branding</Tag>
              <Tag>Web design</Tag>
            </div>
        </section>

        <Projects />

        {/* Open Project */}
        <ProjectWrap slug={currentSlug} />

        {/* Bottom */}
          <section className={styles.about}>
            <div className="uk-grid uk-child-width-1-2@m">
              <div id="bio">
                <h2 className="text-2xl lg:text-5xl mt-10">About</h2>
                <ReactMarkdown linkTarget="_blank">{homeData.about}</ReactMarkdown>
              </div>
              <div id="clients">
                <h2 className="text-2xl lg:text-5xl mt-10">Clients</h2>
                <ReactMarkdown linkTarget="_blank">{homeData.clients}</ReactMarkdown>
              </div>
            </div>
        </section>

        <BackToTop />      
      </div>
      </main>
    </div>
  )
}
