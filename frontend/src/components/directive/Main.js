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
  Typography,
  Snackbar,
  Dialog,
  FormField,
  Textfield,
} from 'rmwc';
import { MenuAnchor, MenuItem, Menu } from 'rmwc/Menu';
import { 
  DialogRoot,
  DialogSurface, 
  DialogHeader, 
  DialogHeaderTitle, 
  DialogBody, 
  DialogFooter, 
  DialogFooterButton
} from 'rmwc/Dialog';

import {votingPost, createPost} from '../../util/api';

import Comments from './Comments';




const categorys = ['react', 'redux', 'udacity'];

class Main extends Component {
  state={
    dialog: false,
    menu:   false,
    snackbar: {
      status : false,
      msg: ''
    },
    post: {
      title: '',
      body: '',
      category: ''
    }
  }
  votePost = (post, vote) => {
    votingPost(post.id, vote)
    .then(post => this.props.updatePost(post))
    .then(action => {
      this.setState({
        snackbar:{
          status: true,
          msg: vote
        }
      })
    })
  }

  openDialog = (category) => {
    if(this.props.user){
      this.setState(prev => ({
        dialog: true,
        post:{
          ...prev.post,
          category
        }
      }));
    }else{
      this.setState({
        snackbar:{
          status: true,
          msg: '请登录'
        }
      })
    }
  }

  handleChange = (filed, value) =>{
    this.setState(prev => ({
      post:{
        ...prev.post,
        [filed]: value
      }
    }))
  }

  closeDialog = () => {
   this.setState(prev =>({
     dialog: false,
     post:{
      ...prev.post,
      title: '',
      body: '',
     }
    }));
  }

  createPost = () => {
    if(this.props.active){
      this.setState((prev, props)=> ({
        post: {
          ...prev.post,
          category: props.active
        }
      }),()=>{
        this.openDialog(this.props.active)
      })
    }else{
      this.setState({menu:true})
    }
  }

  createNewPost = () => {
    const {title, body, category} = this.state.post;
    if(title.trim().length > 5 && body.trim().length > 9){
      createPost({title, body, category, author:this.props.user})
      .then(newPost => this.props.setPosts(this.props.posts.concat([newPost])))
      .then(() => {
        // 如果该类型下 原本没有帖子 则在创建后默认选中新创建帖子, 其他状况保持不变
        if(this.activeTopics().length === 1){
          this.props.selectPost(this.activeTopics()[0]);
        }
      })
    }
  }

  activeTopics(){
    const {active, posts, sortBy} = this.props;
    return (active === '' ? posts : posts.filter(post => post.category === active))
           .sort((prev,next) => next[sortBy] - prev[sortBy]);
  }

  render() {
    const {comments, select, active, sortBy, user, toggleSortBy} = this.props;
    const {dialog, snackbar, menu, post} = this.state;
    // const filterTopics = active === "" ? posts : posts.filter(post => post.category === active);
    // const activeTopics = filterTopics.sort((prev, next) => next[sortBy] - prev[sortBy]);
    
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
          <MenuAnchor>
            <Button raised onClick={this.createPost}>发帖</Button>
            <Menu open={menu}
                onClose={event => this.setState({menu:false})}>
              {
                categorys.map((item, index) =>(
                  <MenuItem key={index} 
                  onClick={event => this.openDialog(item)}>{item}</MenuItem>
                ))
              }
            </Menu>
          </MenuAnchor>
        </div>
        <Elevation z={1}>
          <ListGroup>
          {active && <ListGroupSubheader>{active}</ListGroupSubheader>}
          <List twoLine avatarList>
              {
                this.activeTopics().length > 0 ?
                this.activeTopics().map((post, index) =>
                <ListItem key={post.id}
                temporaryDrawerSelected={post.id === select.id}>
                  <ListItemStartDetail>
                    <Icon title={post.author}>account_circle</Icon>
                  </ListItemStartDetail>
                  <div className="item__score">
                    {post.voteScore}
                  </div>
                  <ListItemText onClick={()=>this.props.selectPost(post)}>
                    <Typography use="title">
                      {post.title}
                      <cite>
                        作者: {post.author}
                      </cite>
                    </Typography>
                    <ListItemTextSecondary>
                      {post.body}
                      <cite>
                        创建时间 : {new Date(post.timestamp).toLocaleString()}
                      </cite>
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

        <Snackbar
          show={snackbar.status}
          onClose={evt => this.setState({snackbar:{status: false}})}
          message={snackbar.msg}
          timeout={3000}
        />

        <Dialog open={dialog} 
          onAccept={this.createNewPost}
          onClose={this.closeDialog}>
          <DialogRoot>
            <DialogSurface>
              <DialogHeader>
                <DialogHeaderTitle>
                  发帖 : 
                  <Icon className="mdc-button__icon">extension</Icon> - {post.category} |
                  <Icon className="mdc-button__icon">person</Icon> - {user}
                </DialogHeaderTitle>
              </DialogHeader>
              <DialogBody>
                <FormField className="form__post">
                  <Textfield className="post__title" label="title 标题" value={post.title} 
                  onChange={(event) => this.handleChange('title',event.target.value)} />
                  <Textfield className="post__body" label="body 内容" value={post.body}
                    onChange={(event) => this.handleChange('body',event.target.value)}/>
                </FormField>
              </DialogBody>
              <DialogFooter>
                <DialogFooterButton cancel>取消</DialogFooterButton>
                <DialogFooterButton accept>确认</DialogFooterButton>
              </DialogFooter>
            </DialogSurface>
          </DialogRoot>
        </Dialog>
      </div>);
  }
}

export default Main;