import React from "react";
import meals from "../../assets/meals.jpg";
import classes from "./header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
	return (
		<>
			<header className={classes.header}>
				<h1>DeliciousMeals</h1>
				<HeaderCartButton />
			</header>
			<div className={classes["main-image"]}>
				<img src={meals} alt="meals-img" />
			</div>
		</>
	);
};

export default Header;
