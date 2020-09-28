module.exports = function (restClient, options) {
  let module = {};
  let url = options.urlPrefix || 'contact/';
  function getResponse(data){
    if(data.code === 200){
      return data.result;
    }
    return false;
  }
  module.submit = (form) => {
    url += `submit`;
    return restClient.post(url, {form}).then((data)=> {
      return getResponse(data);
    });
  };
  module.inquiry = (form) => {
    url += `inquiry`;
    return restClient.post(url, {form}).then((data)=> {
      return getResponse(data);
    });
  };
  return module;
};
