import './fruitcard.css'
import Back from '../../assets/images/A_Panel_96x96.png'
import clickSound from '../../assets/sound/memoryclick.wav'

export const Fruitcard = ({card, chooseCard, disabled, flipped, timerOn, setTimerOn}) => {



    const clickedCard = ()=> {
        if(timerOn === false) {
                setTimerOn(true);
        }
        if(disabled) return;
        if(card.matched === false) {
              new Audio(clickSound).play()  
        }
        
        chooseCard(card)
        
    }

  return (
    <div className='fruitcard' onClick={clickedCard}>
            <div className={flipped ? "flipped" : ""}>
                <div className='front'>
                        <img className='fruit-img' src={card.src} alt={card.name} />
                </div>

                <div className='back'>
                        <img className='back-img' src={Back} alt="back of card" />
                </div>
            </div>
    </div> 
  )
}
