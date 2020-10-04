import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import topbar from '../../images/top-bar.png';
import {
  Datepicker,
  Toggle,
  Button,
  IndexPath,
  Layout,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import GlobalStyles from '../../../Master/styles/GlobalStyles';

const AddSupplier = () => {
  const [value, setValue] = React.useState('');

  const [date, setDate] = React.useState(new Date());

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <KeyboardAvoidingView style={[GlobalStyles.backgroundColor]}>
      <ScrollView>
        <View>
          <View style={[styles.postionbox]}>
            <ImageBackground style={[styles.topbar]} source={topbar} />
            <View style={[styles.headerDetails]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexBasis: '65%'}}>
                  <Text style={[styles.headerTitle]}> Add Supplier </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.container]}>
            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Contact Type"
              />
            </View>
            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Name"
              />
            </View>
            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Business Name"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Contact ID"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Tax Number"
              />
            </View>
            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Opening Balance"
              />
            </View>

            <View>
              <Select
                style={[styles.logInputStyle]}
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index)}>
                <SelectItem title="Pay Terms" />
                <SelectItem title="Option 2" />
                <SelectItem title="Option 3" />
              </Select>
            </View>

            <View>
              <Select
                style={[styles.logInputStyle]}
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index)}>
                <SelectItem title="Customer Group" />
                <SelectItem title="Option 2" />
                <SelectItem title="Option 3" />
              </Select>
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Credit Limit"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Email"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Mobile"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Alternative Mobile Number"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="City"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Status"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Country"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Landmark"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Custome filed 1"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Custome filed 2"
              />
            </View>

            <View>
              <TextInput
                style={[styles.logInputStyle]}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder="Shipping Address"
              />
            </View>

            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <Toggle checked={checked} onChange={onCheckedChange}>
                {`Checked: ${checked}`}
              </Toggle>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '45%'}}>
                <Button
                  style={styles.button}
                  size="large"
                  appearance="outline"
                  status="basic">
                  Back
                </Button>
              </View>
              <View style={{width: '45%'}}>
                <Button style={styles.button} size="large">
                  Save
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 15,
  },

  containers: {
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
  },

  topbar: {
    marginTop: -0,
    width: width,
    height: height / 4,
    resizeMode: 'contain',
  },
  postionbox: {
    position: 'relative',
  },
  headerDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

  headerTitle: {
    color: '#fff',
    fontSize: RFPercentage(4),
    fontWeight: 'normal',
    paddingVertical: 10,
  },
  button: {
    marginTop: 35,
  },
  emplyeeTitle: {
    color: '#202B35',
    fontSize: RFPercentage(2.7),
    fontWeight: 'bold',
    marginLeft: -5,
  },
  employeeid: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
    marginRight: 20,
  },
  employeeidguard: {
    color: '#202B35',
    fontSize: RFPercentage(2.5),
  },
  icon: {
    width: 32,
    height: 32,
  },
  logInputStyle: {
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 2,
    height: 55,
  },
});
export default AddSupplier;
