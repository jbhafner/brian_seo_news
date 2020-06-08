import React, {Component} from 'react';
import './App.css';

// Import routing dependencies from react-router-dom and out components
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ArticleListing from './ArticleListing';
import ArticleView from './ArticleView';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Brian's First Kentico Kontent Blog
          </h1>
        </header>
        {/* Specifies routes and their components */}
        <Router>
          <div>
            <Route exact path="/" component={ArticleListing} />
            <Route path="/post/:slug" component={ArticleView} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
