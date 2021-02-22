export function appActive(_this){
  wx.onAppShow(res => {
    console.log('appshow', res)
    // 上报事件
    _this.appMsg.et.event_name = "appShow"
    _this.appMsg.et.common_info.event_type = "appShow"
    _this.upload()
  })

  wx.onAppHide(res => {
    console.log('apphide', res)
    // 上报事件
    _this.appMsg.et.event_name = "appHide"
    _this.appMsg.et.common_info.event_type = "appHide"
    _this.uplaod()
  })
}