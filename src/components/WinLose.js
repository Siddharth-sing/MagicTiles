import React from 'react'
import WinningImage from "../winner.png"
export default function WinLose({newGame}) {
    
    const handleClick = () => {
        newGame(false);
    }
    return (
        <div>
            <div className='flex flex-row place-items-center justify-center'>
                <img className='h-96 w-96' src={WinningImage} alt='You Win'></img>
                <div>
                    <p>Congrats 😍 You Won !</p>
                    <p className='mb-10'>Your reward will be transferred to your wallet address.</p>
                    <p>Click on <button onClick={handleClick}>New Game</button>to play again.</p>
                </div>
            </div>
        </div>
    )
}
