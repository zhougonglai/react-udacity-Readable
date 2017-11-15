import React, { Component } from 'react';
import {
  Toolbar, 
  Button,
  Icon,
  ToolbarTitle, 
  ToolbarRow, 
  ToolbarSection, 
  IconToggle,
  Select
} from 'rmwc';
import {Route} from 'react-router-dom';

import {getCategories, getPosts, getComments} from '../util/api';
import Main from './directive/Main';
import logo from '../logo.min.svg';

class App extends Component {

  state ={
    user: '',
    active: '',
    select: 0,
    sortBy: 'voteScore'
  }

  componentDidMount(){
    getPosts()
    .then(posts => this.props.setPosts(posts))
    .then(action => this.selectPostByIndex(0));
    getCategories()
    .then(categories => this.props.setCategories(categories));
  }

  handleActive = (active) => {
    if(active === this.state.active){
      this.setState({active: ''},() =>{
        this.selectPostByIndex(0);
      });
    }else{
      this.setState({active}, () => {
        this.selectPostByCategory(active);
      });
    }
  }

  selectPost = (post) => {
    this.setState({select: post},()=>{
      getComments(post.id)
      .then(comments => this.props.setComments(comments));
    });
  }

  /**
   * posts 下标
   * @param {int} select 
   */
  selectPostByIndex = (select) => {
    this.setState((prevState,props) => ({
      select: props.categories.posts[select] || []
    }),() => {
      if(this.state.select.length > 0){
        getComments(this.state.select.id)
        .then(comments => this.props.setComments(comments));
      }else{
        this.props.setComments([]);
      }
    })
  }

  /**
   * category 类型
   * @param {enum} category 
   */
  selectPostByCategory = (category) => {
    this.setState((prevState, props)=>({
        select: props.categories.posts.find(post => post.category === category) || []
    }),()=>{
      if(this.state.select.length > 0){
        getComments(this.state.select.id)
        .then(comments => this.props.setComments(comments));
      } else {
        this.props.setComments([]);
      }
    })
  }

  toggleSortBy = (sortBy) => {
    this.setState(prevState => {
      return {
        sortBy: prevState.sortBy === sortBy ? (
          sortBy === 'voteScore' ? 'timestamp' : 'voteScore'
        ) : sortBy
      }
    },() => {
      this.selectPost(0);
    });
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
    const {categories, updatePost} = this.props;
    const {topics, posts, comments} = categories;
    const {user, active, select, sortBy} = this.state;
    
    return (
      <Route children={({match, location, history}) => {
      return (<div id="app">
        <Toolbar theme="background">
          <ToolbarRow>
            <IconToggle 
              on={{label: 'close Menu', content: 'close'}} off={{label: 'Open Menu', content: 'menu'}}/>
            <ToolbarTitle>
              <div className="logo">
                <img alt="Udacity标志" src={logo} />
              </div>
            </ToolbarTitle>

            <ToolbarSection alignEnd={true}>
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
                <Button key={topic.name} dense stroked={active === topic.path} onClick={() => this.handleActive(topic.path)}>
                  {topic.name}
                </Button>)
              }
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <main className="main-container">
          <Main 
          sortBy={sortBy} toggleSortBy={this.toggleSortBy} updatePost={updatePost}
          select={select} active={active} posts={posts} 
          comments={comments} user={user}
          selectPost={this.selectPost}/>
        </main>
      </div>)}} />
    );
  }
}

export default App;
