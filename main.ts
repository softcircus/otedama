function drop (数値: number) {
    rotate(数値)
    pins.servoWritePin(AnalogPin.P8, 180)
    basic.pause(500)
    pins.servoWritePin(AnalogPin.P8, 90)
    basic.pause(500)
}
function ceckWait () {
    if (wait < 5) {
        wireWait = wait
    }
    wait = wait - wireWait
    if (wait < 25) {
        basic.clearScreen()
    } else if (wait < 33) {
        basic.showArrow(ArrowNames.East)
        drop(160)
    } else if (wait < 41) {
        basic.showArrow(ArrowNames.South)
        drop(90)
    } else {
        basic.showArrow(ArrowNames.West)
        drop(20)
    }
}
function rotate (数値2: number) {
    if (angle != 数値2) {
        pins.servoWritePin(AnalogPin.P9, 数値2)
        angle = 数値2
        basic.pause(500)
    }
}
let lastWait = 0
let wait = 0
let wireWait = 0
let angle = 0
HX711.SetPIN_SCK(DigitalPin.P1)
HX711.SetPIN_DOUT(DigitalPin.P0)
HX711.begin()
HX711.set_scale(3000)
HX711.tare(10)
angle = -1
rotate(90)
pins.servoWritePin(AnalogPin.P8, 90)
wireWait = 0
basic.forever(function () {
    wait = HX711.get_units(5) * 4.05
    if (Math.abs(wait - lastWait) < 2) {
        ceckWait()
    }
    lastWait = wait
})
