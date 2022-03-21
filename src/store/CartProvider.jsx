import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			const existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);

			const existingCartItem = state.items[existingCartItemIndex];
			let updatedItem;
			let updatedItems;

			if (existingCartItem?.id) {
				updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.payload.amount,
				};

				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				updatedItem = { ...action.payload };
				updatedItems = state.items.concat(updatedItem);
			}

			const updatedAmount = state.totalAmount + action.payload.amount * action.payload.price;
			return { ...state, items: updatedItems, totalAmount: updatedAmount };

		case "REMOVE":
			return { ...state, items: state.items.filter((item) => item.id !== action.payload) };

		default:
			return state;
	}
};

const CartProvider = (props) => {
	const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = (item) => {
		dispatchCart({ type: "ADD", payload: item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCart({ type: "REMOVE", payload: id });
	};

	const cartContextValues = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return <CartContext.Provider value={cartContextValues}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
