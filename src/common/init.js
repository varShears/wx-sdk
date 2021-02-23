
function init(_this){
  _this.canIUse()
  _this.getSysInfo()
  _this.getAccountInfo()
  _this.getUserInfo()
  _this.appActive()
  _this.checkNetworkStatus()
  _this.getNetworkType()
  _this.routerWatcher()
  _this.getUniqueId()
}

export default init