export function getSystemInfo(_this){
  try {
    const res = wx.getSystemInfoSync()
    _this.appMsg.sys.version_code = res.SDKVersion
    _this.appMsg.sys.application_platform = res.platform
    _this.appMsg.sys.equipment_model = res.model
    _this.appMsg.sys.os = res.system.split(' ')[0]
    _this.appMsg.sys.os_version = res.system.split(' ')[1]
    _this.appMsg.sys.equipment_brand = res.brand
    _this.appMsg.sys.screen_size = res.safeArea
    _this.appMsg.sys.sdk_version = 1
    _this.appMsg.et.common_info.lang = res.language
    console.log('sysInfo', res)
  } catch (e) {
    console.error(e)
  }
}
