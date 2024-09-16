import { useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Recipe = () => {

    const {id} = useGlobalSearchParams()


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
            <View>
                <Text>{id}</Text>
            </View>
        </SafeAreaView>
    );
}

export default Recipe;