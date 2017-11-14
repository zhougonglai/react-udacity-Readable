import React, { Component } from 'react';
import { 
  Elevation, 
  List,
  ListItem,
  ListItemStartDetail,
  ListItemText,
  ListItemEndDetail,
  Icon
} from 'rmwc';

import {getComments} from '../../util/api';

class Comments extends Component {

  componentDidMount(){
    if(Object.keys(this.props.post) > 0){
      getComments(this.props.post.id)
      .then(comments => this.props.setComments(comments))
    }
  }

  render() {
    const {comments} = this.props;
    return (
      <Elevation z={1} className="comments__container">
        <List dense avatarList>
          {
            (comments.length > 0)?
            comments.map(comment => 
            <ListItem key={comment.id}>
              <ListItemStartDetail>
                <Icon title={comment.author}>
                  account_circle
                </Icon>
              </ListItemStartDetail>
              <ListItemText>
                {comment.body}
              </ListItemText>
              <ListItemEndDetail>
                <Icon>
                  remove
                </Icon>
              </ListItemEndDetail>
            </ListItem>)
            :
            <div>
              没有comments 属性或 评论长度为0
            </div>
          }
        </List>
      </Elevation>
    );
  }
}

export default Comments;