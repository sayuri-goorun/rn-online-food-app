/**
 * @file cart.js
 * @description Redux action for cart functionality
 */

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

/**
 * @method addToCart
 * @description Adds product item to cart
 * @param {String} product 
 * @returns {Promise}
 */
export const addToCart = product => {
  return { type: ADD_TO_CART, product: product };
};

export const removeFromCart = productId => {
  return { type: REMOVE_FROM_CART, pid: productId };
};
