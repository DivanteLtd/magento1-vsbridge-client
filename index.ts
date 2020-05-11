import { RestClient, RestClientInstance, RestClientOptions } from "./lib/rest_client";
import cart, { CartModule } from "./lib/cart";
import address, { AddressModule } from "./lib/address";
import order, { OrderModule } from "./lib/order";
import newsletter, { NewsletterModule } from "./lib/newsletter";
import user, { UserModule } from "./lib/user";
import stock, { StockModule } from "./lib/stock";
import contact, { ContactModule } from "./lib/contact";
import wishlist, { WishlistModule } from "./lib/wishlist";
import stockAlert, { StockAlertModule } from "./lib/stock_alert";

const MAGENTO_API_VERSION = 'V1';

interface Magento1ClientInstance {
  user: UserModule
  cart: CartModule
  order: OrderModule
  stock: StockModule
  contact: ContactModule
  wishlist: WishlistModule
  stockAlert: StockAlertModule
  newsletter: NewsletterModule
  address: AddressModule
  addMethods: (key: string, module: (restClient: RestClientInstance) => Record<string, (...params: any[]) => any>) => void
}

export function Magento1Client(options: RestClientOptions): Magento1ClientInstance {
  options.version = MAGENTO_API_VERSION;
  let client = RestClient(options);

  return {
    addMethods (key, module) {
      if (module) {
        if (this[key])
          this[key] = Object.assign(this[key], module(client));
        else
          this[key] = module(client);
      }
    },
    user: user(client),
    cart: cart(client),
    order: order(client),
    stock: stock(client),
    contact: contact(client),
    wishlist: wishlist(client),
    stockAlert: stockAlert(client),
    newsletter: newsletter(client),
    address: address(client)
  };
};
