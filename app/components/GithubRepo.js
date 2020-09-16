import React from "react";
import PropTypes from "prop-types";

class GithubRepo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var url = this.props.repo.html_url;
    var name = this.props.repo.full_name;
    var stars = this.props.repo.stargazers_count;

    return (
      <a target="_blank" className="github-repotag" href={url}>
        {name}
        <span className="github-repotag__stars">{stars} ★</span>
      </a>
    );
  }
}

GithubRepo.propTypes = {
  repo: PropTypes.shape({
    stargazers_count: PropTypes.number.isRequired,
    html_url: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
  }),
};

export default GithubRepo;
