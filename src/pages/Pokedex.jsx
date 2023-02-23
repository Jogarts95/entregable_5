import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import PokemonCard from "../components/pokedex/PokemonCard";
import './styles/Pokedex.css'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'

const Pokedex = () => {
	const [pokemons, setPokemons] = useState([]);
	const [pokemonsFilter, setPokemonsFilter] = useState([]);
	const [types, setTypes] = useState([]);
	const [selectType, setSelectType] = useState("");
	const [pokemonName, setPokemonName] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const nameTrainer = useSelector((store) => store.nameTrainer);

	const handeChangeSelect = (e) => {
		setSelectType(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setPokemonName(e.target.pokemonName.value);
	};

	const paginationLogic = () => {
		//Cantidad de pokemons por pagina
		const pokemonPerPage = 12;

		//pokemons que se van a mostrar en la pagina actual
		const sliceStart = (currentPage - 1) * pokemonPerPage;
		const sliceEnd = sliceStart + pokemonPerPage;
		const pokemonInPage = pokemonsFilter.slice(sliceStart, sliceEnd);

		//Ultima pagina
		const lastPage = Math.ceil(pokemonsFilter.length / pokemonPerPage) || 1;

		//Bloque Actual
		const pagesPerBlock = 5;
		const actualBlock = Math.ceil(currentPage / pagesPerBlock);

		//Paginas que se van a mostrar en el bloque actual
		const pagesInBlock = [];
		const minPage = actualBlock * pagesPerBlock - pagesPerBlock + 1;
		const maxPage = actualBlock * pagesPerBlock;

		for (let i = minPage; i <= maxPage; i++) {
			if (i <= lastPage) {
				pagesInBlock.push(i);
			}
		}

		return { pagesInBlock, lastPage, pokemonInPage };
	};

	const { pagesInBlock, lastPage, pokemonInPage } = paginationLogic();

	const handleNextPage = () => {
		setIsLoading(true);
		const nextPage = currentPage + 1;
		if (nextPage > lastPage) {
			setCurrentPage(1);
		} else {
			setCurrentPage(nextPage);
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	const handlePreviusPage = () => {
		setIsLoading(true);
		const newPage = currentPage - 1;
		if (newPage < 1) {
			setCurrentPage(lastPage);
		} else {
			setCurrentPage(newPage);
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	useEffect(() => {
		setIsLoading(true);
		const URL = `https://pokeapi.co/api/v2/${
			selectType ? `type/${selectType}/` : "pokemon/?limit=1279"
		}`;
		axios
			.get(URL)
			.then((res) => {
				if (selectType) {
					const pokemonByType = res.data.pokemon.map((pokemon) => {
						return {
							name: pokemon.pokemon.name,
							url: pokemon.pokemon.url,
						};
					});
					setPokemons(pokemonByType);
				} else {
					setPokemons(res.data.results);
				}
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, [selectType]);

	useEffect(() => {
		setIsLoading(true);
		const URL = "https://pokeapi.co/api/v2/type/";
		axios
			.get(URL)
			.then((res) => {
				setTypes(res.data.results);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, []);

	useEffect(() => {
		setIsLoading(true);
		const pokemonByName = pokemons.filter((pokemon) =>
			pokemon.name.includes(pokemonName.toLowerCase())
		);
		setPokemonsFilter(pokemonByName);

		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, [pokemonName, pokemons]);

	useEffect(() => {
		setCurrentPage(1);
	}, [pokemons]);

	return (
		<main className="pokedex">
			<p className="pokedex__title">
				<span>Welcome {nameTrainer},</span> here you can find information about
				your favorite pokemon
			</p>
			<form className="pokedex__form" onSubmit={handleSubmit}>
				<div className="pokedex__form-container">
					<div className="pokedex__btn-input">
						<input
							className="pokedex__input"
							type="text"
							id="pokemonName"
							placeholder="search your pokemon"
						/>
						<button className="pokedex__btn">Search</button>
					</div>
					<select className="pokedex__select" onChange={handeChangeSelect}>
						<option className="pokedex__option" value="">All pokemons</option>
						{types.map((type) => (
							<option key={type.url}>{type.name}</option>
						))}
					</select>
				</div>
			</form>
			<section className="pokedex__card">
				{isLoading ? (
					<Loader />
				) : (
					pokemonInPage.map((pokemon) => (
						<PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
					))
				)}
			</section>
			<section className="pokedex__pagination">
				<ul className="pokedex__list">
					<li className="pokedex__btn-pagination" onClick={handlePreviusPage}><FaArrowAltCircleLeft size={40}/></li>
					<li>...</li>
					{pagesInBlock.map((page) => (
						<li onClick={() => setCurrentPage(page)} className={page === currentPage ? "active" : ""} key={page}>
							{page}
						</li>
					))}
					<li>...</li>
					<li className="pokedex__btn-pagination" onClick={handleNextPage}><FaArrowAltCircleRight size={40}/></li>
				</ul>
			</section>
		</main>
	);
};

export default Pokedex;
