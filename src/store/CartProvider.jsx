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
			const existingCartItemIndexForRemove = state.items.findIndex(
				(item) => item.id === action.payload
			);

			const existingItem = state.items[existingCartItemIndexForRemove];
			const updatedAmountForRemove = state.totalAmount - existingItem.price;

			let updatedItemsForRemove;

			if (existingItem.amount === 1) {
				updatedItemsForRemove = state.items.filter((item) => item.id !== action.payload);
			} else {
				const updatedItemForRemove = { ...existingItem, amount: existingItem.amount - 1 };
				updatedItemsForRemove = [...state.items];
				updatedItemsForRemove[existingCartItemIndexForRemove] = updatedItemForRemove;
			}

			return { ...state, items: updatedItemsForRemove, totalAmount: updatedAmountForRemove };

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
