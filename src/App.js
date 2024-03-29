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
const [time, setTime] = useState(0)
const [timerOn, setTimerOn] = useState(false)
const [bestTime, setBestTime] = useState(0)
const [quit, setQuit] = useState(false)




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

  useEffect(() => {
    let interval = null;

    if(timerOn) {
      interval = setInterval(() => {
          setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
        clearInterval(interval)
    }

    return () => clearInterval(interval)

  }, [timerOn])


const newGame = () => {
  FruitArray.sort(() => Math.random() - 0.5)
  FruitArray.sort(() => Math.random() - 0.5)
  FruitArray.sort(() => Math.random() - 0.5)
  setCards(FruitArray)

}

const chooseCard = (card) => {
    if(choiceOne) {
       if (choiceOne.id === card.id || card.matched) {
        return
      } 
   
      setChoiceTwo(card)
      
    } else {
      if(card.matched) return
      setChoiceOne(card)
    }
  }

const resetTurn = () => {
  setDisabled(false)
  setChoiceOne('')
  setChoiceTwo('')
}

const checkIfGameEnd = () => {
  if(points === 8) {
    if (time < bestTime || bestTime === 0) {
      setBestTime(time);
    }
    new Audio(Applause).play()
    setTimerOn(false)
  } else {
    return
  }

}

const resetGame = () => {
    setTime(0);
    setPoints(0);
    resetTurn()
    newGame()
}

const quitGame = () => {
  setTime(0)
  setPoints(0)
  setQuit(true)
}




  return (
    <>
          <p className={quit === false ? 'thank-you' : 'thank-you slide-in'}>Thank you for playing!</p>
         

          {/* Best time text */}
    <p  className={points === 9 ? 'best-time-text best-time-slide' : 'best-time-text'}>
      Best time: 
        <span className='time'> {("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}</span>
        <span className='time'>:</span>
        <span className='time'>{("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}</span>
    </p>

          {/* Current time text */}
     <p className={points === 9 ? 'score-text score-slide' : 'score-text'}>
      Time:      
        <span className='time'> {("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
        <span className='time'>:</span>
        <span className='time'>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
    </p>

            {/* Play again text yes or no */}
     <p className={points === 9 ? 'play-again-text play-again-slide' : 'play-again-text'}>Play again? 
        <span className='yes' onClick={resetGame}>Yes</span>
        <span>/</span><span className='no' onClick={quitGame}>No</span>
      </p>

    <div className={points === 9 || quit ? 'app dark' : 'app'}>        
        <div className={quit ? 'headline quit-headline' : 'headline'}>
        <div className='watch'>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
        <span>:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>
            <h1>Fruit Memory</h1>
            <img className='heart-img' src={Heart} alt="heart image" />
        </div>

        <div className={quit ? 'card-area quit-card-area' : 'card-area'}>
        {cards.map((card) => (
         
          <Fruitcard 
          card={card} 
          key={card.id} 
          chooseCard={chooseCard}
          disabled={disabled}
          flipped={choiceOne === card || choiceTwo === card  || card.matched}
          setTimerOn={setTimerOn}
          timerOn={timerOn}
          /> 
                 
        ))}
        </div>
          
    </div>
    </>
  )
}

export default App;
