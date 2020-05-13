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
  module.check = (sku, stockId) => {
    url += `check?sku=${sku}}`;
    if (stockId) {
      url += `&stockId=${stockId}`;
    }
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  };
  return module;
};
