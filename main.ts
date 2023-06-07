// shows the IAQ
input.onButtonPressed(Button.B, function () {
    kitronik_air_quality.clear()
    basic.pause(100)
    kitronik_air_quality.show("Indoor Air Quality", 1, kitronik_air_quality.ShowAlign.Centre)
    kitronik_air_quality.show("IAQ:" + kitronik_air_quality.getAirQualityPercent() + "%", 3, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show("IAQ Score:" + kitronik_air_quality.getAirQualityScore(), 4, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show("eCO2: " + kitronik_air_quality.readeCO2(), 5, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show("gas sensor value: " + kitronik_air_quality.readGasRes(), 6, kitronik_air_quality.ShowAlign.Left)
})
// on-demand call for sensor data
input.onButtonPressed(Button.A, function () {
    kitronik_air_quality.clear()
    radio.sendNumber(0)
})
// call for sensor data every minute
timeanddate.onMinuteChanged(function () {
    radio.sendNumber(0)
})
radio.onReceivedValue(function (name, value) {
    kitronik_air_quality.show("Sta1", 1, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show(timeanddate.date(timeanddate.DateFormat.MD), 1, kitronik_air_quality.ShowAlign.Right)
    kitronik_air_quality.show(timeanddate.time(timeanddate.TimeFormat.HHMM24hr), 1, kitronik_air_quality.ShowAlign.Centre)
    if (name == "T") {
        tempC = value
    } else if (name == "RH") {
        humidity = value
    } else if (name == "DP") {
        dewPoint = value
    } else if (name == "PRESS") {
        pressure = value
    } else if (name == "WNDSPD") {
        windSpd = value
    } else if (name == "RAIN") {
        rain = value
    } else if (name == "UVA") {
        uva = value
    }
    showStationData()
})
function showStationData () {
    kitronik_air_quality.show("Temp: " + tempC + "°C", 2, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show("RH: " + humidity + "%", 3, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show("Dewpoint:" + dewPoint + "°C", 4, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show("Pressure: " + pressure + " hPa", 5, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show("Wind:" + windSpd + " mph", 6, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show("Rain: " + rain + " in", 7, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show("UVA: " + uva + " nm", 8, kitronik_air_quality.ShowAlign.Left)
}
// on logo press send CSV serial of outside and inside sensor data
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    let WindDir = 0
    serial.writeLine("" + timeanddate.dateTime() + "," + tempC + "," + humidity + "," + dewPoint + "," + pressure + "," + windSpd + "," + WindDir + "," + rain + "," + uva + "," + kitronik_air_quality.getAirQualityPercent() + "." + kitronik_air_quality.getAirQualityScore() + "," + kitronik_air_quality.readeCO2())
})
input.onButtonPressed(Button.AB, function () {
    kitronik_air_quality.clear()
    basic.showIcon(IconNames.No)
    kitronik_air_quality.setupGasSensor()
    kitronik_air_quality.calcBaselines()
    basic.showIcon(IconNames.Yes)
})
let uva = 0
let rain = 0
let windSpd = 0
let pressure = 0
let dewPoint = 0
let humidity = 0
let tempC = 0
radio.setGroup(1)
timeanddate.setDate(6, 7, 2023)
timeanddate.set24HourTime(13, 12, 0)
basic.showIcon(IconNames.SmallSquare)
