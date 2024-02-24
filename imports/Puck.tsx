import { View } from "react-native"

export default function(props: {
    puckPosition: { [key: string]: number }
}) {
    return <View style = {{ position: "absolute", left: props.puckPosition.x - 25, bottom: props.puckPosition.y - 25, width: 50, height: 50, borderRadius: 25, backgroundColor: "blue" }} />
}