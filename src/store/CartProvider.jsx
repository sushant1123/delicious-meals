import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
	items: [
		{ id: 1, amount: 2 },
		{ id: 2, amount: 4 },
	],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			const updatedItems = state.items.concat(action.payload);
			const updatedAmount = state.totalAmount + action.payload.amount * action.payload.price;
			state = { ...state, items: updatedItems, totalAmount: updatedAmount };
			break;

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
