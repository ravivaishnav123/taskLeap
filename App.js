/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function shuffle(array) {
  var tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
}

const App: () => Node = () => {
  const arrAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const isDarkMode = useColorScheme() === 'dark';
  const [array, setArr] = useState([]);
  const [selectRow, setRow] = useState([]);
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  logicRenderRandomAlpha = index => {
    if (selectRow.includes(index)) {
      return;
    }
    if (selectRow.length == 2) {
      setRow([]);
      let arr = shuffle([...arrAlpha, ...arrAlpha]);
      setArr(arr);
    } else {
      setRow([...selectRow, index]);
    }

    //Winner

    if (selectRow.length > 0) {
      let item = selectRow[0];
      if (array[index] == array[item]) {
        Alert.alert('Congratulations!!! You win');
      }
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    let arr = shuffle([...arrAlpha, ...arrAlpha]);
    setArr(arr);
    console.log(arr);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{justifyContent: 'center'}}>
        <FlatList
          style={{alignSelf: 'center'}}
          numColumns={4}
          data={array}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logicRenderRandomAlpha(index);
                }}
                style={{
                  margin: 20,
                  backgroundColor: 'blue',
                  alignSelf: 'center',
                }}>
                <Text style={{fontSize: 20,color:"white" ,margin: 20}}>
                  {selectRow.includes(index) ? item : ''}
                </Text>
              </TouchableOpacity>
            );
          }}></FlatList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
