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

import {Link, Route} from 'react-router-dom';

import {votingPost, createPost, getComments} from '../../util/api';

import Comments from './Comments';

const categorys = ['react', 'redux', 'udacity'];

class Posts extends Component {
  state={
    sortBy: 'voteScore',
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

  componentDidMount(){
    console.log('componentDidMount');
    const {match, setComments} = this.props;
    if(match.params.post_id){
      getComments(match.params.post_id)
      .then(comments => setComments(comments))
    }
  }

  toggleSortBy = (sortBy) => {
    this.setState(prevState => {
      return {
        sortBy: prevState.sortBy === sortBy ? (
          sortBy === 'voteScore' ? 'timestamp' : 'voteScore'
        ) : sortBy
      }
    });
  }

  /**
   * @description 帖子投票
   * @param {enum} {} 
   * @param {obj} 帖子
   */
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

  /**
   * 发帖流程
   * @description 有category 类型 -> dialog
   *              无category类型 -> menus 选择发帖类型
   */
  createPost = () => {
    const {match} = this.props;
    if(match && match.params.category){
      this.setState((prev, props)=> ({
        post: {
          ...prev.post,
          category: match.params.category
        }
      }),()=>{
        this.openDialog(match.params.category)
      })
    }else{
      this.setState({menu:true})
    }
  }

  /**
   * @description 实际创建Post的实现
   */
  createNewPost = () => {
    const {title, body, category} = this.state.post;
    if(title.trim().length > 5 && body.trim().length > 9){
      createPost({title: title.trim(), body: body.trim() , category, author:this.props.user})
      .then(newPost => {
        const {setPosts,posts} = this.props; 
        setPosts(posts.concat([newPost]))
      })
    }else{
      //  不知道 为什么只有这里 会使得 场景 组件 snackbar 没有达到 目标效果 3秒后消失(组件默认行为)
      this.setState({
        snackbar:{
          status: true,
          msg: '标题字数需大于5 且 内容字数大于 9'
        }
      })
    }
  }

  render() {
    const {
      posts,
      comments,
      user,
      match,
      // ...others
    } = this.props;
    const {
      dialog, 
      snackbar, 
      menu, 
      post, 
      sortBy
    } = this.state;
    const {status, msg} = snackbar;

    const sortByCategory = posts.sort((prev, next) => next[sortBy] - prev[sortBy]);

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
          {match.params.category && <ListGroupSubheader>{match.params.category}</ListGroupSubheader>}
          <List twoLine avatarList>
              {
                sortByCategory.length > 0 ?
                sortByCategory.map((post, index) =>
                <ListItem key={post.id}
                temporaryDrawerSelected={post.id === match.params.post_id}>
                  <ListItemStartDetail>
                    <Icon title={post.author}>account_circle</Icon>
                  </ListItemStartDetail>
                  <div className="item__score">
                    {post.voteScore}
                  </div>
                  <ListItemText wrap>
                    <Link to={`/${post.category}/${post.id}`}>
                      <Typography use="title">
                        {post.title}
                        <cite>
                          作者: {post.author}
                        </cite>
                      </Typography>
                      <ListItemTextSecondary>
                        {post.body.substr(0, 24)}
                        <cite>
                          创建时间 : {new Date(post.timestamp).toLocaleString()}
                        </cite>
                      </ListItemTextSecondary>
                    </Link>
                  </ListItemText>
                  {user !== post.author && 
                  <ListItemEndDetail>
                      <div className="item-ctrls">
                        <Icon title="upVote" aria-label="加分" onClick={() => this.votePost(post, 'upVote')}>
                          thumb_up
                        </Icon>
                        <Icon title="downVote" aria-label="扣分" onClick={() => this.votePost(post, 'downVote')}>
                          thumb_down
                        </Icon>
                      </div>
                  </ListItemEndDetail>}
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

        <Route path="/:category/:post_id" exact render={locations =>
         <Comments comments={comments} {...locations}/>
        }/>

        <Snackbar
          show={status}
          onClose={evt => this.setState({snackbar:{status: false,msg: ''}})}
          message={msg}
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

export default Posts;