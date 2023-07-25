import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import CommingSoon from '../components/ComingSoon'
import Header from '../components/Header'
// import Polling from '../components/Header/Polling'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Manage from './Earn/Manage'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import { darken } from 'polished'

import BgLeft from '../assets/images/left.png'
import BgLeft1 from '../assets/images/left-1.png'
import BgRight from '../assets/images/right.png'
import BgRight1 from '../assets/images/right-1.png'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  min-height: 100vh;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
  position: relative;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const Footer = styled.footer`
  width: 100%;
  padding: 20px 1rem;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    flex-direction: column-reverse;
    gap: 20px;
  `};
`

const FooterSocialLink = styled.a`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => darken(0.03, theme.text2)};
`

const FooterText = styled.span`
  color: ${({ theme }) => darken(0.03, theme.text1)};
  font-weight: 500;
  font-size: 14px;
`

// async function switchNetwork() {
//   // parseInt(process.env.REACT_APP_CHAIN_ID ??
//   const ethereum = window.ethereum as any
//   const chainId: string = '0x' + Number('10001').toString(16)
//   try {
//     await ethereum.request({
//       method: 'wallet_switchEthereumChain',
//       params: [{ chainId: chainId }]
//     })
//   } catch (err) {
//     // This error code indicates that the chain has not been added to MetaMask
//     if ((err as any).code === 4902) {
//       await ethereum.request({
//         method: 'wallet_addEthereumChain',
//         params: [
//           {
//             chainName: 'ETHW',
//             chainId: chainId,
//             nativeCurrency: { name: 'ETHW', decimals: 18, symbol: 'ETHW' },
//             rpcUrls: [' https://mainnet.ethereumpow.org'],
//             blockExplorerUrls: ['https://mainnet.ethwscan.com']
//           }
//         ]
//       })
//     }
//   }
// }

export default function App() {
  const ethereum = window.ethereum as any
  useEffect(() => {
    if (ethereum?.networkVersion?.toString !== '10001') {
      // switchNetwork()
    }
  }, [ethereum])

  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <URLWarning />
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Popups />
          {/* <Polling /> */}
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/swap" component={Swap} />
              <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
              <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              <Route exact strict path="/find" component={PoolFinder} />
              <Route exact strict path="/pool" component={Pool} />
              <Route exact strict path="/liquidity" component={CommingSoon} />
              <Route exact strict path="/farm" component={CommingSoon} />
              <Route exact strict path="/earn" component={CommingSoon} />
              <Route exact strict path="/ido" component={CommingSoon} />
              <Route exact strict path="/nft" component={CommingSoon} />
              <Route exact strict path="/create" component={RedirectToAddLiquidity} />
              <Route exact path="/add" component={AddLiquidity} />
              <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact path="/create" component={AddLiquidity} />
              <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
              <Route exact strict path="/uni/:currencyIdA/:currencyIdB" component={Manage} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
          <div className="bg bg-left-1">
            <img src={BgLeft1} alt="bg1" />
          </div>
          <div className="bg bg-left">
            <img src={BgLeft} alt="bg" />
          </div>
          <div className="bg bg-right-1">
            <img src={BgRight1} alt="bg1" />
          </div>
          <div className="bg bg-right">
            <img src={BgRight} alt="bg" />
          </div>
        </BodyWrapper>
        <Footer>
          {/* <div className="banner">
            <div className="banner-left">
              <span className="banner-left-content">Discover the growing YinSwap community</span>
            </div>
            <div className="banner-right">
              <a
                href="https://discord.gg/mUtTkatyz2"
                target="_blank"
                rel="noopener noreferrer"
                className="banner-btn-join-now"
              >
                Join now
              </a>
            </div>
          </div> */}
          <div className="footer-inner">
            <FooterText>© 2023 YinSwap. All rights reserved</FooterText>
            <div className="footer-social">
              <FooterSocialLink
                href="https://yinswap.gitbook.io/yinswap/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                </svg>
              </FooterSocialLink>
              <FooterSocialLink
                href="https://twitter.com/YinSwap"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                </svg>
              </FooterSocialLink>
              <FooterSocialLink
                href="https://discord.gg/mUtTkatyz2"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                </svg>
              </FooterSocialLink>
              <FooterSocialLink
                href="https://medium.com/@yinswap"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M180.5,74.262C80.813,74.262,0,155.633,0,256S80.819,437.738,180.5,437.738,361,356.373,361,256,280.191,74.262,180.5,74.262Zm288.25,10.646c-49.845,0-90.245,76.619-90.245,171.095s40.406,171.1,90.251,171.1,90.251-76.619,90.251-171.1H559C559,161.5,518.6,84.908,468.752,84.908Zm139.506,17.821c-17.526,0-31.735,68.628-31.735,153.274s14.2,153.274,31.735,153.274S640,340.631,640,256C640,171.351,625.785,102.729,608.258,102.729Z" />
                </svg>
              </FooterSocialLink>
            </div>
          </div>
        </Footer>
      </AppWrapper>
    </Suspense>
  )
}
