import { getResponse, RequestResponse, CustomerToken } from "./helper";
import { RestClientInstance } from "./rest_client";

interface SubscribeCall {
  (customerToken: CustomerToken|undefined, productId: string|number, emailAddress?: string): Promise<RequestResponse>
}

interface AlertData {
  productId: string|number
  emailAddress?: string
}

export interface StockAlertModule {
  subscribe: SubscribeCall
}

export default function (restClient: RestClientInstance): StockAlertModule {
  let url = 'stockalert/';

  const subscribeCall: SubscribeCall = (customerToken = undefined, productId, emailAddress) => {
    url += `add`;

    if (typeof customerToken !== 'undefined' && customerToken) {
      url += `?token=${customerToken}`
    }

    let alertData: AlertData = {
      productId: productId
    }

    if (emailAddress) {
      alertData.emailAddress = emailAddress
    }

    return restClient.post(url, alertData).then((data)=> {
      return getResponse(data);
    });
  };
  return {
    subscribe: subscribeCall
  };
};
