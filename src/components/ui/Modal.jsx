import React from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const portalElem = document.getElementById("overlays");

const Modal = (props) => {
	return (
		<>
			{createPortal(<Backdrop onClose={props.onClose} />, portalElem)}
			{createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElem)}
		</>
	);
};

export default Modal;
