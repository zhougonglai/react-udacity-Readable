import React, { Component } from 'react';
import {
  Grid,
  GridCell,
  Icon,
  Button
} from 'rmwc';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui-icons/Add';
import Remove from 'material-ui-icons/Remove';
import Delete from 'material-ui-icons/Delete';
import Edite from 'material-ui-icons/Edit';
import TextField from 'material-ui/TextField';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Dialog, {
   DialogActions, 
   DialogContent, 
   DialogTitle 
} from 'material-ui/Dialog';

import Comments from './Comments';
import {votingPost, getComments, updatePost, deletePosts} from '../../util/api';

class Post extends Component {

  state = {
    editor:{
      status: false,
      title: '',
      body: ''
    }
  }
  componentDidMount(){
    this.getComments();
  }

  /**
   * @description 帖子投票
   * @param {enum} {} 
   * @param {obj} 帖子
   */
  votePost = (post, vote) => {
    votingPost(post.id, vote)
    .then(post => this.props.updatePost(post))
  }

  getComments = () => {
    getComments(this.props.match.params.post_id)
    .then(comments => this.props.setComments(comments));
  }

  handleChange = (attr,val) => {
    this.setState(prevState => ({
      editor:{
        ...prevState.editor,
        [attr]:val
      }
    }))
  }

  editorPost = (type) => {
    switch(type){
      case 'edit':
        this.setState((prevState, props) => ({
          editor:{
            status: true,
            title: props.post.title,
            body: props.post.body
          }
        }))
        break;
      case 'delete':
        deletePosts(this.props.post.id)
        .then(post => {
          this.props.updatePost(post);
          this.props.history.push('/');
        })
        break;
      case 'set':
        const {body, title} = this.state.editor;
        if(title.trim().length > 5 && body.trim().length > 9){
          updatePost(this.props.post.id, {title, body})
          .then(post => this.props.updatePost(post))
        } else {
          alert('标题长度需大于 5, 内容长度需大于9')
        }
        this.editorPost();
        break;
      default:
        this.setState({
          editor:{
            status: false,
            title: '',
            body: ''
          }
        })
    }
  }

  render() {
    const {post, user, comments, match, setComments, updateComment} = this.props;
    const {editor} = this.state;
    
    return (
      <div className="full-height">
      <Grid wrap className="full-height">
        <GridCell span={6} wrap>
        <Card>
            <CardHeader avatar={
              <Avatar aria-label="author">
                <Icon>account_circle</Icon>
              </Avatar>
            } title={post.title}
            subheader={`作者: ${post.author} . 
            时间: ${new Date(post.timestamp).toLocaleString()} .
            分数: ${post.voteScore}`}>
            </CardHeader>
            <CardContent className="post__content">
              { post.body }
            </CardContent>
            <CardActions disableActionSpacing className="actions">
              <div className="flex-grow"></div>
              {
                user === post.author ?
                <div>
                  <IconButton title="编辑" onClick={evn => this.editorPost('edit')}>
                    <Edite />
                  </IconButton>
                  <IconButton title="删除" onClick={evn => this.editorPost('delete')}>
                    <Delete />
                  </IconButton>
                </div> :
                <div>
                  <IconButton title="upVote" aria-label="加分" onClick={() => this.votePost(post, 'upVote')}>
                    <Add />
                  </IconButton>
                  <IconButton title="downVote" aria-label="扣分" onClick={() => this.votePost(post, 'downVote')}>
                    <Remove />
                  </IconButton>
                </div>
              }
            </CardActions>
          </Card>
        </GridCell>
        <GridCell span={6}>
          <Comments comments={comments} user={user} match={match} 
                    setComments={setComments} updateComment={updateComment}/>
        </GridCell>
      </Grid>
      <Dialog open={editor.status}>
        <DialogTitle>编辑帖子</DialogTitle>
        <DialogContent>
          <TextField autoFocus 
            label="post title" onChange={evn => this.handleChange('title', evn.target.value)}
            fullWidth value={editor.title}/>
          <TextField 
            label="post body" onChange={evn => this.handleChange('body', evn.target.value)}
            fullWidth value={editor.body}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={this.editorPost} color="primary">
              取消
            </Button>
            <Button onClick={evn => this.editorPost('set')} color="primary">
              确定
            </Button>
        </DialogActions>
      </Dialog>
    </div>);
  }
}

export default Post;