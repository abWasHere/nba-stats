import React from "react";
import { Link } from "react-router-dom";

import "./../../styles/header.css";

const Header = () => {
	return (
		<header className="Header">
			<h1>NBA STATS</h1>
			<strong>Everything that you need to know</strong>
			<div id="nba-compact-logo">
				<Link to="/">
					<img
						width="150"
						alt="NBA Logo"
						src="./../../images/nba-compact-logo.svg"
					/>
				</Link>
			</div>
		</header>
	);
};

export default Header;
