// QUERY SELECTORS
const buttons = document.querySelectorAll('button')
const scores = document.querySelectorAll('.score')

// Names for Buttons
playBtn = buttons[0]
feedBtn = buttons[1]
bedBtn = buttons[2]
startBtn = buttons[3]
playAgainBtn = buttons[4]

// Names for Scores
boredScore = scores[0]
hungerScore = scores[1]
sleepyScore = scores[2]

// TAMAGOTCHI OBJECT
const tamagotchi = {
    hungry: 0,
    bored: 0,
    sleepy: 0,
    emotions: {
        happy: "(. ❛ ᴗ ❛.)",
        bothered: "(~_~メ)",
        eating: "(っ˘ڡ˘ς)",
        playing: "ᕕ( ᐛ )ᕗ",
        sleeping: "(︶｡︶✽)",
        gameOver: "(╯°□°）╯︵ ┻━┻"
    },
    iLive() {
        // bored timer
        const boredInterval = setInterval(() => { this.bored += 1 }, 1000)
        // hungry timer
        const hungryInterval = setInterval(() => { this.hungry += 2 }, 5000)
        //sleepy timer
        const sleepyInterval = setInterval(() => { this.sleepy += 15 }, 10000)
        // condition timer
        const condtitionInterval = setInterval(() => {
                boredScore.innerText = this.bored,
                hungerScore.innerText = this.hungry,
                sleepyScore.innerText = this.sleepy
            }, 16.7)
        // alive timer
        const aliveInterval = setInterval(() => {
            // check if tamagotchi is about to die
            if ((this.hungry > 20) || (this.bored > 20) || (this.sleepy > 20)) {
                // DOM to flip-table
                document.querySelector('.tamagotchi').innerText = `${this.emotions.gameOver}`
            }
            else if ((this.hungry > 10) || (this.bored > 10) || (this.sleepy > 10)) {
                // dom to bothered
                document.querySelector('.tamagotchi').innerText = `${this.emotions.bothered}`
            }
            else if ((this.hungry < 10) || (this.bored < 10) || (this.sleepy < 10)) {
                // dom to bothered
                document.querySelector('.tamagotchi').innerText = `${this.emotions.happy}`
            }
            // check if the tamagotchi is alive
            if ((this.hungry >= 30) || (this.bored >= 30) || (this.sleepy >= 30)) {
                // DOM to flip-table
                document.querySelector('.modal-tamagotchi').innerText=`${this.emotions.gameOver}`
                clearInterval(winGame)
                clearInterval(boredInterval)
                clearInterval(hungryInterval)
                clearInterval(sleepyInterval)
                clearInterval(condtitionInterval)
                clearInterval(aliveInterval)
                // the reset
                document.querySelector('.modal').style.display = "flex"
                this.bored = 0
                this.hungry = 0
                this.sleepy = 0
                document.querySelector('.tamagotchi').innerText = `${this.emotions.happy}`
            }
            // no value can be higher than 30
            // if the value is > 10, the tamagochi's div is replaced with the happy emotion string
            //if the value is over 10 tamagotchi div is replaced with a different emotion string

        }, 1000)
        //game win timer
        const winGame = setTimeout(
            () => {
                document.querySelector('.win-modal').style.display = "flex"
                clearInterval(boredInterval)
                clearInterval(hungryInterval)
                clearInterval(sleepyInterval)
                clearInterval(condtitionInterval)
                clearInterval(aliveInterval)
                // the reset
                document.querySelector('.modal').style.display = "flex"
                this.bored = 0
                this.hungry = 0
                this.sleepy = 0
                document.querySelector('.tamagotchi').innerText = `${this.emotions.happy}`
            }, 60000
        )
    },
    feedme() {
        if (this.hungry > 0) {
            this.hungry-=1
        }
        
    },
    playWithMe() {
        if (this.bored > 0) {
            this.bored -= 1
            this.hungry +=2
        }
    },
    sendMeToBed() {
        if (this.sleepy > 0) {
            this.sleepy -= 1
        }
    },
}

// starting the game
const start = () => {
    clearInterval(tamagotchi.iLive.boredInterval)
    clearInterval(tamagotchi.iLive.hungryInterval)
    clearInterval(tamagotchi.iLive.sleepyInterval)
    clearInterval(tamagotchi.iLive.condtitionInterval)
    clearInterval(tamagotchi.iLive.aliveInterval)
    tamagotchi.iLive()
    document.querySelector('.modal').style.display = "none"
    document.querySelector('.win-modal').style.display = "none"
}

// DOM change Tamagotchi based on button clicks && goes back to happy after setTimeout
const eating = () => {
    document.querySelector('.tamagotchi').innerText = `${tamagotchi.emotions.eating}`
}
const sleeping = () => {
    document.querySelector('.tamagotchi').innerText = `${tamagotchi.emotions.sleeping}`
}
const playing = () => {
    document.querySelector('.tamagotchi').innerText = `${tamagotchi.emotions.playing}`
}

// EVENT LISTENERS
startBtn.addEventListener("click", () => {start()})
playAgainBtn.addEventListener("click", () => {start()})
feedBtn.addEventListener("click", () => {
    tamagotchi.feedme()
    eating()
})
playBtn.addEventListener("click", () => {
    tamagotchi.playWithMe()
    playing()
})
bedBtn.addEventListener("click", () => {
    tamagotchi.sendMeToBed()
    sleeping()
})