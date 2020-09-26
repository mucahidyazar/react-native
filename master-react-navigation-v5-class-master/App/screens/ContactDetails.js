import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ContactDetails = ({ route }) => {
  const contactInfo = route.params.contact;

  return (
    <View>
      <Text>{JSON.stringify(contactInfo, null, 2)}</Text>
    </View>
  );
};

export default ContactDetails;

const styles = StyleSheet.create({});
