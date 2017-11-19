import React, { Component } from 'react';
import { 
  Elevation, 
  IconButton,
  List,
  ListItem,
  ListItemStartDetail,
  ListItemText,
  ListItemEndDetail,
  ListItemTextSecondary,
  Icon,
  Button,
  Typography
} from 'rmwc';
import {
  addComment, 
  updateComment, 
  votingComment,
  deleteComment
} from '../../util/api';
import Badge from 'material-ui/Badge';

class Comments extends Component {
  state={
    sortBy: 'voteScore',
  }

  toggleSortBy = sortBy => {
    this.setState(prevState => {
      return {
        sortBy: prevState.sortBy === sortBy ? (
          sortBy === 'voteScore' ? 'timestamp' : 'voteScore'
        ) : sortBy
      }
    });
  }

  sendComment = () =>{
    if(this.props.user){
      const theComment = prompt('评论:', '');
      if(theComment && theComment.trim().length > 9){
       addComment({body: theComment , author: this.props.user, parentId: this.props.match.params.post_id})
       .then(newComment => this.props.setComments(this.props.comments.concat([newComment])))
      } else if(theComment && theComment.trim().length <= 9){
        alert('评论字数需大于 9');
      }
    } else {
      alert('需要先登录');
    }
  }

  updateComment = (commentObj) => {
    const newComment = prompt('修改评论', commentObj.body);
    if(newComment && newComment.trim().length > 9){
      updateComment(commentObj.id, {body: newComment})
      .then(newComment => {
        this.props.updateComment(newComment)
      });
     } else if(newComment && newComment.trim().length <= 9){
       alert('评论字数需大于 9');
     }
  }

  // {upVote, downVote}
  votingComment = (commentObj, vote) => {
    votingComment(commentObj.id, vote)
    .then(newComment => {
      this.props.updateComment(newComment)
    })
  }

  deleteComment = (commentObj) => {
    deleteComment(commentObj.id)
    .then(newComment => {
      this.props.updateComment(newComment)
    })
  }

  render() {
    const {comments, user} = this.props;
    const {sortBy} = this.state;
    const sortComments = comments.sort((prev,next) => next[sortBy] - prev[sortBy]);

    return (
      <div className="comments__container full-height">
        <div className="tool-contrl">
          <Typography use="headline" tag="h3" theme="primary">
            <Badge badgeContent={comments.length} color="primary">
              评论
            </Badge>
          </Typography>
          <Typography use="caption">
              sortBy: {sortBy}
          </Typography>
          <div className="btn-group">  
            <IconButton
              onClick={() => this.toggleSortBy('voteScore')} 
              className={sortBy !== 'voteScore' && 'mdc-dark'}>
              {sortBy === 'voteScore' ? 'line_weight' : 'reorder'}
            </IconButton>
            <IconButton 
              onClick={() => this.toggleSortBy('timestamp')}
              className={sortBy !== 'timestamp' && 'mdc-dark'}>
              {sortBy === 'timestamp' ? 'restore' : 'schedule'}
            </IconButton>
          </div>
          <Button raised onClick={this.sendComment}>评论</Button>
        </div>
        <Elevation z={1}>
          <List avatarList className="comments-list">
            {
              (comments.length > 0)?
              sortComments.map(comment => 
              <ListItem key={comment.id}>
                <ListItemStartDetail>
                  <Icon title={comment.author}>
                    account_circle
                  </Icon>
                </ListItemStartDetail>
                <ListItemText>
                  {comment.body}
                  <ListItemTextSecondary>
                    分数: {comment.voteScore}
                  </ListItemTextSecondary>
                </ListItemText>
                <ListItemEndDetail>
                { user === comment.author ?
                  <cite className="item-ctrls">
                    <Icon onClick={evn => this.updateComment(comment)} title="编辑">
                      edit
                    </Icon>
                    <Icon onClick={evn => this.deleteComment(comment)} title="删除">
                      cancel
                    </Icon>
                  </cite>:
                  <cite className="item-ctrls">
                    <Icon onClick={evn => this.votingComment(comment, 'upVote')}>
                      thumb_up
                    </Icon>
                    <Icon onClick={evn => this.votingComment(comment, 'downVote')}>
                      thumb_down
                    </Icon>
                  </cite>}
                </ListItemEndDetail>
              </ListItem>)
              :
              <ListItem>
                没有comments
              </ListItem>
            }
            </List>
          </Elevation>

      </div>
    );
  }
}

export default Comments;