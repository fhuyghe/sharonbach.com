import { useParams } from 'next/navigation';
import { useRouter } from 'next/router'
import { useEffect} from 'react'
import ReactMarkdown from 'react-markdown'

import styles from '../assets/scss/Home.module.scss' 
import BackToTop from '../components/BackToTop';
import Projects from '../components/Projects'
import ProjectWrap from '../components/ProjectWrap'
import Tag from '../components/Tag'
import { useGetPageHomeQuery } from "../generated/graphql";


export default function Home() {
  //State Hook
  const router = useRouter()
  const {slug: slugs} = useParams<{slug: string[]}>()

  useEffect(() => {
    //Disable scrolling of body
    const scrollY = document.body.style.top;
    document.body.classList.toggle('project-open', !!router.query.project || false);

    // If the project is closing, rescroll
    if (!router.query.project && scrollY) { 
        document.body.style.top = '';
        window.scroll(0, parseInt(scrollY || "0") * -1);
    }

    // setFeaturedProject(router.query.project)
  }, [router.query])

  
  const { loading, error, data } = useGetPageHomeQuery();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    
  const homeData = data.home.data.attributes

  console.log(slugs)
  return (
    <div className={styles.container}>
      <main className={styles.main}>
          <div className="uk-container">

        {/* Intro */}
        <section id="intro">
            <h1 className={styles.intro}>{homeData.intro}</h1>
            <div className="tags">
              <Tag>Interactivity</Tag>
              <Tag>Packaging</Tag>
              <Tag>Branding</Tag>
              <Tag>Web design</Tag>
            </div>
        </section>

        {/* Projects */}
        <section className={styles.projects}>
            <Projects />
        </section>

        {/* Open Project */}
        {slugs?.length > 0 && <ProjectWrap slug={slugs[0]} />}

        {/* Bottom */}
          <section className={styles.about}>
            <div className="uk-grid uk-child-width-1-2@m">
              <div id="bio">
                <h2 className={styles.title}>About</h2>
                <ReactMarkdown linkTarget="_blank">{homeData.about}</ReactMarkdown>
              </div>
              <div id="clients">
                <h2 className={styles.title}>Clients</h2>
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
