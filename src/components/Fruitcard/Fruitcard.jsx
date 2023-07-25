import './fruitcard.css'
import Back from '../../assets/images/A_Panel_96x96.png'
import { useState } from 'react'
import clickSound from '../../assets/sound/memoryclick.wav'

export const Fruitcard = ({card, chooseCard, disabled, flipped}) => {



    const clickedCard = ()=> {
        if(disabled) return;
        new Audio(clickSound).play()
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
