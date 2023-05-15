import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard';
import Particle from "./components/Particles"
import * as Constants from "./Constants";

const cardImages = Constants.cardImages8;

function App() {
  const [cards, setCards] = useState([]);
  const [cardsReq, setCardsReq] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [cardN, setCardN] = useState(4);
 
  const shuffleCards = () => {
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
    setCardN(n);
  }

  useEffect(() => {
     shuffleCards()
  }, []);

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
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <br/>
      <div className="dropdown">
        <span>Select Level</span>
        <div className="dropdown-content">
          <p onClick={() => setCardNF(4)}>4</p>
          <p onClick={() => setCardNF(6)}>6</p>
          <p onClick={() => setCardNF(8)}>8</p>
        </div>
      </div>
      <div className= {cardN ? "card-grid"+cardN : ""}>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled} />
        ))}
      </div>
      <div> <p>No. of turns : </p> {turns} </div>
      {celebrate ? <Particle /> : <div></div>}
    </div>
  );
}
export default App
