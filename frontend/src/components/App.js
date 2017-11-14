import React, { Component } from 'react';
import {Toolbar, Button, ToolbarTitle, ToolbarRow, ToolbarSection, IconToggle} from 'rmwc';
import {Route} from 'react-router-dom';

import {getCategories, getPosts} from '../util/api';
import Main from './directive/Main';
import logo from '../logo.min.svg';
import './app.css';

class App extends Component {

  state ={
    active: ''
  }

  componentDidMount(){
    getPosts()
    .then(posts => this.props.setPosts(posts));
    getCategories()
    .then(categories => this.props.setCategories(categories));
  }

  handleActive = (active) => {
    if(active === this.state.active){
      this.setState({active: ''});
    }else{
      this.setState({active});
    }
  }

  render() {
    const {categories, setComments} = this.props;
    const {topics, posts, comments} = categories;
    const {active} = this.state;
    const activeTopics = posts.filter(post => post.category === active)

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
          <Main posts={active ? activeTopics : posts} comments={comments} setComments={setComments}/>
        </main>
      </div>)}} />
    );
  }
}

export default App;
