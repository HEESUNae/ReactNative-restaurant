import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  getAddressFromCoords,
  getCoordsFromAddress,
  getCoordsFromKeyword,
} from '../utils/GeoUtils';
import {SingleLineInput} from '../components/SingleLineInput';

export type MapRegionType = {
  latitude: number;
  longitude: number;
};

export const MainScreen: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [currentRegion, setCurrentRegion] = useState<MapRegionType>({
    latitude: 37.560214,
    longitude: 126.9775521,
  });
  const [currentAddress, setCurrentAddress] = useState<string | null>(null); // 좌표 주소

  // 지도에 위치 설정
  const onChangeLocation = useCallback<(item: MapRegionType) => Promise<void>>(
    async item => {
      setCurrentRegion({
        latitude: item.latitude,
        longitude: item.longitude,
      });

      // 좌표를 주소로 변환하기
      getAddressFromCoords(item.latitude, item.longitude).then(
        setCurrentAddress,
      );
    },
    [],
  );

  // 현재 내위치를 불러오는 로직
  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      onChangeLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [onChangeLocation]);

  // 키워드 겁색시 지도 위치 변경
  const onFindAddress = useCallback<() => Promise<void>>(async () => {
    console.log(query);
    const keywordResult = await getCoordsFromKeyword(query);
    if (keywordResult !== null) {
      setCurrentAddress(keywordResult.address);
      setCurrentRegion({
        latitude: parseFloat(keywordResult.latitude.toString()),
        longitude: parseFloat(keywordResult.longitude.toString()),
      });
      return;
    }

    const addressResult = await getCoordsFromAddress(query);
    if (addressResult === null) {
      console.error('주소값을 찾지 못했습니다.');
      return;
    }
    setCurrentAddress(addressResult.address);
    setCurrentRegion({
      latitude: parseFloat(addressResult.latitude.toString()),
      longitude: parseFloat(addressResult.longitude.toString()),
    });
  }, [query]);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onLongPress={e => {
          onChangeLocation(e.nativeEvent.coordinate);
        }}>
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
        />
      </MapView>

      <View
        style={{
          position: 'absolute',
          top: 70,
          left: 24,
          right: 24,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 8,
          }}>
          <SingleLineInput
            value={query}
            placeholder="주소를 입력해 주세요"
            onChangeText={setQuery}
            onSubmitEditing={onFindAddress}
          />
        </View>
      </View>

      {currentAddress !== null && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{currentAddress}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
