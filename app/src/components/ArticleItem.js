import React from 'react'
import { shell } from 'electron'
import { Tooltip, Icon } from 'antd'
import moment from 'moment'
import './style.less'

export default ({ objectId, originalUrl, title, createdAt, isConnect = false, onCollect }) => {
  return (
    <div className="lay-article-item">
      <a className="lay-article-link" onClick={() => shell.openExternal(originalUrl)}>
        <Tooltip title={title}>{title}</Tooltip>
      </a>
      <p className="lay-artcile-tools">
        <span>{moment(createdAt).fromNow()}</span>
        <Icon
          onClick={() => onCollect(objectId)}
          style={{ cursor: 'pointer', corlor: 'red' }}
          theme={isConnect ? 'filled' : ''}
          type="heart"
        />
      </p>
    </div>
  )
}