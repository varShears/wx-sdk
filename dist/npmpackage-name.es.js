/*!
* bs-wxsdk v1.0.0
* (c) 2021 lingl
*/
function init(_this) {
  _this.canIUse();
  _this.getSysInfo();
  _this.getAccountInfo();
  _this.getUserInfo();
  _this.appActive();
  _this.checkNetworkStatus();
  _this.getNetworkType();
  _this.routerWatcher();
  _this.getUniqueId();
}

function destroy(_this) {
  wx.offAppShow();
  wx.offAppHide();
  wx.offLocationChange();
  wx.offNetworkStatusChange();
}

function appActive(_this) {
  wx.onAppShow(function (res) {
    console.log('appshow', res);
    _this.appMsg.et.event_name = "appShow";
    _this.appMsg.et.common_info.event_type = "appShow";
    _this.upload();
  });
  wx.onAppHide(function (res) {
    console.log('apphide', res);
    _this.appMsg.et.event_name = "appHide";
    _this.appMsg.et.common_info.event_type = "appHide";
    _this.uplaod();
  });
}

function canIUse(_this) {
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

function wxuuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid;
}

function getUniqueId(_this) {
  var uuid = wxuuid();
  console.log(uuid);
  wx.setStorage({
    key: "uuid",
    data: uuid
  });
  _this.appMsg.sys.equipment_unique_id = uuid;
}

function getSystemInfo(_this) {
  try {
    var res = wx.getSystemInfoSync();
    _this.appMsg.sys.version_name = res.SDKVersion;
    _this.appMsg.sys.application_platform = res.platform;
    _this.appMsg.sys.equipment_model = res.model;
    _this.appMsg.sys.os = res.system.split(' ')[0];
    _this.appMsg.sys.os_version = res.system.split(' ')[1];
    _this.appMsg.sys.equipment_brand = res.brand;
    _this.appMsg.sys.screen_size = res.safeArea;
    _this.appMsg.sys.sdk_version = 1;
    _this.appMsg.et.common_info.lang = res.language;
    console.log('sysInfo', res);
  } catch (e) {
    console.error(e);
  }
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _extends_1 = createCommonjsModule(function (module) {
  function _extends() {
    module.exports = _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  module.exports = _extends;
});

function getAccountInfo(_this) {
  var account = wx.getAccountInfoSync();
  _this.appId = account.miniProgram.appId;
  console.log('accountInfo', account);
}
function getUserInfo(_this) {
  wx.getUserInfo({
    success: function success(res) {
      var userInfo = res.userInfo;
      userInfo.nickName;
      userInfo.avatarUrl;
      userInfo.gender;
      userInfo.province;
      userInfo.city;
      userInfo.country;
      _this.appMsg.et.common_info = _extends_1({}, _this.appMsg.et.common_info, res);
      console.log('userInfo', res);
    }
  });
}

function routerWatcher(_this) {
  wx.onAppRoute(function (res) {
    _this.appMsg.et.common_info.path = res.path;
    _this.appMsg.et.common_info.event_type = "router";
    _this.appMsg.et.event_name = "routerChange";
    _this.upload();
  });
}

function checkNetworkStatus(_this) {
  wx.onNetworkStatusChange(function (res) {
    console.log(res.isConnected);
    console.log(res.networkType);
    if (!res.isConnected) {
      console.error('disconnect!');
      _this.destroy();
    }
  });
}
function getNetworkType(__this) {
  var _this = __this;
  wx.getNetworkType({
    success: function success(res) {
      var networkType = res.networkType;
      _this.appMsg.et.common_info.network_mode = networkType;
      console.log('networkType', networkType);
    }
  });
}

function getLocation(_this) {
  wx.getLocation({
    type: 'wgs84',
    success: function success(res) {
      res.latitude;
      res.longitude;
      res.speed;
      res.accuracy;
      console.log('location', res);
    }
  });
}
function location(_this) {
  wx.onLocationChange(function (res) {
    console.log('locationChange', res);
  });
}

function upload(_this) {
  _this.appMsg.et.common_info.client_time = new Date().getTime();
  wx.request({
    method: _this.method,
    url: _this.url,
    data: _this.appMsg,
    header: {
      'content-type': 'application/json'
    },
    success: function success(res) {
      console.log(res.data);
    }
  });
}
function handleUpload(_this, type, evtName, others) {
  console.log(Array.prototype.slice.call(arguments)[0]);
  _this.appMsg.et.event_name = evtName;
  _this.appMsg.et.common_info.event_type = type;
  _this.appMsg.et.common_info.others = others;
  _this.upload();
}

function Maidian(url, method, appSecret) {
  this.appMsg = {
    sys: {
      version_name: '',
      application_platform: '',
      equipment_model: '',
      os: '',
      os_version: '',
      equipment_brand: '',
      screen_size: '',
      sdk_version: '',
      equipment_unique_id: ''
    },
    et: {
      event_name: '',
      common_info: {
        path: '',
        client_time: 0,
        lang: '',
        event_type: '',
        network_mode: ''
      }
    }
  };
  this.url = url;
  this.method = method;
  this.appId = null;
  this.appSecret = appSecret;
  this.app_openid = null;
}
Maidian.prototype.init = function () {
  init(this);
};
Maidian.prototype.getUniqueId = function () {
  getUniqueId(this);
};
Maidian.prototype.getSysInfo = function () {
  getSystemInfo(this);
};
Maidian.prototype.getAccountInfo = function () {
  getAccountInfo(this);
};
Maidian.prototype.getUserInfo = function () {
  getUserInfo(this);
};
Maidian.prototype.appActive = function () {
  appActive(this);
};
Maidian.prototype.routerWatcher = function () {
  routerWatcher(this);
};
Maidian.prototype.checkNetworkStatus = function () {
  checkNetworkStatus(this);
};
Maidian.prototype.getNetworkType = function () {
  getNetworkType(this);
};
Maidian.prototype.canIUse = function () {
  canIUse();
};
Maidian.prototype.getLocation = function () {
  getLocation();
};
Maidian.prototype.location = function () {
  location();
};
Maidian.prototype.destroy = function () {
  destroy();
};
Maidian.prototype.upload = function () {
  upload(this);
};
Maidian.prototype.handle = function (type, evtName, others) {
  handleUpload(this, type, evtName, others);
};

export { Maidian };
