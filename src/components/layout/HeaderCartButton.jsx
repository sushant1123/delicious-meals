import React, { useContext } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
	const context = useContext(CartContext);

	const numberOfCartItems = context.items.reduce((currVal, item) => currVal + item.amount, 0);

	return (
		<button className={classes.button} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
