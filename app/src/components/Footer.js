import React from 'react'
import { Tooltip, Icon } from 'antd'
export default ({ onRefresh, onCollect }) => (
  <div className='footer'>
    <div>
      <Tooltip title="刷新">
        <Icon type="sync" onClick={onRefresh} />
      </Tooltip>
    </div>
    <div>
      <Tooltip title="收藏夹">
        <Icon type="star" style={{ marginLeft: 10 }} onClick={onCollect} />
      </Tooltip>
      {/* <Tooltip title="设置">
        <Icon type="setting" style={{ marginLeft: 10 }} />
      </Tooltip> */}
    </div>
  </div>
)