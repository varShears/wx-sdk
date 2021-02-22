export function getLocation(_this){
  wx.getLocation({
    type: 'wgs84',
    success(res) {
      const latitude = res.latitude
      const longitude = res.longitude
      const speed = res.speed
      const accuracy = res.accuracy
      console.log('location', res)
    }
  })
}

export function location(_this){
  wx.onLocationChange(res => {
    console.log('locationChange', res)
  })
}