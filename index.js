const RestClient = require('./lib/rest_client').RestClient;
const user = require('./lib/user');
const cart = require('./lib/cart');
const order = require('./lib/order');
const stock = require('./lib/stock');
const contact = require('./lib/contact');
const wishlist = require('./lib/wishlist');
const stockAlert = require('./lib/stock_alert');
const newsletter = require('./lib/newsletter');
const address = require('./lib/address');
const settings = require('./lib/settings');

const MAGENTO_API_VERSION = 'V1';

module.exports.Magento1Client = function (options) {
  let instance = {
    addMethods (key, module) {
      let client = RestClient(options);
      if (module) {
        if (this[key])
          this[key] = Object.assign(this[key], module(client));
        else
          this[key] = module(client);
      }
    }
  };

  options.version = MAGENTO_API_VERSION;

  let client = RestClient(options);

  instance.user = user(client, options.user || {});
  instance.cart = cart(client, options.cart || {});
  instance.order = order(client, options.order || {});
  instance.stock = stock(client, options.stock || {});
  instance.contact = contact(client, options.contact || {});
  instance.wishlist = wishlist(client, options.wishlist || {});
  instance.stockAlert = stockAlert(client, options.stockAlert || {});
  instance.newsletter = newsletter(client, options.newsletter || {});
  instance.address = address(client, options.address || {});
  instance.settings = settings(client, options.settings || {});

  return instance;
};
