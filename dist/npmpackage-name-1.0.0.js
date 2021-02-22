/*!
* wxsdk v1.0.0
* (c) 2021 lingl
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['npmpackage-name'] = {}));
}(this, (function (exports) { 'use strict';

  function init(_this) {
    _this.canIUse();
    _this.getSysInfo();
    _this.getAccountInfo();
    _this.getUserInfo();
    _this.appActive();
    _this.checkNetworkStatus();
    _this.getNetworkType();
    _this.routerWatcher();
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

  function getSystemInfo(_this) {
    try {
      var res = wx.getSystemInfoSync();
      _this.appMsg.sys.version_code = res.SDKVersion;
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

  function getAccountInfo(_this) {
    var account = wx.getAccountInfoSync();
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
        _this.appMsg.et.common_info.userInfo = res;
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
    console.log(_this.appMsg.et);
    console.log('_appMsg', _this.appMsg);
    _this.upload();
  }

  function Maidian(url, method) {
    this.appMsg = {
      sys: {
        version_code: '',
        application_platform: '',
        equipment_model: '',
        os: '',
        os_version: '',
        equipment_brand: '',
        screen_size: '',
        sdk_version: ''
      },
      et: {
        event_name: '',
        common_info: {
          path: '',
          client_time: 0,
          lang: '',
          event_type: '',
          network_mode: '',
          userInfo: null
        }
      }
    };
    this.url = url;
    this.method = method;
  }
  Maidian.prototype.init = function () {
    init(this);
  };
  Maidian.prototype.getSysInfo = function () {
    getSystemInfo(this);
  };
  Maidian.prototype.getAccountInfo = function () {
    getAccountInfo();
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

  exports.Maidian = Maidian;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
