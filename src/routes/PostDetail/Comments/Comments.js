import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'
import PeopleTyping from 'components/PeopleTyping'
import './Comments.scss'
const { array, func, object, number, string } = PropTypes

export default class Comments extends Component {
  static propTypes = {
    comments: array,
    commentsTotal: number,
    fetchComments: func,
    createComment: func,
    currentUser: object,
    postId: string,
    slug: string
  }

  componentDidMount () {
    this.width = this.comments.offsetWidth
    // these calls to fetchComments are temporary measures while we're fetching the post from hylo. 
    // once we're fetching the post from holo we can remove
    this.props.fetchComments()
  }

  componentDidUpdate (prevProps) {
    // see comment above in componentDidMount 
    if (this.props.postId !== prevProps.postId) {
      this.props.fetchComments()
    }
  }

  render () {
    const {
      comments,
      total,
      hasMore,
      fetchComments,
      currentUser,
      createComment,
      slug,
      postId
    } = this.props

    const style = {
      width: this.width + 'px'
    }

    return <div styleName='comments' ref={x => { this.comments = x }}>
      <ShowMore
        commentsLength={comments.length}
        total={total}
        hasMore={hasMore}
        fetchComments={fetchComments} />
      {comments.map(c => <Comment comment={c} key={c.id} slug={slug} />)}
      <div styleName='form-wrapper' style={style}>
        <CommentForm currentUser={currentUser}
          width={this.width}
          createComment={createComment} postId={postId} />
        <PeopleTyping styleName='people-typing' />
      </div>
    </div>
  }
}

export function ShowMore ({ commentsLength, total, hasMore, fetchComments }) {
  if (!hasMore) return null

  const extra = total - 10

  return <div styleName='showMore' onClick={fetchComments}>
    View {extra} previous comment{extra > 1 ? 's' : ''}
  </div>
}
