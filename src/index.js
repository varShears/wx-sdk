import init from './common/init.js'
import destroy from './common/destroy.js'
import { appActive } from './common/appActive.js'
import canIUse from './common/canIUse.js'
import { getUniqueId } from './common/getUniqueId.js'

import { getSystemInfo } from './methods/sys.js'
import { getAccountInfo, getUserInfo } from './methods/authMessage.js'
import { routerWatcher } from './methods/router.js'
import { getNetworkType, checkNetworkStatus } from './methods/net.js'
import { getLocation, location } from './methods/location.js'
import { upload, handleUpload } from './methods/upload.js'

/**
 *
 * @description 埋点系统微信小程序sdk
 *
 * @param {String} url
 * @param {String} method
 *
 * */
function Maidian(url, method, appSecret) {
  this.appMsg = {
    sys: {
      version_name: '', // 微信小程序客户端版本*
      application_platform: '', // *
      equipment_model: '', // 手机型号*
      os: '', // 系统*
      os_version: '', // 系统版本*
      equipment_brand: '', //*
      screen_size: '', // 屏幕大小*
      sdk_version: '', // sdkversion*
      equipment_unique_id: ''
    },
    et: {
      event_name: '', // 事件名称
      common_info: {
        path: '', // 路由*
        client_time: 0, // 事件产生时间
        lang: '', // 语言*
        event_type: '', // 事件类型: router,
        network_mode: '', // 网络模式*
      },
    },
  }
  this.url = url
  this.method = method
  this.appId = null
  this.appSecret = appSecret
  this.app_openid = null
}
// 初始化
Maidian.prototype.init = function () {
  init(this)
}
Maidian.prototype.getUniqueId = function () {
  getUniqueId(this)
}
// 获取系统信息相关
Maidian.prototype.getSysInfo = function () {
  getSystemInfo(this)
}
// 获取账户信息
Maidian.prototype.getAccountInfo = function () {
  getAccountInfo(this)
}
// 获取用户信息
// !! 需要获取权限 wx.authorize
// 详情 https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/AuthSetting.html
Maidian.prototype.getUserInfo = function () {
  getUserInfo(this)
}
// 小程序是否激活
Maidian.prototype.appActive = function () {
  appActive(this)
}
// 路由监听
Maidian.prototype.routerWatcher = function () {
  routerWatcher(this)
}
// 监听网络状态
Maidian.prototype.checkNetworkStatus = function () {
  checkNetworkStatus(this)
}
// 获取网络类型
Maidian.prototype.getNetworkType = function () {
  getNetworkType(this)
}
// 判断方法是否可用
Maidian.prototype.canIUse = function () {
  canIUse(this)
}
// 获取地址
Maidian.prototype.getLocation = function () {
  getLocation(this)
}
// 地点信息
Maidian.prototype.location = function () {
  location(this)
}
// 销毁全局监听
Maidian.prototype.destroy = function () {
  destroy(this)
}
// 埋点上报
Maidian.prototype.upload = function () {
  upload(this)
}
// 手动埋点
Maidian.prototype.handle = function (type, evtName, others) {
  handleUpload(this, type, evtName, others)
}

export { Maidian }
