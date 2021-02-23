export function getAccountInfo(_this){
  const account = wx.getAccountInfoSync()
  _this.appId = account.miniProgram.appId
  console.log('accountInfo', account)
}

export function getUserInfo(_this){
  wx.getUserInfo({
    success: res => {
      var userInfo = res.userInfo
      var nickName = userInfo.nickName
      var avatarUrl = userInfo.avatarUrl
      var gender = userInfo.gender //性别 0：未知、1：男、2：女
      var province = userInfo.province
      var city = userInfo.city
      var country = userInfo.country
      _this.appMsg.et.common_info = {
        ..._this.appMsg.et.common_info,
        ...res
      }
      console.log('userInfo', res)
    }
  })
}
