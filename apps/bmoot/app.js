function startConnection() {
  var gatt;
  NRF.requestDevice({
      filters: [
        { services: ["71C1E128-D92F-4FA8-A2B2-0F171DB3436C"] }
      ]
  }).then(function(device) {
    E.showMessage("Found service", "");
    return device.gatt.connect();
  }).then(function(g) {
    gatt = g;
    gatt.on('gattserverdisconnected', function(event) {
      E.showMessage("Disconnected.", "");
    });
    return gatt.getPrimaryService("71C1E128-D92F-4FA8-A2B2-0F171DB3436C");
  }).then(function(service) {
    return service.getCharacteristic("503DD605-9BCB-4F6E-B235-270A57483026");
  }).then(function(characteristic) {
    characteristic.on('characteristicvaluechanged', function(event) {
              E.showMessage(event.target.value, "Value:");
            });
    //return characteristic.startNotifications();
  }).then(function(d) {
    E.showMessage("Waiting for data", "Now");
  }).catch(function() {
    E.showMessage("Hmmm", "Doesn't work.");
  });
}

startConnection();
