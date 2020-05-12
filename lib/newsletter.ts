import { getResponse, RequestResponse, CustomerToken } from "./helper";
import { RestClientInstance } from "./rest_client";

interface SubscribeCall {
  (emailAddress: string): Promise<RequestResponse>
}
interface UnsubscribeCall {
  (customerToken: CustomerToken): Promise<RequestResponse>
}


export interface NewsletterModule {
  subscribe: SubscribeCall,
  unsubscribe: UnsubscribeCall
}

export default function (restClient: RestClientInstance): NewsletterModule {
  let url = 'newsletter/';
  const subscribeCall: SubscribeCall = (emailAddress) => {
    url += `subscribe`;
    return restClient.post(url, {emailAddress: emailAddress}).then((data)=> {
      return getResponse(data);
    });
  };
  const unsubscribeCall: UnsubscribeCall = (customerToken) => {
    url += `unsubscribe?token=${customerToken}`;
    return restClient.post(url).then((data)=> {
      return getResponse(data);
    });
  };
  return {
    subscribe: subscribeCall,
    unsubscribe: unsubscribeCall
  };
};
