import React, { useState, useEffect } from 'react'

export default function ConfirmationPage({ amount, playIt, level }) {

    const play = () => {
        console.log("Start the gamble !");
        playIt(moves);
    }
    const cancel = () => {
        console.log("Cancel !");
        playIt(0);
    }

    const createMoves = () => {

        var inETH = amount * Math.pow(10, 18);
        var n = inETH, remainder, sumOfDigits = 0;
        while (n) {
            remainder = n % 10;
            sumOfDigits = sumOfDigits + remainder;
            n = Math.floor(n / 10);
        }
        setNoOfMoves(level*4 + sumOfDigits%10);        
    }

    useEffect(() => {
        createMoves()
    }, []);
    
    const [moves, setNoOfMoves] = useState(0);
    console.log(moves);
    return (
        <div>
            <div className='backdrop-opacity-10 backdrop-invert bg-sky-100/1 shadow-2xl rounded-2xl m-10 p-10 mb-5'>
                <h3 className='text-purple-400 font-bold '>Confirmation Page</h3>
                <div>
                    <p className='text-lg mb-2'>You are willing to play a bet for <span className='text-red-400'>{amount}</span> ETH</p>
                    <p className='text-lg text-cyan-500 mb-2'>Prize (if win) : <span className='text-red-400'>{amount * 2}</span> ETH</p>
                    <p className='text-lg text-cyan-500 mb-5'>No. of Moves : <span className='text-red-400'>{moves}</span></p>
                    <button onClick={play} className="w-1/3 font-bold bg-purple-500 text-white rounded p-1 shadow-lg">
                        Play
                    </button>
                    <button onClick={cancel} className="w-1/3 font-bold bg-purple-500 text-white rounded p-1 shadow-lg">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
