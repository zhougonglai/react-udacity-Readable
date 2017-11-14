import React, {Component} from 'react';
import {
  List,
  ListItem,
  Icon,
  ListItemText,
  ListItemTextSecondary,
  ListItemStartDetail,
  ListItemEndDetail,
  Elevation,
  IconButton
} from 'rmwc';
import {Route, Link} from 'react-router-dom';

import Comments from './Comments';
import './main.css';

class Main extends Component {
  state = {
    active: -1
  }

  handleClick = (active) => {
    this.setState({active});
  }

  render() {
    const {posts} = this.props;
    return (
      <div className="container">
        <Elevation z={1}>
          <Route children={({match, location, history}) => {
            // console.log(match, location, history);
            return (<List twoLine avatarList>
              {
                posts.map((post, index) => 
                <ListItem key={post.id}>
                  <ListItemStartDetail>
                    <Icon title={post.author}>account_circle</Icon>
                  </ListItemStartDetail>
                  <div className="item__score">
                    {post.voteScore}
                  </div>
                  <ListItemText>
                  <Link to={`/post`} replace onClick={()=>this.handleClick(index)}>
                    {post.title}
                  </Link>
                    <ListItemTextSecondary>
                      {post.body}
                    </ListItemTextSecondary>
                  </ListItemText>
                  <ListItemEndDetail>
                    <div>
                      <IconButton style={{marginLeft:0,marginRight:0}}>remove</IconButton>
                    </div>
                  </ListItemEndDetail>
                </ListItem>)
              }
            </List>)}} />
        </Elevation>

        <Route path="/post" render={location =>
        <Comments {...location}
          post={this.state.active >= 0 ? this.props.posts[this.state.active] : {}}
          comments={this.props.comments}
          etComments={this.props.setComments}/>} />
      </div>);
  }
}

export default Main;