import React, { Component } from 'react';
import {Toolbar, Button, ToolbarTitle, ToolbarRow, ToolbarSection, IconToggle} from 'rmwc';

import {getCategories, getCategoryPosts} from '../util/api';
import logo from '../logo.min.svg';
import './app.css';

class App extends Component {

  componentDidMount(){
    getCategories()
    .then(categories => this.props.getCategories(categories))
    .then(action => {
      getCategoryPosts(action.payload[this.props.categories.active].path)
      .then(data => {
        console.log(data);
      })
    });

  }

  render() {
    const {categories} = this.props;
    const {topics, posts, active} = categories;
    return (
      <div className="App">
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
              {topics.map((topic, index) => <Button key={topic.name} dense stroked={active === index}>{topic.name}</Button>)}
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </div>
    );
  }
}

export default App;
