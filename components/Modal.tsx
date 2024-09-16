import { Recipe } from "@/types/RecipeType";
import { Image, Text, View, Modal } from "react-native";

type ModalProps = {
    recipe: Recipe | undefined,
    visible: boolean,
    onClose: () => void
}

const ModalCustom = ({ recipe, visible, onClose }: ModalProps) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
                {recipe?.title}
            </Text>
            <Image
                source={{ uri: recipe?.image }}
                resizeMode='cover'
                style={{ width: 300, height: 100 }}
            />
        </Modal>
    );
}

export default ModalCustom;