import React from 'react';
import "./SingleCard.css"
const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }

    return (
        <div>
            <div className='card'>
                <div className={flipped ? "flipped" : ""}>
                    <img className='front' src={card.src} alt='Card Front'></img>
                    <img
                        className='back'
                        src="./img/cover.png"
                        alt='Card Back'
                        onClick={handleClick}>
                    </img>

                </div>
            </div>
        </div>
    );
}

export default SingleCard;
