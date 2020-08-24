export default originalFiltersState => newFiltersState => {
  let realOFS = originalFiltersState;
  for(let i in newFiltersState) {
    realOFS[i] = newFiltersState[i]
  };
  let {
    reverse, 
    reverseType,
    searchType,
    searchData,
    onliNotAssigned,
    data, 
    carriers
  } = realOFS;
  searchData && (function searchFilter() {
    const findEquals = source => source.toLowerCase().indexOf(searchData.toLowerCase()) >= 0
    switch(searchType) {
      case 'number':

        data = data.filter(({number}) => +searchData[0] <= +number && +searchData[1] >= +number); // можно по лояльней
      break
      case 'date':
        const upDate = new Date(searchData[0]);
        const downDate = new Date(searchData[1]);
        data = data.filter(({receiveTime}) => {
          let workDate = new Date(receiveTime);
          return upDate <= workDate && workDate <= downDate
        })
       
      break
      case 'firm':
        data = data.filter(({firm}) => firm && findEquals(firm.name))
      break
      case 'comment':
        data = data.filter(({comment}) => comment && findEquals(comment.short))
      break
      case 'carrier':
        const thatIndexes = [];
        for(let men of carriers) {
          if(findEquals(men.secondName)) {
            thatIndexes.push(men.id)
          }
        };
        data = data.filter(({carrier}) => thatIndexes.includes(carrier));
      break
      default:
      console.log('%c%s','color: red; font-size:22px;', 'UNEXPECTED_FILTER_TYPE:', searchType)
    }
  })();

  onliNotAssigned && (function assignedFilter() {
    data = data.filter(({carrier}) => !carrier)
  })();

  function polaritiFilter() {
    const findSecondName = (id) => {
      let res;
      for(let men of carriers) {
        if(men.id === id) {
          res = men.secondName
          break
        }
      }
      return res;
    }

    switch(reverseType) {
      case 'carrier':
        data = data.sort(({carrier: cA}, {carrier: cB}) => {
          const A2Name = findSecondName(cA),
          B2Name = findSecondName(cB);
          return A2Name > B2Name
            ? 1
            : A2Name < B2Name
              ? -1
              : 0
        })
      break
      case 'number':
        data = data.sort(() => {

        })
      break
      case 'firm':
      break
      case 'comment':
      break
      default: 
      console.log('%c%s','color: red; font-size:22px;', 'UNEXPECTED_REVERSE_TYPE:', reverseType)
    }
    
  };

  return data
}