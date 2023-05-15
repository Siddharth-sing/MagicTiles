import { useState, useEffect } from 'react'
import SingleCard from "./SingleCard";
import Particle from "./Particles"
import * as Constants from "../Constants";

const cardImages4 = Constants.cardImages4;
const cardImages6 = Constants.cardImages6;
const cardImages8 = Constants.cardImages8;

export default function Gameboard({ moves }) {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [celebrate, setCelebrate] = useState(false);
    const [cardN, setCardN] = useState(4);

    const shuffleCards = (n) => {

        let cardImages = [];
        console.log("card, n = ", cardImages, n)
        if (n === 4) {
            cardImages = cardImages4;
        } else if (n === 6) {
            cardImages = cardImages6;
        } else {
            cardImages = cardImages8;
        }

        const shuffleCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffleCards);
        setTurns(0);
        setCelebrate(false);
    }
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    const setCardNF = (n) => {
        console.log("Size = ", n);
        //shuffleCards(n)
        setCardN(n)
    }

    useEffect(() => {
        shuffleCards(cardN);
    }, [cardN]);

    useEffect(() => {
        moves(turns);
    }, [turns]);

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                console.log("It's a match!")
                setCelebrate(true);
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card;
                        }
                    });
                })
                resetTurn();
                setTimeout(() => setCelebrate(false), 2000);
            } else {
                setTimeout(() => resetTurn(), 500);
            }
        }
    }, [choiceOne, choiceTwo]);

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }
    
    return (
        <div>
            <button onClick={shuffleCards}>New Game</button>
            <div className="dropdown">
                <span>Select Level</span>
                <div className="dropdown-content">
                    <div className='hover:bg-blue-500 border rounded-lg bg-indigo-950' onClick={() => setCardNF(4)}>4</div>
                    <div className='hover:bg-violet-500  border rounded-lg bg-indigo-950' onClick={() => setCardNF(6)}>6</div>
                    <div className='hover:bg-blue-500 border rounded-lg bg-indigo-950' onClick={() => setCardNF(8)}>8</div>
                </div>
            </div>
            <div className='game-area'>
                <div className={cardN ? "card-grid" + cardN : ""} >
                    {cards.map(card => (
                        <SingleCard
                            key={card.id}
                            card={card}
                            handleChoice={handleChoice}
                            flipped={card === choiceOne || card === choiceTwo || card.matched}
                            disabled={disabled} />
                    ))}
                </div>
            </div>

            {celebrate ? <Particle /> : <div></div>}
        </div>
    )
}
