/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  ActivityIndicator,
  Pressable,
  Text,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Table, Row} from 'react-native-table-component';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const filedata = require('./myjsonfile.json');
  type DataType = {
    LOGICALREF: string;
    DATE_: string;
    FICHENO: string;
    FICHETYPE: string;
    CODE: string;
    DEFINITION_: string;
    NETTOTAL: string;
  };

  const tableHead = [
    'LOGICALREF',
    'DATE_',
    'FICHENO',
    'FICHETYPE',
    'CODE',
    'DEFINITION_',
    'NETTOTAL',
  ];
  const widthArr = [80, 120, 120, 120, 120, 120, 120];

  const filterData = (text: string) => {
    if (text) {
      const filteredData = filedata.map((obj: DataType) => {
        const d1 = obj.DATE_.split(' ')[0];
        const d2 = text;
        if (d1 === d2) {
          console.log('' + obj.DATE_ + '::' + text);
          return Object.values(obj);
        }
      });

      setData(filteredData);
    } else {
      getReport();
    }
  };

  const getReport = () => {
    const tableData = filedata.map((obj: DataType[]) => Object.values(obj));
    setData(tableData);
  };

  const [data, setData] = useState([]);
  const [filterText, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Pressable onPress={() => getReport()} style={styles.button}>
        <Text style={styles.buttontext}>{'Get Report'}</Text>
      </Pressable>
      <TextInput
        onChangeText={newText => setText(newText)}
        style={styles.input}
        placeholder="Enter Date"
      />
      <Pressable onPress={() => filterData(filterText)} style={styles.button}>
        <Text style={styles.buttontext}>{'Filter Report'}</Text>
      </Pressable>

      <ActivityIndicator animating={isLoading} />
      <ScrollView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          horizontal={true}
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Table borderStyle={styles.tableBorder}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <Table borderStyle={styles.borderStyle}>
              {data.map((rowData: any, index: any) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={index % 2 ? styles.row_color1 : styles.row_color2}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  borderStyle: {borderWidth: 4, borderColor: 'teal'},
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#A0E9FF'},
  text: {textAlign: 'center', fontWeight: '100', color: '#000'},
  dataWrapper: {marginTop: -1},
  row_color1: {height: 40, backgroundColor: '#E7E6E1'},
  row_color2: {height: 40, backgroundColor: '#F7F6E7'},
  tableBorder: {borderWidth: 1, borderColor: '#C1C0B9'},
  input: {
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#A0E9FF',
  },
  button: {
    width: '90%',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: '#A0E9FF',
  },
  buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
export default App;
