import { getResponse, isResponseValid, RequestResponse } from "./helper";
import { RestClientInstance } from "./rest_client";

interface CreateCall {
  (oderData: any): Promise<RequestResponse>
}

export interface OrderModule {
  create: CreateCall
}

export default function (restClient: RestClientInstance): OrderModule {
  let url = 'order/';

   const createCall:CreateCall  = (orderData) => {
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
  return {
    create: createCall
  };
}
