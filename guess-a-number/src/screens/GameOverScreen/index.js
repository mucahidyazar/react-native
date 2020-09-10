import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import BodyText from "../../views/components/BodyText";
import TitleText from "../../views/components/TitleText";
import colors from "../../constants/colors";
import MainButton from "../../views/components/MainButton";

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require("../../../assets/png/success.png")}
          //NETWORK IMAGE
          // fadeDuration={1000} //default
          // source={{
          //   uri:
          //     "https://images.pexels.com/photos/5238059/pexels-photo-5238059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          // }}
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={onRestart}>NEW GAME</MainButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highlight: {
    color: colors.primary,
    fontWeight: "bold",
  },
  resultContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
});
