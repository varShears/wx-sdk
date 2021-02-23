export default function destroy(_this){
  wx.offAppShow()
  wx.offAppHide()
  wx.offLocationChange()
  wx.offNetworkStatusChange()
}