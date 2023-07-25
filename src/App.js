import { useEffect, useState } from 'react'
import './App.css'
import Heart from './assets/images/Hearth_Pink_96x96.png'
import { Fruitcard } from './components/Fruitcard/Fruitcard'
import { FruitArray } from './data/FruitArray'
import Correct from './assets/sound/winning.wav'
import Applause from './assets/sound/applause.wav'

function App() {

const [cards, setCards] = useState([])
const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)
const [disabled, setDisabled] = useState(false)
const [points, setPoints] = useState(0);





  useEffect(() => {
      newGame();
  }, [])

  useEffect(() => {
   if (choiceOne && choiceTwo) {
        setDisabled(true)
        if(choiceOne.name !== choiceTwo.name) {
          setTimeout(() => {
              resetTurn();
          }, 1000)
          
        } else {
          setPoints(points + 1)
          setCards(thisCard => {
            return thisCard.map(card => {
              if(card.name === choiceOne.name) {
                return {...card, matched: true}
              } else {
                return card
              }
            })
          })
          setTimeout(() => {
            new Audio(Correct).play()
            checkIfGameEnd()
          }, 500)
          setTimeout(() => {
            resetTurn()
          }, 1000)
      
         
        }
       
    }
  }, [choiceOne, choiceTwo])


const newGame = () => {
  FruitArray.sort(() => Math.random() - 0.5)
  FruitArray.sort(() => Math.random() - 0.5)
  FruitArray.sort(() => Math.random() - 0.5)
  setCards(FruitArray)
}

const chooseCard = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

const resetTurn = () => {
  setDisabled(false)
  setChoiceOne('')
  setChoiceTwo('')
}

const checkIfGameEnd = () => {
  if(points === 8) {
    new Audio(Applause).play()
  } else {
    return
  }

}

const resetGame = () => {

    setPoints(0);
    resetTurn()
    newGame()


}




  return (
    <>
     <p className={points === 9 ? 'score-text score-slide' : 'score-text'}>Score: Xp</p>
     <p className={points === 9 ? 'play-again-text play-again-slide' : 'play-again-text'}>Play again? <span className='yes' onClick={resetGame}>Yes</span><span>/</span><span className='no'>No</span></p>
    <div className={points === 9 ? 'app dark' : 'app'}>        
        <div className='headline'>
            <h1>Fruit Memory</h1>
            <img className='heart-img' src={Heart} alt="heart image" />
        </div>

        <div className='card-area'>
        {cards.map((card) => (
         
          <Fruitcard 
          card={card} 
          key={card.id} 
          chooseCard={chooseCard}
          disabled={disabled}
          flipped={choiceOne === card || choiceTwo === card  || card.matched}
      
          /> 
                 
        ))}
        </div>
          
    </div>
    </>
  )
}

export default App;
