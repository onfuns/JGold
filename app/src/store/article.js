import { observable, action } from 'mobx'
import { ArticleService } from '../actions'
import { saveCache, getCache } from '../utils/util'
const { getCategoryApi, getArticleByTimeLineApi, getArticleByRankLineApi, getArticleByCommentApi,
  getArticleByPeriodWeekApi, getArticleByPeriodMonthApi, getArticleByHotApi
} = ArticleService

class Article {

  compareLocalList = (list) => {
    const localArticleList = getCache('local-article-list') || []
    return list.map(item => {
      const index = localArticleList.findIndex(l => l.objectId === item.objectId)
      item.isConnect = index > -1 ? true : false
      return item
    })
  }

  @observable articleList = []
  @observable categoryList = []
  @observable loading = false

  @action
  getArticleList = async ({ src = 'web', limit = '20', category = '', next = false, sort } = {}) => {
    const params = { src, limit, category }
    const { callback, pagekey } = [
      { name: '最新', callback: getArticleByTimeLineApi, pagekey: 'createdAt' },
      { name: '热门', callback: getArticleByRankLineApi, pagekey: 'rankIndex' },
      { name: '评论', callback: getArticleByCommentApi, pagekey: 'lastCommentTime' },
      { name: '本周最热', callback: getArticleByPeriodWeekApi, pagekey: 'hotIndex' },
      { name: '本月最热', callback: getArticleByPeriodMonthApi, pagekey: 'hotIndex' },
      { name: '历史最热', callback: getArticleByHotApi, pagekey: 'hotIndex' },
    ].find(item => item.name === sort)

    const isLoadNextPage = next === true
    if (isLoadNextPage) { //分页是取最后一条数据特定key值
      const lastArticle = this.articleList[this.articleList.length - 1]
      params.before = lastArticle[pagekey]
    }
    try {
      this.loading = true
      const { d: { entrylist = [] } = {} } = await callback(params)
      this.loading = false
      const list = isLoadNextPage ? this.articleList.concat(entrylist) : entrylist
      this.articleList = this.compareLocalList(list) //比对远程与历史数据

    } catch (error) {
      console.log(error)
      this.loading = false
    }
  }

  getCategoryList = async () => {
    try {
      const { d: { categoryList = [] } = {} } = await getCategoryApi()
      this.categoryList = categoryList
    } catch (error) {
      console.log(error)
    }
    return this.categoryList
  }

  clearArticleList = () => {
    this.articleList = []
  }

  updateArticle = (id, flag) => {
    const index = this.articleList.findIndex(item => item.objectId === id)
    this.articleList[index].isConnect = flag
  }

  clearCollectList = () => {
    this.articleList = this.compareLocalList(this.articleList)
  }

  collectArticle = ({ objectId, originalUrl, title, createdAt, isConnect = false }) => {
    let localArticleList = getCache('local-article-list') || []
    const index = localArticleList.findIndex(l => l.objectId === objectId)
    if (index > -1) {
      localArticleList.splice(index, 1)
    } else {
      localArticleList.unshift({ objectId, originalUrl, title, createdAt, isConnect: true })
    }
    this.updateArticle(objectId, !isConnect)
    saveCache('local-article-list', localArticleList)
  }
}

export default new Article()