module.exports = function (restClient) {
  let module = {};
  const urlPrefix = 'stock/';
  let url = urlPrefix;
  function getResponse(data){
    if(data.code === 200){
      return data.result;
    }
    return false;
  }
  module.check = (stock) => {
    url += `check?sku=${stock.sku}}`;
    if (stock.stockId) {
      url += `&stockId=${stock.stockId}`;
    }
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  };
  return module;
};
