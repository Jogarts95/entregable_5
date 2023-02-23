import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import './styles/Pokemon.css'

const Pokemon = () => {
  const [pokemon, setPokemon] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const {id} = useParams()

  const getPercentBar = (stat) => {
    const percent = (stat * 100 ) / 255
    return `${percent}%`
  }

  useEffect(() => {
    setIsLoading(true)
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false)
          setPokemon(res.data)
        }, 2000);
      })
      .catch((err) => console.log(err))
  }, [])
  
  if (isLoading) {
    <Loader/>
  }

  return (
    <main className={`pokemon border-${pokemon?.types[0].type.name}`}>
                                            {/* parte superior  */}
      <section className={`pokemon__header bg-lg-${pokemon?.types[0].type.name}`}>
        <section className='pokemon__img-body'>
          <div className='pokemon__img'>
            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
          </div>
        </section>
      </section>


                                                  {/* Body */}
    <section className='pokemon__body-id'>
        <h2 className={`pokemon__id text-${pokemon?.types[0].type.name}`}># {pokemon?.id}</h2>
        <h2 className={`pokemon__name text-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h2>
        {/* Peso y altura */}
        <div className='pokemon__data'>
          <div>
            <h5 className='pokemon__data-title'>Weigth</h5>
            <h4 className={`text-${pokemon?.types[0].type.name}`}>{pokemon?.weight}</h4>
          </div>
          <div>
            <h5 className='pokemon__data-title'>heigth</h5>
            <h4 className={`text-${pokemon?.types[0].type.name}`}>{pokemon?.height}</h4>
          </div>
        </div>

        {/* Información del tipo de pokemon */}
        <div className='pokemon__info'>
          <div className='pokemon-conteiner'>
            <h3 className='pokemon__info-title'>Type</h3>
            <div className='pokemon__info-conteiner-text'>
            {
              pokemon?.types.map(type => <div className={`pokemon__info-text bg-lg-${pokemon?.types[0].type.name}`} key={type.type.name}><span className='pokemon__info-span'>{type.type.name}</span></div> )
            }
            </div>
          </div>

          <div className='pokemon-conteiner'>
            <h3 className='pokemon__info-title'>Abilities</h3>
            <div className='pokemon__info-conteiner-text'>
            {
              pokemon?.abilities.map(ability => <div className={`pokemon__info-text bg-lg-${pokemon?.types[0].type.name}`} key={ability.ability.name}><span className='pokemon__info-span'>{ability.ability.name}</span></div>)
            }
            </div>
          </div>
        </div>

                                                  {/* Stats */}
        <section className={`pokemon__stats text-${pokemon?.types[0].type.name}`}>
          <h2 className='pokemon__stats-title'>Stats</h2>
          <section className='pokemon__stats-conteiner'>
            {
              pokemon?.stats.map(stat => (
              <article className='pokemon__stats-score' key={stat.stat.name}>
                  <div className='pokemon__stats-name'>
                    <h4 className='pokemon__stats-name-title'>{stat.stat.name}</h4>
                    <h5 className='pokemon__stats-name-subtitle'>{stat.base_stat}/255</h5>
                  </div>
                  {/* Barra de poder */}
                  <div className='pokemon__power'>
                    <div className='pokemon__power-conteiner'>
                      <div className='pokemon__power-nivel' style={{width: getPercentBar(stat.base_stat)}}></div>
                    </div>
                  </div>
              </article>
              ))
            }
          </section>
        </section>
      </section>
    </main>
  )
}

export default Pokemon