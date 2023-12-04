const KAKAO_API_KEY = 'cf9afe22b2ed0c12cf28475d1eb82d6b';

// 좌표로 주소 변환하기
export const getAddressFromCoords = (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  return fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    },
  )
    .then(result => result.json())
    .then(result => {
      if (result.meta.total_count === 0) {
        return null;
      }

      if (result.documents.length === 0) {
        return null;
      }

      const addressItem = result.documents[0];

      return addressItem.address.address_name;
    });
};

// 주소를 좌표로 변환하기
export const getCoordsFromAddress = (
  address: string,
): Promise<{latitude: number; longitude: number; address: string} | null> => {
  return fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    },
  )
    .then(result => result.json())
    .then(result => {
      if (result.meta.total_count === 0) {
        return null;
      }

      if (result.documents.length === 0) {
        return null;
      }

      const addressItem = result.documents[0];

      return {
        latitude: addressItem.y,
        longitude: addressItem.x,
        address: addressItem.address_name,
      };
    });
};

// 주소 자동검색
export const getCoordsFromKeyword = (
  keyword: string,
): Promise<{latitude: number; longitude: number; address: string} | null> => {
  return fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    },
  )
    .then(result => result.json())
    .then(result => {
      if (result.meta.total_count === 0) {
        return null;
      }

      if (result.documents.length === 0) {
        return null;
      }

      const addressItem = result.documents[0];

      return {
        latitude: addressItem.y,
        longitude: addressItem.x,
        address: addressItem.address_name,
      };
    });
};
