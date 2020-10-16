import React from "react";
import { Link } from "react-router-dom";

import "./../../styles/header.css";

const Header = () => {
	return (
		<header className="Header">
			<h1 className="title">NBA STATS</h1>
			<p className="sub-title">Everything that you need to know</p>
			<div id="nba-compact-logo">
				<Link to="/">
					<img
						width="50"
						alt="NBA Logo"
						src="./../../images/nba-compact-logo.svg"
					/>
				</Link>
			</div>
		</header>
	);
};

export default Header;
