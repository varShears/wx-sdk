export function checkNetworkStatus(_this){
  wx.onNetworkStatusChange((res) => {
    console.log(res.isConnected)
    console.log(res.networkType)
    if (!res.isConnected) {
      console.error('disconnect!')
      _this.destroy()
    }
  })
}

export function getNetworkType(__this){
  const _this = __this
  wx.getNetworkType({
    success(res) {
      const networkType = res.networkType
      _this.appMsg.et.common_info.network_mode = networkType
      console.log('networkType', networkType)
    }
  })
}