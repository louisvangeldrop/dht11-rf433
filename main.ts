let temp: { tc: number; tf: number; rh: number; }
/**
 * control.runInParallel(function () { forever(function () { serial.writeLine("?" + serial.readString()); pause(1000); }); }) Write to the SPI slave and return the response @param value Data to be sent to the SPI slave
 */
/**
 * dht.read(function (data: { raw: number[]; rh: number; t: number; err: boolean; }) { console.log(`Temperature is: ${data.t}`) })
 */
// serial.attachToConsole();
let dht = new DHT11(pins.D11);
forever(function () {
    temp = dht.temperature()
    let dhtResult = {
        id: "sensor",
        temperature: temp.tc,
        humidity: temp.rh,
        channel: 6
    };
    let dhtJson = JSON.stringify(dhtResult);
    // serial.writeLine(dhtJson)
    console.log("" + dhtJson);
    //  console.log("" + riseFall);
    for (let led of [pins.LED, pins.RXLED, pins.TXLED]) { led.digitalWrite(false) }
    pause(1000)
    for (let led of [pins.LED, pins.RXLED, pins.TXLED]) { led.digitalWrite(true) }
    pause(20000)
    // control.gc() // werkt niet
    control.reset()
})