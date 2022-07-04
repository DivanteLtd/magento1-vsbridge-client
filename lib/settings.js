module.exports = function (restClient, options) {
  let module = {};
  let url = options.urlPrefix || 'settings/';
  function getResponse(data){
    if(data.code === 200){
      return data.result;
    }
    return false;
  }
  module.countries = () => {
    url += `countries`;
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  };
  return module;
};
