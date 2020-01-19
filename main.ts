let temp: { tc: number; tf: number; rh: number; }
/**
 * control.runInParallel(function () { forever(function () { serial.writeLine("?" + serial.readString()); pause(1000); }); }) Write to the SPI slave and return the response @param value Data to be sent to the SPI slave
 */
/**
 * dht.read(function (data: { raw: number[]; rh: number; t: number; err: boolean; }) { console.log(`Temperature is: ${data.t}`) })
 */
// serial.attachToConsole();
let dht = new DHT11(pins.D11);
let kakuPin = new DigitalPin(pins.D8); // enige pin met pull-down
let kakuVCC = new DigitalPin(pins.D6);
let kakuChannel = 6;
const digitalPulseHandler = (
    value = 0, //  start met power low
    pulses?: number[]
) => {
    kakuVCC.digitalWrite(true); // power on
    let valueb = value == 1 ? true : false
    kakuPin.digitalPulse(valueb, pulses);
    pause(30) //usleep(30 * 1000);
    kakuPin.digitalWrite(false);
    kakuVCC.digitalWrite(false);
};
let kaku = new ThermoHygroTransmitter(digitalPulseHandler, 0, kakuChannel)
forever(function () {
    let dhtResult
try{
    temp = dht.temperature()
    dhtResult = {
        id: "sensor",
        temperature: temp.tc,
        humidity: temp.rh,
        channel: 6
    };
    let dhtJson = JSON.stringify(dhtResult);
    // serial.writeLine(dhtJson)
    console.log("" + dhtJson);
    //  console.log("" + riseFall);
}
catch(e){
    dhtResult={temperature:22,humidity:51}

}
   
    for (let led of [pins.LED, pins.RXLED, pins.TXLED]) { led.digitalWrite(false) }
    pause(1000)
    for (let led of [pins.LED, pins.RXLED, pins.TXLED]) { led.digitalWrite(true) }
    kaku.sendTempHumi(dhtResult.temperature, dhtResult.humidity)
    pause(5000)
    // control.gc() // werkt niet
    // control.reset()
})