const FORESTRY_LOAD = 'crm/forestry/FORESTRY_LOAD';
const FORESTRY_SUCCESS = 'crm/forestry/FORESTRY_SUCCESS';
const FORESTRY_FAIL = 'crm/forestry/FORESTRY_FAIL';
const FORESTRY_BY_DATE_LOAD = 'crm/forestry/FORESTRY_BY_DATE_LOAD';
const FORESTRY_BY_DATE_SUCCESS = 'crm/forestry/FORESTRY_BY_DATE_SUCCESS';
const FORESTRY_BY_DATE_FAIL = 'crm/forestry/FORESTRY_BY_DATE_FAIL';

const initial = {
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case FORESTRY_LOAD:
      return {
        ...state,
        isFetching: true
      };
    case FORESTRY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        forestryInfo: action.result.data
      };
    case FORESTRY_FAIL:
      return {
        ...state,
        isFetching: false,
        forestryLoadError: action.error
      };
    case FORESTRY_BY_DATE_LOAD:
      return {
        ...state,
        isFetching: true
      };
    case FORESTRY_BY_DATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        forestryByDateInfo: action.result.data
      };
    case FORESTRY_BY_DATE_FAIL:
      return {
        ...state,
        isFetching: false,
        forestryByDateLoadError: action.error
      };
    default:
      return state;
  }
}


// 获取林业数据
export function getForestryInfo(startDate, endDate, nodeNo) {
  return {
    types: [FORESTRY_LOAD, FORESTRY_SUCCESS, FORESTRY_FAIL],
    promise: client => client.post('/forestry/getForestryInfoByDateAndNode', {
      data: {
        startDate: startDate,
        endDate: endDate,
        nodeNo: nodeNo
      }
    })
  };
}

// 获取林业数据
export function getForestryInfoByDate(startDate, endDate) {
  return {
    types: [FORESTRY_BY_DATE_LOAD, FORESTRY_BY_DATE_SUCCESS, FORESTRY_BY_DATE_FAIL],
    promise: client => client.post('/forestry/getForestryInfoByDate', {
      data: {
        startDate: startDate,
        endDate: endDate
      }
    })
  };
}
