export function upload(_this){
  _this.appMsg.et.common_info.client_time = new Date().getTime()
  const request = wx.request({
    method: _this.method,
    url: _this.url, //仅为示例，并非真实的接口地址
    data: _this.appMsg,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data)
    }
  })
}

export function handleUpload(_this, type, evtName, others){
  console.log([...arguments][0])
  _this.appMsg.et.event_name = evtName
  _this.appMsg.et.common_info.event_type = type
  _this.appMsg.et.common_info.others = others
  _this.upload()
}
