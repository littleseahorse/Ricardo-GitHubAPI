import React from "react";
import $ from "jquery"; // Using jQuery to make AJAX calls
import { Link } from "react-router";
import PropTypes from "prop-types";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInitialState() {
    return {};
  }

  /*
    This method will be called by React after the first render. Here data is loaded with AJAX.
    This component gets mounted in the DOM as soon as the URL is /user/:username.
  */
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.username !== this.props.params.username) {
      this.fetchData();
    }
  }

  /*
    When fetchData gets called, react-router will pass a `params` prop containing every parameter in the URL.
    Here, it's this.props.params. Since we called our route parameter `username`, it's available under 
    this.props.params.username
    
    We're using it to make an API call to GitHub to fetch the user data for the username in the URL. Once we receive
    the data -- in the callback -- we call `setState` to put the user data in our state. This will trigger a re-render.
    When `render` gets called again, `this.state.user` exists and we get the user info display instead of "LOADING..."
  */
  fetchData() {
    var that = this;

    $.getJSON(
      `https://api.github.com/users/${this.props.params.username}`
    ).then(function (user) {
      that.setState({
        user: user,
      });
    });
  }

  /*
    This method is used as a mapping function.
  */
  renderStat(stat) {
    return (
      <li key={stat.name} className="user-info__stat">
        <Link to={stat.url}>
          <p className="user-info__stat-value">{stat.value}</p>
          <p className="user-info__stat-name">{stat.name}</p>
        </Link>
      </li>
    );
  }

  render() {
    // If the state doesn't have a user key, it means the AJAX didn't complete yet. Simply render a "LOADING..." indicator.
    if (!this.state.user) {
      return <div className="user-page">LOADING...</div>;
    }

    // If we get to this part of `render`, then the user is loaded
    var user = this.state.user;

    // Gather up some number stats about the user, to be used in a map below
    var stats = [
      {
        name: "Public Repos",
        value: user.public_repos,
        url: `/user/${this.props.params.username}/repos`,
      },
    ];

    return (
      <div className="user-page">
        <div className="user-info">
          <div className="user-info__text">
            <img className="user-info__avatar" src={user.avatar_url} />
            <h2 className="user-info__title">
              {user.login} ({user.name})
            </h2>
            <p className="user-info__bio">{user.bio}</p>
          </div>

          <ul className="user-info__stats">{stats.map(this.renderStat)}</ul>
        </div>
        <div className="user-extra">{this.props.children}</div>
      </div>
    );
  }
}

User.propTypes = {
  // PropTypes.shape is like PropTypes.object but lets to define what's expected to be inside the object
  params: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

export default User;
