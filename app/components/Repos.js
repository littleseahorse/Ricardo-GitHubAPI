var React = require("react");
var $ = require("jquery"); // Using jQuery to make AJAX calls

var GithubRepo = require("./GithubRepo");

var Repos = React.createClass({
  propTypes: {
    // PropTypes.shape is like PropTypes.object but lets to define what's expected to be inside the object
    params: React.PropTypes.shape({
      username: React.PropTypes.string.isRequired,
    }),
  },

  getInitialState: function () {
    return {};
  },

  /*
    This method will be called by React after the first render. Here data is loaded with AJAX.
    This component gets mounted in the DOM as soon as the URL is /user/:username/repos.
    
    When that happens, react-router will pass a `params` prop containing every parameter in the URL, just like
    when we get URL parameters in Express with req.params. Here, it's this.props.params. Since we called our route
    parameter `username`, it's available under this.props.params.username
    
    We're using it to make an API call to GitHub to fetch the user data for the username in the URL. Once we receive
    the data -- in the callback -- we call `setState` to put the user data in our state. This will trigger a re-render.
    When `render` gets called again, `this.state.repos` exists and we get the user info display instead of "LOADING..."
  */
  componentDidMount: function () {
    var that = this;

    $.getJSON(
      `https://api.github.com/users/${this.props.params.username}/repos?sort=updated`
    ).then(function (repos) {
      that.setState({
        repos: repos,
      });
    });
  },

  render: function () {
    // If the state doesn't have a repos key, it means the AJAX didn't complete yet. Simply render a "LOADING..." indicator.
    if (!this.state.repos) {
      return <div className="repos-page">LOADING...</div>;
    }

    return (
      <div className="repos-page">
        <h3>{this.props.params.username}'s repos</h3>
        <ul className="repos-list">
          {this.state.repos.map(function (repo) {
            return (
              <li key={repo.id}>
                <GithubRepo repo={repo} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});

module.exports = Repos;
