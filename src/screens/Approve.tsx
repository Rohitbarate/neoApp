import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import {SERVICES} from '../data';
import {ListCollapse} from 'lucide-react-native';

const renderItem = ({item}) => {
  return (
    <View key={item.id} style={styles.serviceContainer}>
      <Image
        resizeMethod="scale"
        resizeMode="contain"
        source={item.img}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );
};

const Approve = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        paddingHorizontal: 12,
        backgroundColor: '#f4f4f4',
        paddingVertical: 12,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        rowGap: 12,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
        }}>
        <Text style={{color: '#000'}}>Recents</Text>
        <ListCollapse color={'#000'} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
        }}>
        <FlatList
          contentContainerStyle={{
            alignContent: 'center',
            justifyContent: 'space-evenly',
            rowGap: 24,
            width: '100%',
            alignItems: 'center',
          }}
          data={SERVICES}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
        />
      </View>
    </View>
  );
};

export default Approve;

const styles = StyleSheet.create({
  serviceContainer: {
    flexBasis: '35%',
    alignItems: 'center',
    // paddingHorizontal: 12,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 8,
    // borderWidth: 1,
    // borderColor: '#000',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    color: '#000',
  },
});
