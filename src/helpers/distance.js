export const maximumDistance = (myPosition, address, max = 10) => {


    //if(address) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(address.latitude - myPosition.latitude);  // deg2rad below
    var dLon = deg2rad(address.longitude - myPosition.longitude); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(myPosition.latitude)) * Math.cos(deg2rad(address.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    if(parseInt(d) > max) {
      return false;
    }
    return true;
}

export const distance = (myPosition, address, max = 10) => {


    //if(address) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(address.latitude - myPosition.latitude);  // deg2rad below
    var dLon = deg2rad(address.longitude - myPosition.longitude); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(myPosition.latitude)) * Math.cos(deg2rad(address.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}