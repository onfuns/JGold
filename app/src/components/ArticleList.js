import React, { Component } from 'react'
import { Tabs, Spin } from 'antd';
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import ArticleItem from './ArticleItem'
import Footer from './Footer'
import CollectModal from './CollectModal'
import './style.less'
import moment from 'moment'
import { debounce, saveCache, getCache } from '../utils/util'
moment.locale('zh-cn')
const TabPane = Tabs.TabPane;


@inject('articleStore')
@observer
class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.store = props.articleStore
    this.state = {
      collectModalVisble: false, //收藏夹显示
      currentCategory: '',  //当前分类
      sort: '最新', //当前排序
    }
  }

  async componentDidMount() {
    this.getData()
    const element = this.articleListDom
    const onScroll = () => {
      if (element.scrollHeight - element.scrollTop < element.clientHeight + 60) {
        this.getData({ next: true })
      }
    }
    element.addEventListener('scroll', debounce(onScroll, 200))
  }

  getData = async (params = {}) => {
    let { currentCategory, sort } = this.state
    if (!currentCategory) {
      let categoryList = await this.store.getCategoryList()
      categoryList = toJS(categoryList)
      currentCategory = categoryList.length ? categoryList[0].id : '';
      this.setState({ currentCategory })
    }
    this.store.getArticleList({ sort, category: currentCategory, ...params })
  }

  onFilterChange = (value, key) => {
    this.store.clearArticleList()
    this.setState({ [key]: value }, this.getData)
  }

  onCollect = (item) => {
    const { objectId, originalUrl, title, createdAt, isConnect = false } = item
    let localArticleList = getCache('local-article-list') || []
    const index = localArticleList.findIndex(l => l.objectId === objectId)
    if (index > -1) {
      localArticleList[index].isConnect = !isConnect
    } else {
      localArticleList.push({ objectId, originalUrl, title, createdAt, isConnect: true })
    }
    this.store.updateArticle(objectId, !isConnect)
    saveCache('local-article-list', localArticleList)
  }


  render() {
    const { articleList, categoryList, loading } = this.store
    const { sort } = this.state
    return (
      <div className="lay-artcile">
        <Tabs
          style={{ height: 31 }}
          onChange={(value) => this.onFilterChange(value, 'currentCategory')}
        >
          {
            categoryList.map(item => (
              <TabPane tab={item.name} key={item.id} />
            ))
          }
        </Tabs>
        <div className="lay-article-sort">
          {
            [['最新', '热门', '评论'], ['本周最热', '本月最热', '历史最热']].map(item => (
              <p key={item}>
                {
                  item.map(c => (
                    <span
                      key={c}
                      className={sort === c ? 'sort-active' : ''}
                      onClick={() => this.onFilterChange(c, 'sort')}
                    >{c}</span>
                  ))
                }
              </p>
            ))
          }
        </div>
        <Spin spinning={loading} wrapperClassName="custom-loading" indicator={(<img src={require('../assets/images/loading.svg')} />)}>
          <div className="lay-article-list" ref={(ref) => this.articleListDom = ref}>
            {
              articleList.map(item => (
                <ArticleItem
                  {...item}
                  key={item.objectId}
                  onCollect={() => this.onCollect(item)}
                />
              ))
            }
          </div>
        </Spin>
        <Footer onRefresh={this.getData} onCollect={() => this.setState({ collectModalVisble: true })} />
        {this.state.collectModalVisble ? <CollectModal onBack={() => this.setState({ collectModalVisble: false })} /> : null}
      </div>
    )
  }
}

export default ArticleList;