import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import "./styles/PokemonCard.css";

const PokemonCard = ({ pokemonUrl }) => {
	const [pokemon, setPokemon] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const handleClickPokemon = () => {
		setTimeout(() => {
			setIsLoading(true);
			navigate(`/pokedex/${pokemon.id}`);
		}, 3000);
	};

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(pokemonUrl)
			.then((res) => {
				setPokemon(res.data);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);

	return (
		<article
			className={`pokemonCard border-${pokemon?.types[0].type.name}`}
			onClick={handleClickPokemon}>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					<section
						className={`pokemonCard__header bg-lg-${pokemon?.types[0].type.name}`}></section>
					<section className="pokemonCard__body">
						<div className="pokemonCard__img">
							<img
								src={pokemon?.sprites.other["official-artwork"].front_default}
								alt=""
							/>
						</div>
						<h3 className="pokemonCard__name">{pokemon?.name}</h3>
						<h4 className="pokemonCard__types">
							{pokemon?.types[0].type.name}{" "}
							{pokemon?.types[1] && `/ ${pokemon?.types[1].type.name}`}{" "}
						</h4>
						<h6 className="pokemonCard__type-subtitle">Tipo</h6>
						<hr className="pokemonCard__line" />
						<section className="pokemonCard__stats">
							{pokemon?.stats.map((stat) => (
								<div className="pokemonCard__stat" key={stat.stat.url}>
									<h5 className="pokemonCard__stat-name">{stat.stat.name}</h5>
									<h5 className="pokemonCard__stat-value">{stat.base_stat}</h5>
								</div>
							))}
						</section>
					</section>
				</div>
			)}
		</article>
	);
};

export default PokemonCard;
