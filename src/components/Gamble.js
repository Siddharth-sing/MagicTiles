import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import GamblerForm from './GamblerForm';
import ConfirmationPage from './ConfirmationPage';
export default function Gamble({ bet, setPopup, level, allowed_moves }) {

    console.log("Inside the pop component.");

    const getBetAmount = (betAmount) => {
        console.log("Bet Amount in Gamble.js = ", betAmount);
        bet(betAmount);
        setBetAmount(betAmount);
        setConfirmation(true);
    }
    const getPlayIt = (play) => {
        console.log("Ready to play in Gamble.js = ", play);
        allowed_moves(play);
        setPopup(false)
    }

    const [confirmation, setConfirmation] = useState(false);
    const [betAmount, setBetAmount] = useState(0);

    return (
        <div>
            <Popup trigger={
                confirmation ? <ConfirmationPage amount={betAmount} playIt={getPlayIt} level = {level} />
                    : <GamblerForm bet={getBetAmount} playIt={getPlayIt} />
            }
                position="center center"
                closeOnDocumentClick>
            </Popup>
        </div>
    )
}
