import { RestClientInstance } from "./rest_client";
import { getResponse, RequestResponse } from "./helper";

interface CreateCall {
  (customerToken: CustomerToken): Promise<RequestResponse>
}
interface UpdateCall {
  (customerToken: CustomerToken, cartId: string|number, cartItem: any): Promise<RequestResponse>
}
interface ApplyCouponCall {
  (customerToken: CustomerToken, cartId: string|number, coupon: string): Promise<RequestResponse>
}
interface DeleteCouponCall {
  (customerToken: CustomerToken, cartId: string|number): Promise<RequestResponse>
}
interface DeleteCall {
  (customerToken: CustomerToken, cartId: string|number, cartItem: any): Promise<RequestResponse>
}
interface PullCall {
  (customerToken: CustomerToken, cartId: string|number): Promise<RequestResponse>
}
interface TotalsCall {
  (customerToken: CustomerToken, cartId: string|number): Promise<RequestResponse>
}
interface ShippingInformationCall {
  (customerToken: CustomerToken, cartId: string|number, body: any): Promise<RequestResponse>
}
interface ShippingMethodsCall {
  (customerToken: CustomerToken, cartId: string|number, address: any): Promise<RequestResponse>
}
interface PaymentMethodsCall {
  (customerToken: CustomerToken, cartId: string|number): Promise<RequestResponse>
}
interface GetCouponCall {
  (customerToken: CustomerToken, cartId: string|number): Promise<RequestResponse>
}


export interface CartModule {
  create: CreateCall
  update: UpdateCall
  applyCoupon: ApplyCouponCall
  deleteCoupon: DeleteCouponCall
  delete: DeleteCall
  pull: PullCall
  totals: TotalsCall
  shippingInformation: ShippingInformationCall
  shippingMethods: ShippingMethodsCall
  paymentMethods: PaymentMethodsCall
  getCoupon: GetCouponCall
}

export default function (restClient: RestClientInstance): CartModule {
  let url = 'cart/';

  const createCall: CreateCall = (customerToken: CustomerToken) => {
    url += `create?token=${customerToken}`;
    return restClient.post(url).then((data)=> {
      return getResponse(data);
    });
  }
  const updateCall: UpdateCall = (customerToken: CustomerToken, cartId: string|number, cartItem: any) => {
    url += `update?token=${customerToken}&cartId=${cartId}`;
    return restClient.post(url, { cartItem: cartItem }).then((data)=> {
      return getResponse(data);
    });
  }
  const applyCouponCall: ApplyCouponCall = (customerToken: CustomerToken, cartId: string|number, coupon: string) => {
    url += `applyCoupon?token=${customerToken}&cartId=${cartId}&coupon=${coupon}`;
    return restClient.post(url).then((data)=> {
      return getResponse(data);
    });
  }
  const deleteCouponCall: DeleteCouponCall = (customerToken: CustomerToken, cartId: string|number) => {
    url += `deleteCoupon?token=${customerToken}&cartId=${cartId}`;
    return restClient.post(url).then((data)=> {
      return getResponse(data);
    });
  }
  const deleteCall: DeleteCall = (customerToken: CustomerToken, cartId: string|number, cartItem: any) => {
    url += `delete?token=${customerToken}&cartId=${cartId}`;
    return restClient.post(url, { cartItem: cartItem }).then((data)=> {
      return getResponse(data);
    });
  }
  const pullCall: PullCall = (customerToken: CustomerToken, cartId: string|number) => {
    url += `pull?token=${customerToken}&cartId=${cartId}`;
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  }
  const totalsCall: TotalsCall = (customerToken: CustomerToken, cartId: string|number) => {
    url += `totals?token=${customerToken}&cartId=${cartId}`;
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  }
  const shippingInformationCall: ShippingInformationCall = (customerToken: CustomerToken, cartId: string|number, body) => {
    url += `totals?token=${customerToken}&cartId=${cartId}`;
    return restClient.post(url, body).then((data)=> {
      return getResponse(data);
    });
  }
  const shippingMethodsCall: ShippingMethodsCall = (customerToken: CustomerToken, cartId: string|number, address) => {
    url += `shippingMethods?token=${customerToken}&cartId=${cartId}`;
    return restClient.post(url, { address: address }).then((data)=> {
      return getResponse(data);
    });
  }
  const paymentMethodsCall: PaymentMethodsCall = (customerToken: CustomerToken, cartId: string|number) => {
    url += `paymentMethods?token=${customerToken}&cartId=${cartId}`;
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  }
  const getCouponCall: GetCouponCall = (customerToken: CustomerToken, cartId: string|number) => {
    url += `coupon?token=${customerToken}&cartId=${cartId}`;
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  }
  return {
    create: createCall,
    update: updateCall,
    applyCoupon: applyCouponCall,
    deleteCoupon: deleteCouponCall,
    delete: deleteCall,
    pull: pullCall,
    totals: totalsCall,
    shippingInformation: shippingInformationCall,
    shippingMethods: shippingMethodsCall,
    paymentMethods: paymentMethodsCall,
    getCoupon: getCouponCall,
  };
}
