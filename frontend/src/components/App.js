import React, { Component } from 'react';
import {
  Toolbar, 
  Button,
  Icon,
  IconButton,
  ToolbarTitle, 
  ToolbarRow, 
  ToolbarSection,
  Select
} from 'rmwc';
import {Route, Link, Switch} from 'react-router-dom';

import {getCategories, getPosts} from '../util/api';
import Posts from './directive/Posts';
import Post from './directive/Post';
import logo from '../logo.min.svg';

class App extends Component {

  state = { user: ''}

  componentDidMount(){
    getPosts()
    .then(posts => this.props.setPosts(posts));
    getCategories()
    .then(categories => this.props.setCategories(categories));
  }

  login = (user) => {
    this.setState({user});
  }

  logout = () => {
    const checkout = window.confirm("退出登录");
    if(checkout){
      this.setState({user: ''})
    }
  }

  render() {
    const {
      categories, 
      updatePost,
      setComments,
      match,
      location,
      setPosts,
      updateComment
    } = this.props;
    const {
      //  主题
      topics, 
      // 帖子
      posts,
      // 评论 
      comments
    } = categories;
    const {user} = this.state;
    
    return (<div id="app">
        <Toolbar theme="background">
          <ToolbarRow>
            <IconButton disabled={match.isExact}>
              <Link to="/">
                home
              </Link>
            </IconButton>
            <ToolbarTitle>
              <div className="logo">
                <img alt="Udacity标志" src={logo} />
              </div>
            </ToolbarTitle>

            <ToolbarSection alignEnd>
              {user !== '' && 
              <Button unelevated onClick={this.logout}>
                <Icon className="mdc-button__icon">person</Icon>
                {user}
              </Button>}
              <Select
                onChange={(event) => this.login(event.target.value)}
                placeholder="登录用户"
                value={user}
                options={['thingone','thingtwo']}/>
              {
                topics.map((topic, index) =>
                <Button dense wrap key={topic.name} stroked={location.pathname.includes(topic.path)}>
                  <Link to={`/${topic.path}`}>
                      {topic.name}
                  </Link>
                </Button>)
              }
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <main className="main-container">
          <Switch>
            <Route path="/" exact render={locations => 
                  <Posts {...locations} posts={posts.filter(post => !post.deleted)} user={user}
                  updatePost={updatePost} setPosts={setPosts}/>}/>

            <Route path="/:category" exact render={locations =>
                  <Posts {...locations} posts={posts.filter(post => !post.deleted).filter(post => post.category === locations.match.params.category)} user={user}
                  updatePost={updatePost} setPosts={setPosts}/>}/>

            <Route path="/:category/:post_id" exact render={locations =>{
              const post = posts.find(post => post.id === locations.match.params.post_id);
            return post ? <Post {...locations} 
                user={user} post={post} updatePost={updatePost} updateComment={updateComment}
                comments={comments.filter(comment => !comment.deleted)} setComments={setComments}/> : 
                <div>
                  <h3>404 nomatch</h3>
                  <Link to="/">go home </Link>
                </div>
            }}/>
            <Route path="*" render={_ => 
            <div>
              <h3>404 nomatch</h3>
              <Link to="/">go home </Link>
            </div>}/>
          </Switch>
        </main>
      
  </div>);
  }
}

export default App;
