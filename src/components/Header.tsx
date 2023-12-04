import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import Icon from './Icon';

interface HeaderProps {
  children: React.ReactElement;
}

export const HeaderTitle: React.FC<{title: string}> = ({title}) => {
  return <Text>{title}</Text>;
};

export const HeaderIcon: React.FC<{
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}> = ({name, size, color, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </Pressable>
  );
};

const Header: React.FC<HeaderProps> = ({children}) => {
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => (
        <View style={{paddingTop: insets?.top, backgroundColor: 'orange'}}>
          <View style={styles.headerContainer}>{children}</View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    justifyContent: 'center',
    padding: 10,
  },
});
