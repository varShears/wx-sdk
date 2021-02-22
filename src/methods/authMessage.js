export function getAccountInfo(_this){
  const account = wx.getAccountInfoSync()
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
      _this.appMsg.et.common_info.userInfo = res
      console.log('userInfo', res)
    }
  })
}
