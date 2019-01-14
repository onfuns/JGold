import React, { Component } from 'react';
import { Modal, Popconfirm } from 'antd'
import ArticleItem from './ArticleItem'
import { saveCache, getCache, clearCacheByKey } from '../utils/util'
import { inject, observer } from 'mobx-react'
import './style.less'


@inject('articleStore')
@observer

class CollectModal extends Component {
  constructor(props) {
    super(props)
    this.store = props.articleStore
    this.state = {
      articleList: getCache('local-article-list') || []
    }
  }

  clearAll = () => {
    clearCacheByKey('local-article-list')
    this.store.clearCollectList()
    this.setState({ articleList: [] })
  }

  onCollect = (objectId) => {
    let localArticleList = getCache('local-article-list') || []
    localArticleList = localArticleList.filter(l => l.objectId !== objectId)
    this.store.updateArticle(objectId, false)
    saveCache('local-article-list', localArticleList)
    this.setState({ articleList: localArticleList })
  }


  render() {
    return (
      <Modal
        visible={true}
        mask={false}
        footer={(
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <a onClick={this.props.onBack}>返回主页</a>
            <Popconfirm
              placement="topRight"
              title="确认全部清除？"
              okText="是"
              cancelText="否"
              onConfirm={this.clearAll}
            >
              <a>全部清除</a>
            </Popconfirm>
          </div>
        )}
        closable={false}
        wrapClassName="collect-modal"
      >
        {
          this.state.articleList.map(item => (
            <ArticleItem
              {...item}
              key={item.objectId}
              onCollect={this.onCollect}
            />
          ))
        }
      </Modal>
    );
  }
}

export default CollectModal;

