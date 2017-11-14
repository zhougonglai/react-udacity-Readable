import React, {Component} from 'react';
import {
  List,
  ListItem,
  Icon,
  ListGroup,
  ListGroupSubheader,
  ListItemText,
  ListItemTextSecondary,
  ListItemStartDetail,
  ListItemEndDetail,
  Elevation
} from 'rmwc';

import Comments from './Comments';
import './main.css';

class Main extends Component {
  removePost(post){
    
  }

  render() {
    const {posts, comments, select, active} = this.props;
    const activeTopics = active === "" ? posts : posts.filter(post => post.category === active);
    
    return (
      <div className="container">
        <Elevation z={1}>
          <ListGroup>
          {active && <ListGroupSubheader>{active}</ListGroupSubheader>}
          <List twoLine avatarList>
              {
                activeTopics.length > 0 ?
                activeTopics.map((post, index) =>
                <ListItem key={post.id}
                temporaryDrawerSelected={index === select}>
                  <ListItemStartDetail>
                    <Icon title={post.author}>account_circle</Icon>
                  </ListItemStartDetail>
                  <div className="item__score">
                    {post.voteScore}
                  </div>
                  <ListItemText onClick={()=>this.props.selectPost(index)}>
                    {post.title}
                    <ListItemTextSecondary>
                      {post.body}
                    </ListItemTextSecondary>
                  </ListItemText>
                  <ListItemEndDetail>
                    {/* <div>
                      <IconButton style={{marginLeft:0,marginRight:0}}>remove</IconButton>
                    </div> */}
                    <Icon onClick={() =>this.removePost(post)}>remove</Icon>
                  </ListItemEndDetail>
                </ListItem>):
                <ListItem>
                  <ListItemText>
                    空的帖子
                  </ListItemText>
                </ListItem>
              }
            </List>
          </ListGroup>
        </Elevation>
        <Comments comments={comments}/>
      </div>);
  }
}

export default Main;