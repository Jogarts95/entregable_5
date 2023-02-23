import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { setNameTrainerGlobal } from "../slices/nameTrainer.slice";
import "./styles/Home.css";

const Home = () => {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		setIsLoading(true);
		setTimeout(() => {
		e.preventDefault();
		const nameTrainer = e.target.nameTrainer.value;
		dispatch(setNameTrainerGlobal(nameTrainer));

        setIsLoading(false);
        }, 4000);
	};

	return (
		<section className="home">
			{isLoading ? (
				<Loader />
			) : (
				<main className="home__container">
					<div className="home__img">
						<img src="/images/pokedex.png" alt="" />
					</div>
					<div className="home__base-container">
						<h2 className="home__title">Hello trainer!</h2>
					<p className="home__subtitle">Give me your name to start!</p>
					<form className="home__form" onSubmit={handleSubmit}>
						<input className="home__input" id="nameTrainer" type="text" placeholder="your name..." />
						<button className="home__btn">Start</button>
					</form>
					</div>
				</main>
			)}
		</section>
	);
};

export default Home;
