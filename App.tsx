import { GestureResponderEvent, Dimensions, StatusBar, View } from "react-native"
import { useState } from "react"
import Paddle from "./imports/Paddle"
import Puck from "./imports/Puck"

const screenDimensions = Dimensions.get("window")
let pressY: number

const onTouch = function(event: GestureResponderEvent) {
  pressY = screenDimensions.height - event.nativeEvent.pageY
  return true
}

export default function() {
  const state: [{
    rate: number,
    paddleY: number,
    puckPosition: { [key: string]: number },
    puckDirection: { [key: string]: number }
  }, Function] = useState({
    rate: 10,
    paddleY: screenDimensions.height / 2,
    puckPosition: { x: screenDimensions.width / 2, y: screenDimensions.height / 2 },
    puckDirection: { x: 1, y: 1 }
  })

  requestAnimationFrame(function() {
    if (pressY !== undefined) {
      const lowerLimit = state[0].paddleY - state[0].rate
      const upperLimit = state[0].paddleY + state[0].rate

      if (pressY > upperLimit) {
        state[0].paddleY = upperLimit
      } else if (pressY < lowerLimit) {
        state[0].paddleY = lowerLimit
      } else {
        state[0].paddleY = pressY
      }
    }

    const leftCollision = state[0].puckPosition.x < 30

    if (leftCollision || state[0].puckPosition.x > screenDimensions.width - 25) {
      state[0].puckDirection.x *= -1
      state[0].puckPosition.x += state[0].rate * state[0].puckDirection.x / 2

      if (leftCollision) {
        if (Math.abs(state[0].puckPosition.y - state[0].paddleY) > 50) {
          state[0].rate /= 1.1
        } else {
          state[0].rate *= 1.1
        }
      }
    }

    if (state[0].puckPosition.y < 25 || state[0].puckPosition.y > screenDimensions.height - 25) {
      state[0].puckDirection.y *= -1
      state[0].puckPosition.t += state[0].rate * state[0].puckDirection.y / 2
    }

    state[0].puckPosition.x += state[0].rate * state[0].puckDirection.x / 2
    state[0].puckPosition.y += state[0].rate * state[0].puckDirection.y / 2

    state[1]({ ...state[0] })
  })

  return <>
    <StatusBar />
    <View style = {{ height: "100%" }} onStartShouldSetResponder = {onTouch} onResponderMove = {onTouch} onResponderRelease = {() => pressY = undefined}>
      <View style = {{ position: "absolute", width: 5, height: "100%", backgroundColor: "red" }} />
      <Paddle paddleY = {state[0].paddleY} />
      <Puck puckPosition = {state[0].puckPosition} />
    </View>
  </>
}