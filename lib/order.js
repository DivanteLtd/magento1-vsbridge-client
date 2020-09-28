module.exports = function (restClient, options) {
  let module = {};
  let url = options.urlPrefix || 'order/';
  function isResponseValid(data) {
    return data.code === 200;
  }
  function getResponse(data){
    if(isResponseValid(data)){
      return data.result;
    }
    return false;
  }
  module.create = (orderData) => {
    url += `create`;
    return restClient.post(url, orderData).then((data)=> {
      if (isResponseValid(data)) {
        data.result = {
          magentoOrderId: data.result,
          backendOrderId: data.result,
          transferedAt: new Date()
        };
      }
      return getResponse(data);
    });
  }
  return module;
}
