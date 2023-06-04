import React, { useState } from 'react'

export default function GamblerForm({ bet, playIt }) {

    const [betAmount, setBetAmount] = useState(0);
    
   
    const handleClick = () => {
        if(betAmount > 0){
            bet(betAmount);
        }else{
            alert("You can't bet for 0 ETH :(");
        }
    }
    const cancel = () => {
        console.log("Cancel !");
        playIt(0);
    }

    return (
        <div className="backdrop-opacity-10 backdrop-invert bg-sky-100/1 shadow-2xl rounded-2xl m-10 p-10 flex flex-col place-items-center" id="nftForm">
            <button onClick={cancel} className='absolute top-0 right-0 hover:bg-gray-700 border border-transparent rounded-full  p-2'>✖️</button>
            <form id="NFTFORM">
                <h3 className="text-center font-bold text-purple-400 mb-8">Let's make some money Gambling 😁</h3>
                <h5 className="text-center font-bold text-red-400 mb-8">* The amount you put on stake for betting will be doubled if you won, will be zeroed if you lose. </h5>
                <div className="mb-4">
                    <label className="block text-purple-400 text-xl font-bold mb-2" id="nameOfNFT">Betting Amount (in ETH) </label>
                    <input className="w-2/3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type='number' placeholder="0.00001" onChange={e => setBetAmount(e.target.value)}></input>             
                </div>
            </form>
            <button onClick={handleClick} className="w-1/3 font-bold bg-purple-500 text-white rounded p-2 shadow-lg">
                Bet your ETH
            </button>
        </div>
    )
}
