import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { client } from './config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

let unsubscribeSubject = new Subject();

class ArticleView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      article: null
    };
  }
   
  fetchArticle(slug) {
    client.items()
      .equalsFilter('elements.url_pattern', slug)
      .depthParameter(1)
      .toObservable()
      // unsubscribe when unsubscribeSubject fires
      .pipe(takeUntil(unsubscribeSubject))
      .subscribe((response) => {
        console.log(response);
        this.setState({
          loaded: true,
          article: response.items[0]
        });
      });
  }

  unsubscribe() {
    unsubscribeSubject.next();
    unsubscribeSubject.complete();
  }
  
  componentDidMount() {
    let slug = this.props.match.params.slug;
    this.fetchArticle(slug);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

 render = (props) => {
    if (this.state.loaded) {
      const article = this.state.article;
      const title = article.title.value;
      const bodyCopy = article.body_copy;

      return (
        <div>
          <Link to="/">Home</Link>
          <h1>{title}</h1>
          <div className="article_body"
            dangerouslySetInnerHTML={{ __html: bodyCopy.resolveHtml() }} />
        </div>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }
}

export default ArticleView;