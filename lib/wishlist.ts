import { getResponse, RequestResponse } from "./helper";
import { RestClientInstance } from "./rest_client";

interface PullCall {
  (customerToken: CustomerToken): Promise<RequestResponse>
}

interface UpdateCall {
  (customerToken: CustomerToken, wishListItem): Promise<RequestResponse>
}

interface DeleteCall {
  (customerToken: CustomerToken, wishListItem): Promise<RequestResponse>
}

interface MoveToCartCall {
  (customerToken: CustomerToken, cartId: string|number, wishListItem: any): Promise<RequestResponse>
}

export interface WishlistModule {
  pull: PullCall
  update: UpdateCall
  delete: DeleteCall
  moveToCart: MoveToCartCall
}

export default function (restClient: RestClientInstance): WishlistModule {
  let url = 'wishlist/';

  const pullCall: PullCall = (customerToken) => {
    url += `pull?token=${customerToken}`;
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  };
  const updateCall: UpdateCall = (customerToken, wishListItem) => {
    url += `update?token=${customerToken}`;
    return restClient.post(url, {wishListItem: wishListItem}).then((data)=> {
      return getResponse(data);
    });
  };
  const deleteCall: DeleteCall = (customerToken, wishListItem) => {
    url += `delete?token=${customerToken}`;
    return restClient.post(url, {wishListItem: wishListItem}).then((data)=> {
      return getResponse(data);
    });
  };
  const moveToCartCall: MoveToCartCall = (customerToken, cartId, wishListItem) => {
    url += `moveToCart?token=${customerToken}&cartId=${cartId}`;
    return restClient.post(url, {wishListItem: wishListItem}).then((data)=> {
      return getResponse(data);
    });
  };
  return {
    pull: pullCall,
    update: updateCall,
    delete: deleteCall,
    moveToCart: moveToCartCall,
  };
};
