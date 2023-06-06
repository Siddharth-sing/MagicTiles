import { useState, useEffect } from 'react'
import SingleCard from "./SingleCard";
import Particle from "./Particles"
import * as Constants from "../Constants";
import Gamble from './Gamble';
import Web3 from 'web3';
import CasinoJson from '../abi/Casino.json'

const cardImages4 = Constants.cardImages4;
const cardImages6 = Constants.cardImages6;
const cardImages8 = Constants.cardImages8;

export default function Gameboard({ moves, result }) {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [allowedMoves, setAllowedMoves] = useState(0);
    const[match, setMatch] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [celebrate, setCelebrate] = useState(false);
    const [popup, setPopup] = useState(false);
    const [cardN, setCardN] = useState(4);
    const [betAmount, setbetAmount] = useState(0);

    const shuffleCards = (n) => {
        let cardImages = [];
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

        result(false);
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffleCards);
        setTurns(0);
        setMatch(0);
        setCelebrate(false);
        setPopup(false);
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
        if (allowedMoves > 0) {
            if (turns > allowedMoves) {
                console.log("You lose !");
                shuffleCards(cardN);
            }

        }
        moves(turns);
        if(match === cardN*cardN){
            result(true);
            console.log("You win Party!");
        }
    }, [turns]);

    console.log("Match =", match);
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                console.log("It's a match!")
                setMatch(prevMatch => prevMatch+2);
                setCelebrate(true);
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card;
                        }
                    });
                });
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

    const setBetAmount = (betAmount) => {
        setbetAmount(betAmount);
    }
    const setPopupStatus = (popup) => {
        setPopup(popup);
    }
    const setMovesCounter = (allowedMoves) => {
        if (allowedMoves == 0) {
            setAllowedMoves(allowedMoves);
            alert("You opt not to play! 🤕");
        } else {
            setAllowedMoves(allowedMoves);
            createGambler();
        }
    }

    //Backend Functionality

    const web3 = new Web3(Web3.givenProvider);
    const [contractAddress, setContractAddress] = useState();

    const web3Connection = async () => {
        const networkId = await web3.eth.net.getId();
        var accounts = web3.eth.getAccounts();
        accounts = await window.ethereum.enable();
        const casinoContractAddress = CasinoJson.networks[networkId].address;
        setContractAddress(casinoContractAddress);
    }

    const createGambler = async () => {
        const casinoContract = new web3.eth.Contract(CasinoJson.abi, contractAddress);
        var preExistingGambler = await casinoContract.methods.checkExistingGambler().call();
        console.log(preExistingGambler);
        if (preExistingGambler) {
            casinoContract.methods.placeBetIfGamblerPreExist().send({
                value: betAmount,
            });
        } else {
            casinoContract.methods.createGambler().send({
                value: betAmount,
            });
        }
    }

    const addETHToCasino = async () => {
        try {
            const casinoContract = new web3.eth.Contract(CasinoJson.abi, contractAddress);
            const _casinoOwner = await casinoContract.methods._casinoOwner().call();
            const _casinoBalance = await casinoContract.methods._balanceOfCasino().call();

            casinoContract.methods.ownerAddsFundsToCasino().send({
                from: _casinoOwner,
                value: 5e18
            }).then((tx) => {
                console.log("Success: ", tx);
            }).catch((e) => {
                console.log(e.message);
            });
            console.log("Balance = ", _casinoBalance);
        } catch (error) {
            console.log(error);
        }


    }


    useEffect(() => {
        web3Connection();
    }, []);

    return (
        <div>
            <div className="dropdown">
                <span>Select Level</span>
                <div className="dropdown-content">
                    <div className='hover:bg-blue-500 border rounded-lg bg-indigo-950' onClick={() => setCardNF(4)}>4</div>
                    <div className='hover:bg-violet-500  border rounded-lg bg-indigo-950' onClick={() => setCardNF(6)}>6</div>
                    <div className='hover:bg-blue-500 border rounded-lg bg-indigo-950' onClick={() => setCardNF(8)}>8</div>
                </div>
            </div>
            <button onClick={() => shuffleCards(cardN)}>New Game</button>
            <button onClick={() => setPopup(true)}>Gamble</button>
            <button onClick={addETHToCasino}>Add ETH(s)</button>

            {popup ? <Gamble bet={setBetAmount}
                setPopup={setPopupStatus}
                level={cardN}
                allowed_moves={setMovesCounter} />
                : <div></div>}
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
