import React, { Component } from 'react';
import {Toolbar, ToolbarTitle, ToolbarRow, ToolbarSection, IconToggle} from 'rmwc';
import './app.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar>
          <ToolbarRow>
            <IconToggle 
              on={{label: 'close', content: 'close', cssClass:'md-black'}}
              off={{label: 'menu', content: 'menu', cssClass:'md-white'}}/>
            <ToolbarTitle>
              <div className="logo">
                <img alt="Udacity标志" src="https://s3-us-west-1.amazonaws.com/udacity-content/rebrand/svg/logo.min.svg" />
              </div>
            </ToolbarTitle>
            <ToolbarSection alignEnd={true}>
              asfasfas
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </div>
    );
  }
}

export default App;
