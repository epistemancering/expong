import { View } from "react-native"

export default function(props: { paddleY: number }) {
    return <View style = {{ position: "absolute", bottom: props.paddleY - 50, width: 5, height: 100, backgroundColor: "lime" }} />
}