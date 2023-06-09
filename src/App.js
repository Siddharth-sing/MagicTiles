import './App.css';
import Gameboard from './components/Gameboard';
import NavBar from "./components/NavBar"
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli, localhost } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { useState } from 'react';
import WinLose from './components/WinLose';

const alchemyID = "nR8sUsK3eZDZ_0fwNU8L2PV0qc5IYZ7L"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    goerli,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli,localhost] : []),
    localhost,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function App() {
  const [moves, setMoves] = useState(0);
  const [win, setWin] = useState(true);

  function getMoves(moves) {
    setMoves(moves);
  }
  function getResult(win) {
    setWin(win);
  }
function setNewGame(newG) {
    setWin(newG);
  }

 console.log(moves);
  return (
    <div className="App">
      <div className='sticky top-0'>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <NavBar moves = {moves}></NavBar>
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
      {
        win ? <WinLose newGame = {setNewGame}/> : <Gameboard moves = {getMoves} result = {getResult} ></Gameboard>
      }
    </div>
  );
}
export default App
