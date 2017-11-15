import React, {Component} from 'react';
import {
  List,
  ListItem,
  Icon,
  Button,
  IconButton,
  ListGroup,
  ListGroupSubheader,
  ListItemText,
  ListItemTextSecondary,
  ListItemStartDetail,
  ListItemEndDetail,
  Elevation,
  Typography
} from 'rmwc';

import {votingPost} from '../../util/api';

import Comments from './Comments';

class Main extends Component {
  votePost = (post, vote) => {
    votingPost(post.id, vote)
    .then(post => this.props.updatePost(post))
  }

  render() {
    const {posts, comments, select, active, sortBy, user, toggleSortBy} = this.props;
    const filterTopics = active === "" ? posts : posts.filter(post => post.category === active);
    const activeTopics = filterTopics.sort((prev, next) => next[sortBy] - prev[sortBy]);
    
    return (
      <div className="container">
        <div className="tool-contrl">
          <Typography use="headline" tag="h3" theme="primary">
            帖子
          </Typography>
          <Typography use="caption">
              sortBy: {sortBy}
          </Typography>
          <div className="btn-group">  
            <IconButton
              onClick={() => toggleSortBy('voteScore')} 
              className={sortBy !== 'voteScore' && 'mdc-dark'}>
              {sortBy === 'voteScore' ? 'line_weight' : 'reorder'}
            </IconButton>
            <IconButton 
              onClick={() => toggleSortBy('timestamp')}
              className={sortBy !== 'timestamp' && 'mdc-dark'}>
              {sortBy === 'timestamp' ? 'restore' : 'schedule'}
            </IconButton>
          </div>
          <Button raised>发帖</Button>
        </div>
        <Elevation z={1}>
          <ListGroup>
          {active && <ListGroupSubheader>{active}</ListGroupSubheader>}
          <List twoLine avatarList>
              {
                activeTopics.length > 0 ?
                activeTopics.map((post, index) =>
                <ListItem key={post.id}
                temporaryDrawerSelected={post === select}>
                  <ListItemStartDetail>
                    <Icon title={post.author}>account_circle</Icon>
                  </ListItemStartDetail>
                  <div className="item__score">
                    {post.voteScore}
                  </div>
                  <ListItemText onClick={()=>this.props.selectPost(post)}>
                    {post.title}
                    <ListItemTextSecondary>
                      {post.body}
                    </ListItemTextSecondary>
                  </ListItemText>
                  <ListItemEndDetail>
                    {
                      user === post.author ?(
                        <div className="item-ctrls">
                          <Icon title="编辑" aria-label="编辑">edit</Icon>
                          <Icon title="删除" aria-label="删除">delete</Icon>
                        </div>
                      ):(
                        <div className="item-ctrls">
                          <Icon title="upVote" aria-label="加分" onClick={() => this.votePost(post, 'upVote')}>add</Icon>
                          <Icon title="downVote" aria-label="扣分" onClick={() => this.votePost(post, 'downVote')}>remove</Icon>
                        </div>
                      )
                    }
                  </ListItemEndDetail>
                </ListItem>):
                <ListItem>
                  <ListItemText>
                    没有该主题的帖子
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