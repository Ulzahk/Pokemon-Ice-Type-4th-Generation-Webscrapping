const puppeteer = require('puppeteer');
const pokeWebsite = 'https://pokemondb.net/pokedex/national';

const getDataFromWiki = async () =>{
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(pokeWebsite);
        let pokemonList = []
        for(let i = 0; i < 493; i++){ 
            let pokemonData =  await page.evaluate(value => document.getElementsByClassName('infocard-lg-data text-muted')[value].innerText, i)
            pokemonData = `{"id":"`+ pokemonData
                .replace(/\n+/, `", "name":"`)
                .replace(/\n+/, `", "type":"`) 
                + `"}` 
            pokemonList.push(JSON.parse(pokemonData))
        }

        let pokemonIce = pokemonList.filter((pokemon) =>{
            return pokemon.type.includes('Ice')
        })

        /* for(let i = 0; i < pokemonList.length; i++){
            if (pokemonList[i].includes('Ice')){
                pokemonIce.push(pokemonList[i])
            }
        }  */
        console.log(`Número total de pokemons tipo hielo en las primeras cuatro generaciones: ${pokemonIce.length}`)
        console.log('Lista de pokemons de las primeras cuatro generaciones: ')
        console.log(pokemonIce)
        await browser.close();
    } catch (error) {
        console.log(error)
    }
}

getDataFromWiki()