import React from "react";
import Image from "./image";
import Project from "./project"

class Card extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      openProject: false
    };
  }

  render() {
    let project = this.props.project;

    return (
      <div className="project-card" onClick={() => this.props.setFeaturedProject(project.attributes.slug)}>
        <a className="uk-link-reset">
          <div className="uk-card uk-card-muted">
            <div className="uk-card-media-top"><Image image={project.attributes.featuredImage} /></div>
          </div>
          <div className="caption">
            <h3 className="title">{project.attributes.title}</h3>
            <div className="blurb">{project.attributes.blurb}</div>
          </div>
        </a>
      </div>
    )
  }
};

export default Card;