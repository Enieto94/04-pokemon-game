import pokemonApi from "../api/pokemonApi";

// Creo un array de 649 posiciones
const getPokemons = () => {
	const pokemonsArr = Array.from(Array(650))
	// console.log(pokemonsArr)
	// Valores respectivo
	return pokemonsArr.map(( _ , index) => index + 1)
}

// Tomo los primeros cuatro pokemones
const getPokemonOptions = async () => {
	const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)
	// console.log(mixedPokemons)
	const pokemons = await getPokemonNames( mixedPokemons.splice(0, 4) )

	// console.table(pokemons)
	return pokemons
}

// Destructuring para mostrar los pokemons
const getPokemonNames = async ([a, b, c, d] = []) => {
	// const resp = await pokemonApi.get(`/1`)
	// console.log(resp.data.name, resp.data.id)
	// console.log(a,b,c,d)
	const promiseArr = [
		pokemonApi.get(`/${a}`),
		pokemonApi.get(`/${b}`),
		pokemonApi.get(`/${c}`),
		pokemonApi.get(`/${d}`),
	]
	const [p1, p2, p3, p4] = await Promise.all( promiseArr)

	// console.log(resps)
	return [
		{name: p1.data.name, id: p1.data.id},
		{name: p2.data.name, id: p2.data.id},
		{name: p3.data.name, id: p3.data.id},
		{name: p4.data.name, id: p4.data.id}
	]
}

export default getPokemonOptions