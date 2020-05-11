import { getResponse, RequestResponse } from "./helper";
import { RestClientInstance } from "./rest_client";

interface EmailData {
  email: string
}
interface PasswordData {
  token: string
  body: string
}

interface LoginCall {
  (userData: any): Promise<RequestResponse>
}
interface ResetPasswordCall {
  (emailData: EmailData): Promise<RequestResponse>
}
interface ChangePasswordCall {
  (passwordData: PasswordData): Promise<RequestResponse>
}
interface CreateCall {
  (userData: any): Promise<RequestResponse>
}
interface CreditValueCall {
  (customerToken: CustomerToken): Promise<RequestResponse>
}
interface RefillCreditCall {
  (customerToken: CustomerToken, creditCode: string|any): Promise<RequestResponse>
}
interface OrderHistoryCall {
  (customerToken: CustomerToken, page?: string|number, pageSize?: string|number): Promise<RequestResponse>
}
interface UpdateCall {
  (userData: any): Promise<RequestResponse>
}
interface MeCall {
  (customerToken: CustomerToken): Promise<RequestResponse>
}

export interface UserModule {
  login :LoginCall
  resetPassword :ResetPasswordCall
  changePassword :ChangePasswordCall
  create :CreateCall
  creditValue :CreditValueCall
  refillCredit :RefillCreditCall
  orderHistory :OrderHistoryCall
  update :UpdateCall
  me :MeCall
}

export default function (restClient: RestClientInstance): UserModule {
  let url = 'user/';

  const loginCall: LoginCall = function (userData) {
    url += 'login';
    return restClient.post(url, userData).then((data)=> {
      return getResponse(data);
    });
  }
  const resetPasswordCall: ResetPasswordCall = function (emailData) {
    url += `resetPassword`;
    return restClient.post(url, {email: emailData.email}).then((data)=> {
      return getResponse(data);
    });
  }
  const changePasswordCall: ChangePasswordCall = function (passwordData) {
    url += `changePassword?token=${passwordData.token}`;
    return restClient.post(url, passwordData.body).then((data)=> {
      return getResponse(data);
    });
  }
  const createCall: CreateCall = function (userData) {
    url += `create`;
    return restClient.post(url, userData).then((data)=> {
      return getResponse(data);
    });
  }
  const creditValueCall: CreditValueCall = function (customerToken) {
    const getCreditUrl = `user_credit/get?token=${customerToken}`

    return restClient.get(getCreditUrl).then((data)=> {
      return getResponse(data);
    });
  }
  const refillCreditCall: RefillCreditCall = function (customerToken, creditCode) {
    const getCreditUrl = `user_credit/refill?token=${customerToken}`

    return restClient.post(getCreditUrl, {credit_code: creditCode}).then((data)=> {
      return getResponse(data);
    });
  }
  const orderHistoryCall: OrderHistoryCall = function (customerToken, page, pageSize) {
    url += `orderHistory?token=${customerToken}`;

    if (page) {
      url += `&page=${page}`
    }

    if (pageSize) {
      url += `&pageSize=${pageSize}`
    }

    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  }
  const updateCall: UpdateCall = function (userData) {
    url += `me?token=${userData.token}`
    return restClient.post(url, userData.body).then((data)=> {
      return getResponse(data);
    });
  }
  const meCall: MeCall = function (customerToken) {
    const url = `user/me?token=${customerToken}`
    return restClient.get(url).then((data)=> {
      return getResponse(data);
    });
  }
  return {
    login: loginCall,
    resetPassword: resetPasswordCall,
    changePassword: changePasswordCall,
    create: createCall,
    creditValue: creditValueCall,
    refillCredit: refillCreditCall,
    orderHistory: orderHistoryCall,
    update: updateCall,
    me: meCall,
  };
}
