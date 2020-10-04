import { StyleSheet, Dimensions } from "react-native";
const win = Dimensions.get("window");
const ratio = win.width / 541;

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundColor: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F9FC",
    height: "100%",
  },
  layout: {
    flexDirection: "row",
  },
  whiteBg: {
    backgroundColor: "#fff",
  },
  grayBg: {
    backgroundColor: "#F3F6FA",
  },
  boxShadow: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOpacity: 0.5,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 1 },
  },
  ListboxShadow: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.1,

    elevation: 2,
  },
  button: {
    marginTop: 35,
    marginBottom: 35,
    backgroundColor: "#1C43EB",
    padding: 12,
    color: "#fff",
    textAlign: "center",
    borderRadius: 10,
  },

  pickerItem: {
    width: "100%",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: "center",
    backgroundColor: "#F4F7FA",
  },
});
export default GlobalStyles;
