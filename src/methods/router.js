export function routerWatcher(_this){
  wx.onAppRoute((res) => {
    _this.appMsg.et.common_info.path = res.path
    _this.appMsg.et.common_info.event_type = "router"
    _this.appMsg.et.event_name = "routerChange"
    // 上报事件
    _this.upload()
  })
}