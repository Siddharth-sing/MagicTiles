import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavBar = ({ moves }) => {
    return (
        <div id='Navbar' className='sticky top-0'>
            <nav className='mt-8'>
                <ul className='flex justify-between py-3 bg-transparent text-white'>
                    <li className='flex m-8 italic font-bold font-mono text-2xl '>
                        <span className='text-2xl'>MagicalFlips</span>
                        <span className='text-xs'>*Gambling</span>
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
                                    <span>Moves : </span>
                                    {moves}
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
