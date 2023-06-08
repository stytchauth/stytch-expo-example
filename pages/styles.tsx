import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    gap: 10,
  },
  button: {
    justifyContent: "center",
    height: 45,
    borderRadius: 3,
    backgroundColor: "#19303D",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    fontFamily: "System",
    color: "#fff",
  },
  buttonDisabled: {
    justifyContent: "center",
    height: 45,
    borderRadius: 3,
    backgroundColor: "#E5E8EB",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    fontFamily: "System",
  },
  input: {
    height: 50,
    borderWidth: 1,
    fontSize: 18,
    padding: 15,
  },
  helperText: {
    color: "#8296A1",
  },
  errorText: {
    color: "#892426",
    fontWeight: "600",
    fontFamily: "System",
  },
});
