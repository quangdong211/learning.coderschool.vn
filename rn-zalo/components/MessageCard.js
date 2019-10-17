import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
const MessageCard = props => {
    return (
        <TouchableOpacity
            style={styles.messageCardStyle}
            onPress={() => props.onGoToConversation('Conversation', { ...props })}>
            <View style={styles.cardText}>
                <Image
                    style={styles.image}
                    source={{ uri: props.avatar_url }} />
                <View>
                    <Text>
                        {props.name}
                    </Text>
                    <Text>
                        {props.last_message_date}
                    </Text>
                    <Text
                    >
                        {props.last_message_content}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default MessageCard;
const styles = StyleSheet.create({
    messageCardStyle: {
        margin: 5, padding: 5, width: "100%", shadowRadius: 5, shadowOpacity: 0.9, flexDirection: "row", alignItems: "center", backgroundColor: "white",
        justifyContent: "space-around", shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { height: 5, width: 5 }
    },
    image: { width: 75, height: 75, borderWidth: 1, borderRadius: 37, borderColor: "grey" }, cardTextContainer: { flex: 1, marginLeft: 10 },
    cardText: { flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-between" }
});