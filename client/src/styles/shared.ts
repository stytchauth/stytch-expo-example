import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 60,
  },
  loginBtn: {
    alignItems: "center",
    backgroundColor: "#19303D",
    height: 60,
    justifyContent: "center",
    color: "#fff",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "System",
  },
  button: {
    height: 45,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 3,
    marginBottom: 20,
  },
  buttonLight: {
    height: 45,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: "#19303D",
    borderWidth: 1,
    borderStyle: "solid",
  },
  buttonTextLight: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    fontFamily: "System",
    color: "#19303D",
  },
  buttonDark: {
    justifyContent: "center",
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: "#19303D",
  },
  buttonTextDark: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    fontFamily: "System",
    color: "#fff",
  },
  buttonDisabled: {
    justifyContent: "center",
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: "#E5E8EB",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "System",
  },
});

export default styles;
