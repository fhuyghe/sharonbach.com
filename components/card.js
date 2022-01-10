import React from "react";
import Link from "next/link";
import Image from "./image";
//import Moment from "react-moment";

const Card = ({ project }) => {
  const slug = project.attributes.slug;

  return (
    <div className="project-card">
    <Link as={`/project/${slug}`} href={"/project/" + slug}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top"><Image image={project.attributes.featuredImage} /></div>
        </div>
        <div className="caption">
          {/* <Moment format="MMM Do YYYY">{project.attributes.updateDate}</Moment> */}
          <h3 className="title">{project.attributes.title}</h3>
          <div className="blurb">{project.attributes.blurb}</div>
        </div>
      </a>
      </Link>
      </div>
  );
};

export default Card;