import { getResponse, RequestResponse } from "./helper";
import { RestClientInstance } from "./rest_client";

interface ListCall {
  (customerToken: CustomerToken): Promise<RequestResponse>
}
interface UpdateCall {
  (customerToken: CustomerToken, addressData: any): Promise<RequestResponse>
}
interface GetCall {
  (customerToken: CustomerToken, addressId: string|number): Promise<RequestResponse>
}
interface DeleteCall {
  (customerToken: CustomerToken, addressData: any): Promise<RequestResponse>
}

export interface AddressModule {
  list: ListCall
  update: UpdateCall
  get: GetCall
  delete: DeleteCall
}

export default function (restClient: RestClientInstance): AddressModule {
  let url = 'address/';

  const listCall: ListCall = function (customerToken) {
    url += `list?token=${customerToken}`
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  }
  const  updateCall: UpdateCall = function (customerToken, addressData) {
    url += `update?token=${customerToken}`
    return restClient.post(url, {address: addressData}).then((data)=> {
      return getResponse(data);
    });
  }
  const getCall: GetCall = function (customerToken, addressId) {
    url += `get?token=${customerToken}&addressId=${addressId}`
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  }
  const deleteCall: DeleteCall = function (customerToken, addressData) {
    url += `delete?token=${customerToken}`
    return restClient.post(url, {address: addressData}).then((data)=> {
      return getResponse(data);
    });
  }
  return {
    list: listCall,
    update: updateCall,
    get: getCall,
    delete: deleteCall
  };
}
