
// import React, { useEffect, useMemo, useState } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components' 



import { useTranslation } from 'react-i18next'

import {GetTokenListByChainID} from 'multichain-bridge'

import { useActiveWeb3React } from '../../hooks'
// import { useETHBalances, useTokenBalancesList, useBridgeAllTokenBalances } from '../../state/wallet/hooks'
// import { useETHBalances, useBridgeAllTokensBalances } from '../../state/wallet/hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import { useBridgeTokenList } from '../../state/lists/hooks'

import AppBody from '../AppBody'
import Title from '../../components/Title'

import { ReactComponent as Dropup } from '../../assets/images/dropup-blue.svg'
import { ReactComponent as Dropdown } from '../../assets/images/dropdown-blue.svg'

import NextkIcon from '../../assets/images/icon/Next.svg'
import PreviouskIcon from '../../assets/images/icon/Previous.svg'

import config from '../../config'

import {formatDecimal} from '../../utils/tools/tools'
import { isAddress } from '../../utils'

import {
  Container,
  Row,
  Col,
  MyBalanceBox,
  MyBalanceBox2,
  MyBalanceBox3,
  TitleAndSearchBox,
  MyBalanceTokenBox,
  DBThead,
  DBTh,
  DBTbody,
  CenteredText,
  BuybackLedger,
  DBTd,
  TokenTableCoinBox,
  TokenNameBox,
  MoreBtnBox,
  DBTables,
} from './styleds'

const WrappedDropup = ({ ...rest }) => <Dropup {...rest} />
export const ColoredDropup = styled(WrappedDropup)`
  margin-right: 0.625rem;
  path {
    stroke: ${({ theme }) => theme.textColorBold};
  }
`

const WrappedDropdown = ({ ...rest }) => <Dropdown {...rest} />
export const ColoredDropdown = styled(WrappedDropdown)`
  margin-right: 0.625rem;
  path {
    stroke: ${({ theme }) => theme.textColorBold};
  }
`

const SelectHDPathPage = styled.div`
  ${({ theme }) => theme.flexBC};
  height: 34px;
  object-fit: contain;
  border-radius: 6px;
  background: ${({theme}) => theme.viewMoreBtn};
  padding: 0 1.25rem;
`
const ArrowBox = styled.div`
${({theme}) => theme.flexC}
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: ${({theme}) => theme.textColorBold};
  cursor:pointer;
`

const pagesize = 18

const ROUTER_BRIDGE_TYPE = 'routerTokenList'

