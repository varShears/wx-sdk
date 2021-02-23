import { wxuuid } from '../utils/uuid.js'
export function getUniqueId(_this){
  const uuid = wxuuid()
  console.log(uuid)
  wx.setStorage({
    key:"uuid",
    data:uuid
  })
  _this.appMsg.sys.equipment_unique_id = uuid
}

