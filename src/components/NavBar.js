import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavBar = () => {
    return (
        <div id='Navbar' className='sticky top-0'>
            <nav className='mt-8'>
                <ul className='flex justify-between py-3 bg-transparent text-white'>
                    <li className='flex items-end m-8 italic font-bold font-mono text-2xl underline'>
                        <span className='overline'>FlipFlopper</span>
                    </li>
                    <li>
                        <ul className='lg:flex justify-evenly font-bold mr-10 text-lg'>
                            {
                                <div className='bg-slate-900 py-2 px-4 border border-sky-500 rounded-2xl m-3'>
                                    <span>Player: </span>
                                    {"Siddharth"}
                                </div>
                            }
                            {
                                <div className='bg-slate-900 py-2 px-4 border border-sky-500 rounded-2xl m-3'>
                                    <span>Score: </span>
                                    {"99.99"}
                                </div>
                            }
                            {
                                <div className='bg-slate-900 py-2 px-4 border border-sky-500 rounded-2xl m-3'>
                                    <span>Tokens Won: </span>
                                    {"6"}
                                </div>
                            }
                            <li className='ml-2 mt-4'>
                                <ConnectButton />
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
