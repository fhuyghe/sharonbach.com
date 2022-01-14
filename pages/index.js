import { useState, useEffect } from 'react'
import styles from '../assets/scss/Home.module.scss'
import ReactMarkdown from 'react-markdown'
import { useQuery, gql } from "@apollo/client";
import { useRouter } from 'next/router'

//components
import ProjectWrap from '../components/project-wrap'
import Projects from '../components/projects'
import Tag from '../components/tag'
import BackToTop from '../components/backToTop';

export default function Home({global}) {
  //State Hook
  const router = useRouter()
  const [featuredProject, setFeaturedProject] = useState(router.query.project);

  useEffect(() => {
    //Disable scrolling of body
    const scrollY = document.body.style.top;
    document.body.classList.toggle('project-open', router.query.project || false);

    // If the project is closing, rescroll
    if (!router.query.project && scrollY) { 
        document.body.style.top = '';
        window.scroll(0, parseInt(scrollY || "0") * -1);
    }

    setFeaturedProject(router.query.project)
  }, [router.query])

  const { loading, error, data } = useQuery(gql`
  query{
    home{
        data { 
        attributes{
            about
            intro
            clients
          }
        }
      }
    }
    `);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
  const home = data.home.data ? data.home.data.attributes : {};


  return (
    <div className={styles.container}>
      <main className={styles.main}>

        {/* Projects */}
        <section id="intro">
          <h1 className={styles.title}>{home.intro}</h1>
          <Tag>Mural</Tag>
          <Tag>Interface</Tag>
          <Tag>Packaging</Tag>
          <Tag>Branding</Tag>
          <Tag>Web design</Tag>
        </section>

        {/* Projects */}
        <section id="bottomSection">
          <div className="uk-container">
            <h2 className={styles.title}>Projects</h2>
            <Projects setFeaturedProject={setFeaturedProject}/>
          </div>
        </section>

        {/* Open Project */}
        {featuredProject && <ProjectWrap slug={featuredProject} />}

        {/* Bottom */}
        <section id="bottomSection">
          <div className="uk-container">
            <div className="uk-grid uk-child-width-1-2@m">
              <div id="bio">
                <h2 className={styles.title}>About</h2>
                <ReactMarkdown>{home.about}</ReactMarkdown>
              </div>
              <div id="clients">
                <h2 className={styles.title}>Clients</h2>
                <ReactMarkdown>{home.clients}</ReactMarkdown>
              </div>
            </div>
          </div>
        </section>
        
        <BackToTop />      

      </main>
    </div>
  )
}
