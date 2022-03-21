import React, { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
	const [btnIsBumped, setBtnIsBumped] = useState(false);

	const context = useContext(CartContext);

	const { items } = context;

	const numberOfCartItems = items.reduce((currVal, item) => currVal + item.amount, 0);

	const btnClasses = `${classes.button} ${btnIsBumped && classes.bump}`;

	useEffect(() => {
		if (items.length > 0) {
			setBtnIsBumped(true);
		}

		const timer = setTimeout(() => {
			setBtnIsBumped(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
