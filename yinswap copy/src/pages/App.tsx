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

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
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
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 1rem;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    flex-direction: column-reverse;
    gap: 20px;
  `};
`

const FooterText = styled.span`
  color: ${({ theme }) => darken(0.03, theme.text1)};
  font-weight: 500;
  font-size: 14px;
`

async function switchNetwork() {
  // parseInt(process.env.REACT_APP_CHAIN_ID ??
  const ethereum = window.ethereum as any
  const chainId: string = '0x' + Number('10001').toString(16)
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainId }]
    })
  } catch (err) {
    // This error code indicates that the chain has not been added to MetaMask
    if ((err as any).code === 4902) {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainName: 'EOS',
            chainId: chainId,
            nativeCurrency: { name: 'EOS', decimals: 18, symbol: 'EOS' },
            rpcUrls: [' https://mainnet.ethereumpow.org'],
            blockExplorerUrls: ['https://mainnet.ethwscan.com']
          }
        ]
      })
    }
  }
}

export default function App() {
  const ethereum = window.ethereum as any
  useEffect(() => {
    if (ethereum?.networkVersion?.toString !== '10001') {
      switchNetwork()
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
        </BodyWrapper>
        {/* <div className="banner">
          <div className="banner-left">
            <div className="banner-left-icon">
              <svg viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  opacity="0.3"
                  d="M8.016 16.403c-.476 0-.395-.18-.56-.634l-1.401-4.613 10.79-6.401"
                  fill="#fff"
                ></path>
                <path d="M8.016 16.405c.367 0 .53-.168.735-.367l1.962-1.908-2.447-1.476" fill="#D3B7F5"></path>
                <path
                  d="m8.268 12.65 5.93 4.38c.676.373 1.165.18 1.333-.628l2.414-11.374c.247-.99-.378-1.44-1.025-1.146L2.747 9.347c-.967.388-.962.928-.176 1.168l3.637 1.135 8.42-5.312c.397-.241.762-.112.463.154"
                  fill="#fff"
                ></path>
              </svg>
            </div>
            <span className="banner-left-content">Discover the growing YinSwap community</span>
          </div>
          <div className="banner-right">
            <a className="banner-btn-join-now">Join now</a>
          </div>
        </div> */}
        <Footer>
          <FooterText>© 2023 YinSwap. All rights reserved</FooterText>
          <div className="footer-social">
            <a className="footer-social-link">
              <svg
                fill="currentColor"
                fillOpacity="0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="100%"
                height="100%"
              >
                <path d="M24.707,7.793l-5.5-5.5C19.019,2.105,18.765,2,18.5,2H7C5.895,2,5,2.895,5,4v22c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2 V8.5C25,8.235,24.895,7.981,24.707,7.793z M17,23h-7c-0.552,0-1-0.448-1-1s0.448-1,1-1h7c0.552,0,1,0.448,1,1S17.552,23,17,23z M20,19H10c-0.552,0-1-0.448-1-1s0.448-1,1-1h10c0.552,0,1,0.448,1,1S20.552,19,20,19z M20,15H10c-0.552,0-1-0.448-1-1s0.448-1,1-1 h10c0.552,0,1,0.448,1,1S20.552,15,20,15z M19,9c-0.552,0-1-0.448-1-1V3.904L23.096,9H19z"></path>
              </svg>
            </a>
            <a className="footer-social-link">
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.315 5.55493C16.9796 5.4756 17.6117 5.2991 18.2002 5.03801C17.7589 5.69781 17.2036 6.27379 16.5603 6.73897C16.5672 6.87976 16.5703 7.02106 16.5703 7.16342C16.5703 11.4997 13.2686 16.5 7.23158 16.5C5.37793 16.5 3.65298 15.9563 2.2002 15.025C2.4571 15.0559 2.7188 15.0717 2.98359 15.0717C4.52094 15.0717 5.9364 14.5469 7.05975 13.6666C5.62386 13.6397 4.41168 12.6911 3.99399 11.3878C4.19468 11.4256 4.40011 11.4456 4.61186 11.4456C4.91135 11.4456 5.20084 11.4061 5.47668 11.3305C3.97505 11.029 2.84383 9.70317 2.84383 8.1131V8.07163C3.29961 8.32507 3.80947 8.46575 4.33076 8.4819C3.45017 7.89356 2.87064 6.8892 2.87064 5.75087C2.87064 5.14945 3.03244 4.58577 3.31511 4.10096C4.93393 6.08604 7.35241 7.39244 10.0803 7.52951C10.0247 7.28892 9.99578 7.03834 9.99578 6.78149C9.99578 4.96871 11.4654 3.5 13.2776 3.5C14.2217 3.5 15.075 3.89815 15.6734 4.53587C16.4088 4.39147 17.1139 4.12212 17.7582 3.73953C17.5129 4.50538 16.9933 5.14886 16.315 5.55493Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                ></path>
              </svg>
            </a>
            <a className="footer-social-link">
              <svg width="21" height="20" viewBox="0 0 21 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.21668 16.1101C7.73996 16.1101 7.82101 15.9301 7.65658 15.4762L6.25488 10.8631L17.0448 4.46191"
                  fill="none"
                ></path>
                <path
                  d="M8.21582 16.1124C8.58366 16.1124 8.74612 15.9442 8.95149 15.7446L10.9133 13.837L8.46619 12.3613"
                  fill="none"
                ></path>
                <path
                  d="M8.4683 12.3563L14.3978 16.7371C15.0745 17.1104 15.5628 16.9171 15.7314 16.109L18.145 4.73508C18.392 3.74437 17.7673 3.29487 17.1199 3.58877L2.94719 9.05372C1.97978 9.44179 1.98554 9.98153 2.77087 10.222L6.40792 11.3572L14.8281 6.04506C15.2256 5.80401 15.5905 5.93349 15.2911 6.19931"
                  fill="currentColor"
                  fillOpacity="0.5"
                ></path>
              </svg>
            </a>
            <a className="footer-social-link">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.5669 10.2153C11.5669 12.7245 9.54659 14.7587 7.05443 14.7587C4.56227 14.7587 2.54199 12.7245 2.54199 10.2153C2.54199 7.70603 4.56227 5.67188 7.05443 5.67188C9.54655 5.67188 11.5669 7.70603 11.5669 10.2153Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                ></path>
                <path
                  d="M16.5173 10.2143C16.5173 12.5763 15.5072 14.4911 14.2611 14.4911C13.015 14.4911 12.0049 12.5763 12.0049 10.2143C12.0049 7.85228 13.015 5.9375 14.2611 5.9375C15.5072 5.9375 16.5173 7.85228 16.5173 10.2143Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                ></path>
                <path
                  d="M18.5421 10.2147C18.5421 12.3309 18.1868 14.0465 17.7486 14.0465C17.3103 14.0465 16.9551 12.3309 16.9551 10.2147C16.9551 8.09838 17.3103 6.38281 17.7486 6.38281C18.1868 6.38281 18.5421 8.09838 18.5421 10.2147Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                ></path>
              </svg>
            </a>
          </div>
        </Footer>
      </AppWrapper>
    </Suspense>
  )
}
