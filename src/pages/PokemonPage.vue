<template>
	<div v-if="!pokemon"></div>
	<div v-else>
		<h1>¿Quién es este pokemon?</h1>

		<!-- TODO: img -->
		<pokemon-picture 
			:pokemonId="pokemon.id"
			:showPokemon="showPokemon">
		</pokemon-picture>
		<!-- TODO: Opciones -->
		<PokemonOptions 
			:pokemons="pokemonArr"
			@selection-pokemon="checkAnswer"/>

		<template v-if="showAnswer">

			<p class="fade-in">{{message}}</p>

			<button @click="newGame">
				Reiniciar Juego
			</button>
		</template>
	</div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'

import getPokemonOptions from '@/helpers/getPokemonOptions'
// console.log(getPokemonOptions()) // => promesa que funciona

export default {
	components: {
		PokemonOptions,
		PokemonPicture
	},
	data() {
		return {
			pokemonArr: [],
			pokemon: null,
			showPokemon: false,
			showAnswer: false,
			message: ''
		}
	},
	methods: {
		async mixPokemonArray() {
			this.pokemonArr = await getPokemonOptions()
			// console.log(this.pokemonArr)
			const rndInt = Math.floor( Math.random() * 4 )
			this.pokemon = this.pokemonArr[rndInt]
		},
		checkAnswer( selectedId) {
			this.showPokemon = true
			this.showAnswer = true

			if(selectedId === this.pokemon.id){
				this.message = `Correcto,  ${this.pokemon.name}`
			}else{
				this.message= `Oh no :( era ${this.pokemon.name}`
			}
		},
		newGame() {
			this.showPokemon = false
			this.showAnswer = false
			this.pokemonArr = []
			this.mixPokemonArray()
		}
	},
	mounted(){
		this.mixPokemonArray()
	}
}
</script>

<style>

</style>