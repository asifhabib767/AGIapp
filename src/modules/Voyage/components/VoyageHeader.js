import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import vessel from "../../Voyage/images/vessel.png";
import Icon from "react-native-vector-icons/FontAwesome5";
import { generateStringDateFromDate } from "../../Master/Util/DateConfigure";

const VoyageHeader = (props) => {
  // let headerData = props.route.params.headerProps;
  const [state, setState] = React.useState({
    vesselName: props.headerProps.strVesselName,
    voyageDate: props.headerProps.created_at,
    voyageNo: props.headerProps.intVoyageNo,
    cargoTypeName: props.headerProps.strCargoTypeName,
    cargoQty: props.headerProps.intCargoQty,
    fromPortName: props.headerProps.strFromPortName,
    toPortName: props.headerProps.strToPortName,
  });
  // const isFocused = useIsFocused();

  // const { navigate } = props.navigation;
  // const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await getInitialData();
    }
    fetchData();
  }, []);

  const getInitialData = async () => {
    console.log("Header state.propsData :>> ", props.headerProps.created_at);
    // console.log("Header state.propsData :>> ", state.propsData);
    // let fullObjectData = { ...state };
    // fullObjectData.shipConditionTypeListData = conditionTypeListData.data;
    // setState(fullObjectData);
  };

  return (
    <View style={[styles.akijnoorcardDetails]}>
      <View style={[styles.akijnoorcard]}>
        <View style={[styles.noorimg]}>
          <Image source={vessel} style={[styles.ibonboxtwo]} />
        </View>
        <View style={[styles.noortext]}>
          <Text style={[styles.akijnoor]}>{state.vesselName}</Text>
          <View style={[styles.cargoborder]}>
            <Text style={[styles.cargotstyle]}>
              {" "}
              <Icon name="toolbox" size={18} /> {"   "}
              {state.cargoTypeName} - {state.cargoQty}
            </Text>
            <Text style={[styles.cargotstyle]}>
              {" "}
              <Icon name="map-marker-alt" size={18} /> {"   "}
              {state.fromPortName} - {state.toPortName}
            </Text>
          </View>
        </View>

        <View>
          <Text style={[styles.noortextstyle]}>
            {generateStringDateFromDate(state.voyageDate)}
          </Text>
          <Text style={[styles.noortextstyle]}>Voyage No <Text style={styles.voyageNo}>#{state.voyageNo}</Text></Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  akijnoorcardDetails: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  akijnoorcard: {
    flex: 1,
    flexDirection: "row",
  },

  noortext: {
    flexBasis: "60%",
    paddingLeft: 20,
    marginTop: -20
  },
  noortextone: {
    flexBasis: "26%",
  },
  akijnoor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b91ed",

    paddingTop: 40,
    paddingLeft: 20,
  },
  noorimg: {
    flexBasis: "10%",
    marginTop: 30,
    // backgroundColor: 'gray',
  },
  noortextstyle: {
    paddingBottom: 10,
    textAlign: "right",
    fontSize: 14,
  },
  cargotstyle: {
    fontSize: 14,
    paddingTop: 10,
  },
  cargoborder: {
    width: 290,

    borderTopColor: "lightgray",
    borderTopWidth: 0.5,
    marginTop: 10,
  },
  voyageNo: {
    fontWeight: 'bold'
  }
});
export default VoyageHeader;
