import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type RadioInputProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export const RadioInput = ({  selected, onPress }: RadioInputProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.radioCircle, selected && styles.selectedCircle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCircle: {
    backgroundColor: "#007AFF",
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});
