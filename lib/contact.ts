import { getResponse, RequestResponse } from "./helper";
import { RestClientInstance } from "./rest_client";

interface SubmitCall {
  (form): Promise<RequestResponse>
}

export interface ContactModule {
  submit: SubmitCall
}

export default function (restClient: RestClientInstance): ContactModule {
  let url = 'contact/';

  const submitCall: SubmitCall = (form) => {
    url += `submit`;
    return restClient.post(url, {form}).then((data)=> {
      return getResponse(data);
    });
  };
  return {
    submit: submitCall
  };
};
