function OrderSpeed (pos: number, v: number) {
    if (pos == 1) {
        if (Math.abs(v) > 10) {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CW, v)
        } else {
            motor.motorStop(motor.Motors.M1)
        }
    } else if (pos == 2) {
        if (Math.abs(v) > 10) {
            motor.MotorRun(motor.Motors.M2, motor.Dir.CW, v)
        } else {
            motor.motorStop(motor.Motors.M2)
        }
    } else if (pos == 3) {
        if (Math.abs(v) > 10) {
            motor.MotorRun(motor.Motors.M3, motor.Dir.CW, v)
        } else {
            motor.motorStop(motor.Motors.M3)
        }
    } else if (pos == 4) {
        if (Math.abs(v) > 10) {
            motor.MotorRun(motor.Motors.M4, motor.Dir.CW, v)
        } else {
            motor.motorStop(motor.Motors.M4)
        }
    } else {
        motor.motorStopAll()
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "mag") {
        magnitude = value * 255
    } else if (name == "ban") {
        angle = 0 - value
        angle = angle + 3.14 / 4
    } else if (name == "btn") {
        buttonNum = value
        if (value == 4) {
            turnV = 100
        } else if (value == 2) {
            turnV = -100
        } else {
            turnV = 0
        }
    } else {
    	
    }
})
let v4 = 0
let v3 = 0
let v2 = 0
let v1 = 0
let turnV = 0
let buttonNum = 0
let angle = 0
let magnitude = 0
radio.setGroup(1)
basic.forever(function () {
    v1 = magnitude * Math.cos(angle)
    v2 = magnitude * Math.sin(angle)
    v3 = magnitude * Math.sin(angle)
    v4 = magnitude * Math.cos(angle)
    OrderSpeed(1, v1 - turnV)
    OrderSpeed(2, v2 + turnV)
    OrderSpeed(3, v3 - turnV)
    OrderSpeed(4, v4 + turnV)
})
loops.everyInterval(100, function () {
    if (buttonNum == 1) {
        basic.showLeds(`
            # # . # #
            # # . # #
            # # . # #
            . . . . .
            . . . . .
            `)
    } else if (buttonNum == 3) {
        basic.showLeds(`
            . . . . .
            . . . . .
            # # . # #
            # # . # #
            # # . # #
            `)
    } else if (buttonNum == 2) {
        basic.showLeds(`
            . . . . .
            # . # # .
            # . # # .
            # . # # .
            . . . . .
            `)
    } else if (buttonNum == 4) {
        basic.showLeds(`
            . . . . .
            . # # . #
            . # # . #
            . # # . #
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            # # . # #
            # # . # #
            # # . # #
            . . . . .
            `)
    }
})