export default function Buybacks() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  const allTokensList:any = useBridgeTokenList(ROUTER_BRIDGE_TYPE, chainId)
  // const allBalances = useBridgeAllTokensBalances(chainId)
  // const {balances: allBridgeBalances} = useTokenComparator('bridgeTokenList', chainId, false)
 //  const {balances: allRouterBalances} = useTokenComparator('routerTokenList', chainId, false)
  // console.log(allTokensList)
  // console.log(allBalances['0x95bf7e307bc1ab0ba38ae10fc27084bc36fcd605']?.toSignificant(6))

  // const [poolArr, setPoolArr] = useState<Array<string>>()

  const [pagecount, setPagecount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  const ETHBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  // const totalCount:number = allTokenList ? allTokenList.length : 0


  const getAllTokens = useCallback(() => {
    const ulist:any = []
    const alist:any = []
    const tlist:any = {}
    const ANY_TOKEN = config.getCurChainInfo(chainId)?.anyToken
    if (ANY_TOKEN) {
      tlist[ANY_TOKEN] = {
        "address": ANY_TOKEN,
        "chainId": chainId,
        "decimals": 18,
        "name": "Olympus Gate",
        "symbol": "GATE",
        "underlying": '',
        "destChains": '',
        "isView": 1
      }
      alist.push(ANY_TOKEN)
    }
    const arr:any = []
    // if (config.getCurConfigInfo().isOpenRouter) {
    //   arr.push(getAllToken(chainId))
    // } else {
    //   arr.push('')
    // }
    if (config.getCurConfigInfo().isOpenBridge) {
      arr.push(GetTokenListByChainID({srcChainID: chainId}))
    } else {
      arr.push('')
    }
    Promise.all(arr).then((res:any) => {
      // console.log(res)
      // console.log(allTokensList)
      if (allTokensList && Object.keys(allTokensList).length > 0) {
        // console.log(111)
        for (const token in allTokensList) {
          if (!isAddress(token)) continue
          if (ANY_TOKEN?.toLowerCase() === token?.toLowerCase()) {
            // console.log('router')
            tlist[ANY_TOKEN] = {
              ...tlist[ANY_TOKEN],
              "isView": 0,
              "type": "router"
            }
            continue
          }
          const item = allTokensList[token].tokenInfo
          
          if (chainId?.toString() !== item.chainId?.toString()) continue
          let anyToken = ''
          let uldToken = ''
          if (item.underlying) {
            anyToken = item.underlying.address
            uldToken = item.address
          } else {
            anyToken = item.address
          }
          if (uldToken) {
            ulist.push(anyToken)
          }
          alist.push(token)
          tlist[token.toLowerCase()] = {
            "address": token,
            "chainId": chainId,
            "decimals": item.decimals,
            "name": item.name,
            "symbol": item.symbol,
            "underlying": item.underlying,
            "destChains": item.destChains,
            "logoUrl": item.logoUrl,
            "type": "router"
          }
        }
      }
      if (res[0]) {
        const list = res[0].bridge
        for (const token in list) {
          if (!isAddress(token)) continue
          if (ANY_TOKEN?.toLowerCase() === token?.toLowerCase()) {
            // console.log('bridge')
            tlist[ANY_TOKEN] = {
              ...tlist[ANY_TOKEN],
              "isView": 0,
              "type": "bridge",
              "bridgeType": "bridge"
            }
            continue
          }
          const item = list[token]
          // if (chainId?.toString !== item.chainId) continue
          if (item.underlying) {
            if (ulist.includes(item.underlying.address)) continue
            ulist.push(item.underlying.address)
          }
          if (tlist[token.toLowerCase()]) continue
          if (config.getCurConfigInfo().showCoin.length > 0 && !config.getCurConfigInfo().showCoin.includes(item.name)) continue
          tlist[token.toLowerCase()] = {
            "address": token,
            "chainId": chainId,
            "decimals": item.decimals,
            "name": item.name,
            "symbol": item.symbol,
            "underlying": item.underlying,
            "destChains": item.destChains,
            "logoUrl": item.logoUrl,
            "type": "bridge",
            "bridgeType": "bridge"
          }
          alist.push(token)
        }
        // for (const type in res[0]) {
        // }
      }
      // console.log(alist)
      // console.log(tlist)
      setTotalCount(alist.length)
      // setPoolArr(ulist)
    })
  }, [chainId, allTokensList])

  useEffect(() => {
    // setPoolArr([])
    getAllTokens()
  }, [chainId])

  const [searchContent, setSearchContent] = useState('')
  const [showMore, setShowMore] = useState(true)


 

  function changePage (callback:any, pCount:any) {
    
    return (
      <SelectHDPathPage>
        <ArrowBox onClick={() => {
          // console.log(pCount)
          if (pCount >= 1) {
            callback(pCount - 1)
            setSearchContent('')
          }
        }}><img alt={''} src={PreviouskIcon} style={{marginRight: '0.625rem'}}/>Previous</ArrowBox>
        <ArrowBox onClick={() => {
          if (totalCount && pCount < parseInt((totalCount / pagesize).toString())) {
            callback(pCount + 1)
            setSearchContent('')
          }
        }}>Next<img alt={''} src={NextkIcon} style={{marginLeft: '0.625rem'}} /></ArrowBox>
      </SelectHDPathPage>
    )
  }

  return (
    <>
      <AppBody>
        <Title title={t('Buybacks')}></Title>
        
        <Container>
          <Row>
            <Col>
              <MyBalanceBox>
                <TitleAndSearchBox>
                  <h3>{t('Number of Buybacks')}</h3>
                </TitleAndSearchBox>
                <CenteredText>
                  132
                </CenteredText>
              </MyBalanceBox>
            </Col>
            <Col>
              <MyBalanceBox2>
                <TitleAndSearchBox>
                  <h3>{t('Total Amount (USD)')}</h3>
                </TitleAndSearchBox>
                <CenteredText>
                $1,227,967
                </CenteredText>
              </MyBalanceBox2>
            </Col>
            <Col>
              <MyBalanceBox3>
                <TitleAndSearchBox>
                  <h3>{t('Average Buyback (USD)')}</h3>
                </TitleAndSearchBox>
                <CenteredText>
                $68,220
                </CenteredText>
              </MyBalanceBox3>
            </Col>
          </Row>
          <BuybackLedger>
            <TitleAndSearchBox>
              <h3>{t('Buyback Ledger')}</h3>
            </TitleAndSearchBox>
            <MyBalanceTokenBox className={showMore ? 'showMore' : ''}>
              <DBTables>
                <DBThead>
                  <tr>
                    <DBTh className="l">{t('AMOUNT (ETH)')}</DBTh>
                    <DBTh className="r">{t('AMOUNT (USD)')}</DBTh>
                    <DBTh className="r">{t('DATE')}</DBTh>
                    <DBTh className="r">{t('TX HASH')}</DBTh>
                  </tr>
                </DBThead>
                <DBTbody>
                  <tr>
                    <DBTd>
                      <TokenTableCoinBox>

                        <TokenNameBox>
                          <h3>100.00</h3>
                        </TokenNameBox>
                      </TokenTableCoinBox>
                    </DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance ? '0.00' : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="c"></DBTd>
                  </tr>
                  <tr>
                    <DBTd>
                      <TokenTableCoinBox>

                        <TokenNameBox>
                          <h3>100.00</h3>
                        </TokenNameBox>
                      </TokenTableCoinBox>
                    </DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance ? '0.00' : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="c"></DBTd>
                  </tr>
                  <tr>
                    <DBTd>
                      <TokenTableCoinBox>

                        <TokenNameBox>
                          <h3>100.00</h3>
                        </TokenNameBox>
                      </TokenTableCoinBox>
                    </DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance ? '0.00' : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="c"></DBTd>
                  </tr>
                  <tr>
                    <DBTd>
                      <TokenTableCoinBox>

                        <TokenNameBox>
                          <h3>100.00</h3>
                        </TokenNameBox>
                      </TokenTableCoinBox>
                    </DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance ? '0.00' : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="c"></DBTd>
                  </tr>
                  <tr>
                    <DBTd>
                      <TokenTableCoinBox>

                        <TokenNameBox>
                          <h3>100.00</h3>
                        </TokenNameBox>
                      </TokenTableCoinBox>
                    </DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance ? '0.00' : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="c"></DBTd>
                  </tr>
                  <tr>
                    <DBTd>
                      <TokenTableCoinBox>

                        <TokenNameBox>
                          <h3>100.00</h3>
                        </TokenNameBox>
                      </TokenTableCoinBox>
                    </DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance ? '0.00' : '-'}</DBTd>
                    <DBTd className="r">{ETHBalance?.toSignificant(6) ? formatDecimal(ETHBalance?.toSignificant(6), 2) : '-'}</DBTd>
                    <DBTd className="c"></DBTd>
                  </tr>
                </DBTbody>
              </DBTables>
              {showMore && totalCount > pagesize && !searchContent ? changePage(setPagecount, pagecount) : ''}
            </MyBalanceTokenBox>
            <MoreBtnBox
              onClick={() => {
                setShowMore(!showMore)
              }}
            >
              {showMore ? (
                <>
                  <ColoredDropup></ColoredDropup>
                  {t('pichUp')}
                </>
              ) : (
                <>
                  <ColoredDropdown></ColoredDropdown>
                  {t('showMore')}
                </>
              )}
            </MoreBtnBox>
          </BuybackLedger>
        </Container>



      </AppBody>
    </>
  )
}
