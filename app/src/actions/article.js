import { request } from '../utils/util'

export default {
  //获取分类
  getCategoryApi: () => {
    return request({
      url: `https://gold-tag-ms.juejin.im/v1/categories`,
      method: 'POST',
      headers: {
        'X-Juejin-Src': 'web'
      }
    })
  },
  //获取分类下最新文章
  getArticleByTimeLineApi: (data = {}) => {
    return request({
      url: `https://timeline-merger-ms.juejin.im/v1/get_entry_by_timeline`,
      method: 'GET',
      data
    })
  },
  //获取分类下最热文章
  getArticleByRankLineApi: (data = {}) => {
    return request({
      url: `https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank`,
      method: 'GET',
      data
    })
  },
  //获取分类下按有评论文章
  getArticleByCommentApi: (data = {}) => {
    return request({
      url: `https://timeline-merger-ms.juejin.im/v1/get_entry_by_comment`,
      method: 'GET',
      data
    })
  },
  //获取分类下本周最热文章
  getArticleByPeriodWeekApi: (data = {}) => {
    return request({
      url: `https://timeline-merger-ms.juejin.im/v1/get_entry_by_period`,
      method: 'GET',
      data: { ...data, period: 'week' }
    })
  },
  //获取分类下本月最热文章
  getArticleByPeriodMonthApi: (data = {}) => {
    return request({
      url: `https://timeline-merger-ms.juejin.im/v1/get_entry_by_period`,
      method: 'GET',
      data: { ...data, period: 'month' }
    })
  },
  //获取分类下历史最热文章
  getArticleByHotApi: (data = {}) => {
    return request({
      url: `https://timeline-merger-ms.juejin.im/v1/get_entry_by_hot`,
      method: 'GET',
      data
    })
  }
}