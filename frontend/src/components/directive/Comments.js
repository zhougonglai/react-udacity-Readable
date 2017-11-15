import React, { Component } from 'react';
import { 
  Elevation, 
  List,
  ListItem,
  ListItemStartDetail,
  ListItemText,
  ListItemEndDetail,
  Icon,
  Button,
  Typography
} from 'rmwc';

class Comments extends Component {

  render() {
    const {comments} = this.props;
    return (
      <div className="comments__container">
      <div className="tool-contrl">
        <Typography use="headline" tag="h3" theme="primary">
              评论
        </Typography>
        <Button raised>评论</Button>
      </div>
      <Elevation z={1}>
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
      </div>
    );
  }
}

export default Comments;