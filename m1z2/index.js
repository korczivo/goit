const {program} = require('commander')
const fs = require('fs').promises
const readline = require('readline')
const path = require('path')
require('colors')

const DEFAULT_MAX = 10;

program.option('-f, --file [string]', 'file for saving results', 'result.txt');

program.option('-m, --max-value [number]', 'max value for game', DEFAULT_MAX);

const {file, maxValue} = program.parse(process.argv).opts();

const logFile = path.join(__dirname, file)
const logFileDir = path.dirname(logFile)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
const generateRandomNumber = () => Math.floor((Math.random() * max)) + 1
let numberOfTries = 0;
const max = maxValue ? parseInt(maxValue) : DEFAULT_MAX
let numberToGuess = generateRandomNumber()
let isNewGame = true;

const logResult = async () => {
    try {
        await fs.appendFile(logFile, `${new Date().toLocaleString()} | Udało Ci się zgadnąć w ${numberOfTries} podejsciem | ${numberToGuess} \n`)
    } catch (err) {
        console.log(err)
        console.log("Nie udało zapisać się do pliku".red)
    }
}

const gameTick = () => {
    isNewGame = false
    rl.question(`Wprowadz liczbę od jeden do ${maxValue}: `.yellow, async value => {
        const parseGuess = parseInt(value);
        numberOfTries++
        if(value === 'quit' || value === 'q') {
            rl.close()
            return;
        }
        if(parseGuess === numberToGuess) {
            console.log('Wygrałeś'.green)
            await logResult()
            game()
            numberToGuess = generateRandomNumber()
        } else {
            console.log('Nie udało się'.red)
            gameTick()
        }
    })
}

const game = () => {
    if(isNewGame) {
        console.log(`Witaj w grze zgadnij liczbę od 1 do ${max}`)
    } else {
        console.log('Gramy dalej?')
    }
    numberOfTries = 0
    gameTick()
}

fs.access(logFileDir).catch(err => {
    fs.mkdir(logFileDir)
}).finally(() => {
    game()
})