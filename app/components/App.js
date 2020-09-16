import React from "react";

/*
This is the layout component. It's displayed by the top-level Route
this.props.children will correspond to the current URL's component.

If the URL is only "/" then the <IndexRoute/> component will be the child (<Search/> component).
If the URL is "/user/:username" then the <User/> component will be displayed.
*/
class App extends React.Component {
  render() {
    return (
      <div className="main-app">
        <header className="main-header">
          <h1>Public Repositories</h1>
        </header>
        <main className="main-content">{this.props.children}</main>
      </div>
    );
  }
}

export default App;
