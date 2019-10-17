
import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import MessageCard from "../components/MessageCard";
import messages from "../messages.json";

export default class MessagesScreen extends React.Component {

  constructor(props) {
    super(props);
  }
  onGoToConversation(screen, screenProps) {
    this.props.navigation.navigate(screen, {
      screenProps
    })
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {messages.map(msg => {
          return (
            <MessageCard
              key={msg.id}
              onGoToConversation={this.onGoToConversation}
              name={`${msg.first_name} ${msg.last_name}`}
              last_message_date={msg.last_message_date}
              last_message_content={msg.last_message_content}
              avatar_url={msg.avatar_url}
            />
          );
        })}
      </ScrollView>
    );
  }

}

MessagesScreen.navigationOptions = {
  title: 'Messages'
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  contentContainer: { alignItems: "center", justifyContent: "center" },
  messageCardStyle: {
    margin: 5, padding: 5, width: "100%",
    shadowRadius: 5, shadowOpacity: 0.9, flexDirection: "row",
    alignItems: "center", backgroundColor: "white", justifyContent: "space-around",
    shadowColor: "rgba(0,0,0,0.2)", shadowOffset: { height: 5, width: 5 }
  },
  image: { width: 75, height: 75, borderWidth: 1, borderRadius: 37, borderColor: "grey" },
  cardTextContainer: { flex: 1, marginLeft: 10 },
  cardText: { flex: 1, width: "100%", flexDirection: "row", justifyContent: "space-between" }
});
