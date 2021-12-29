

let deckId = ''
getDeck()
function getDeck() {
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json()) 
.then(data => { 
    console.log(data)
    deckId = data.deck_id
}) 
.catch(err => { 
    console.log(`error ${err}`) 
}); 

}

document.querySelector('button').addEventListener('click', getFetch) 

function getFetch(){ 
     
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2` 
    
    fetch(url)
    .then(res => res.json()) 
    .then(data => { 
        console.log(data)
        let val1 = data.cards[0].value 
        let val2 = data.cards[1].value 
        let realValue1 = Number(cardsValue(val1))
        let realValue2 = Number(cardsValue(val2))
        console.log(realValue1)
        console.log(realValue2)
        document.querySelector("h4").innerText = `Cards remaining: ${data.remaining}`
        document.querySelector("#player1Points").innerText = `Card is worth ${realValue1} points`
        document.querySelector("#player2Points").innerText = `Card is worth ${realValue2} points`

        document.querySelector("#player1").src = data.cards[0].image
        document.querySelector("#player2").src = data.cards[1].image
        if (realValue1 > realValue2) {
            document.querySelector("h2").innerText = "Player 1 won"
        } else if (realValue1 < realValue2) {
            document.querySelector("h2").innerText = "Player 2 won"
        } else {
            document.querySelector("h2").innerText = "Draw!"
        }
        if (data.remaining === 0){
            getDeck()
        }
    }) 
    .catch(err => { 
        console.log(`error ${err}`) 
    }); 

}

function cardsValue(key) {
    switch (key) {
        case "ACE":
            return 14
        case "KING":
            return 13
        case "QUEEN":
            return 12
        case "JACK":
            return 11
        default:
            return key;
    }

}