import {View, Text} from 'react-native';
import React, {useCallback} from 'react';
import Header, {HeaderIcon, HeaderTitle} from '../components/Header';

const AddScreen = () => {
  const onPressBack = useCallback(() => {}, []);
  return (
    <View>
      <Header>
        <View>
          <HeaderIcon name="close" onPress={onPressBack} />
          <HeaderTitle title="Add" />
        </View>
      </Header>
      <Text>AddScreen</Text>
    </View>
  );
};

export default AddScreen;
