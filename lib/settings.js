module.exports = function (restClient) {
  let module = {};
  const urlPrefix = 'settings/';
  let url = urlPrefix;
  function getResponse(data){
    if(data.code === 200){
      return data.result;
    }
    return false;
  }
  module.countries = (sku) => {
    url += `countries`;
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  };
  return module;
};
