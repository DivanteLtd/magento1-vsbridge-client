import { RequestResponse } from "./helper";
import { RestClientInstance } from "./rest_client";

interface CeckCall {
  (sku: string|number): Promise<RequestResponse>
}

export interface StockModule {
  check: CeckCall
}

export default function (restClient: RestClientInstance): StockModule {
  const urlPrefix = 'stock/';
  let url = urlPrefix;
  function getResponse(data){
    if(data.code === 200){
      return data.result;
    }
    return false;
  }
  const checkCall: CeckCall = (sku) => {
    url += `check?sku=${sku}`;
    return restClient.get(url).then((data) => {
      return getResponse(data);
    });
  };
  return {
    check: checkCall
  };
};
