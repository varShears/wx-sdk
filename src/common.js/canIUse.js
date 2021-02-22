export default function canIUse(_this){
  !wx.canIUse('getSystemInfoSync') && console.error('getSystemInfoSync can not use');
  !wx.canIUse('onAppShow') && console.error('onAppShow can not use');
  !wx.canIUse('onAppHide') && console.error('onAppHide can not use');
  !wx.canIUse('getLocation') && console.error('getLocation can not use');
  !wx.canIUse('onLocationChange') && console.error('onLocationChange can not use');
  !wx.canIUse('getNetworkType') && console.error('getNetworkType can not use');
  !wx.canIUse('onNetworkStatusChange') && console.error('onNetworkStatusChange can not use');
  !wx.canIUse('getUserInfo') && console.error('getUserInfo can not use');
  !wx.canIUse('getAccountInfoSync') && console.error('getAccountInfoSync can not use');
}