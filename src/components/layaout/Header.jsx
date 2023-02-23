import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logOut } from "../../slices/nameTrainer.slice";
import Loader from "../Loader";
import "./style/Header.css";

const Header = () => {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const handleClickLogOut = () => {
		setIsLoading(true);
		setTimeout(() => {
			dispatch(logOut());
			setIsLoading(false);
		}, 3000);
	};

	return (
		<header className="header">
			{isLoading && <Loader />}
			<div className="header__red">
				<div className="header__img">
					<img src="/images/pokedex.png" alt="" />
				</div>
			</div>
			<div className="header__black">
				<div className="header__pokeball">
					<button className="header__btn" onClick={handleClickLogOut}>
						<FaTimesCircle size={40}/>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
