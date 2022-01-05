
// import React, { useEffect, useMemo, useState } from 'react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ProgressBar } from 'react-bootstrap';

import { useTranslation } from 'react-i18next'

import {GetTokenListByChainID} from 'multichain-bridge'

import { useActiveWeb3React } from '../../hooks'
// import { useETHBalances, useTokenBalancesList, useBridgeAllTokenBalances } from '../../state/wallet/hooks'
// import { useETHBalances, useBridgeAllTokensBalances } from '../../state/wallet/hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import { useBridgeTokenList } from '../../state/lists/hooks'

// import TokenLogo from '../../components/TokenLogo'
import { useTokenComparator } from '../../components/SearchModal/sorting'
import AppBody from '../AppBody'
import Title from '../../components/Title'

// import SearchIcon from '../../assets/images/icon/search.svg'
import { ReactComponent as Dropup } from '../../assets/images/dropup-blue.svg'
import { ReactComponent as Dropdown } from '../../assets/images/dropdown-blue.svg'

import NextkIcon from '../../assets/images/icon/Next.svg'
import PreviouskIcon from '../../assets/images/icon/Previous.svg'

import config from '../../config'

import {formatDecimal} from '../../utils/tools/tools'
import { isAddress } from '../../utils'

import {
//  SearchBox,
//  SearchInput,
  MyBalanceBox,
  MyBalanceBox2,
  TitleAndSearchBox,
  MyBalanceTokenBox,
  DBThead,
  DBTh,
  DBTbody,
  DBTd,
  TokenTableCoinBox,
  TokenTableLogo,
  TokenNameBox,
 // TokenActionBtnSwap,
  MoreBtnBox,
  DBTables,
  AssetsManaged,
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

export default function DashboardDtil() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  const allTokensList:any = useBridgeTokenList(ROUTER_BRIDGE_TYPE, chainId)
  // const allBalances = useBridgeAllTokensBalances(chainId)
  const {balances: allBridgeBalances} = useTokenComparator('bridgeTokenList', chainId, false)
  const {balances: allRouterBalances} = useTokenComparator('routerTokenList', chainId, false)
  // console.log(allTokensList)
  // console.log(allBalances['0x95bf7e307bc1ab0ba38ae10fc27084bc36fcd605']?.toSignificant(6))

  // const [poolArr, setPoolArr] = useState<Array<string>>()

  const [allTokenArr, setAllTokenArr] = useState<Array<string>>()
  const [allTokenList, setAllTokenList] = useState<any>()
  const [pagecount, setPagecount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  const ETHBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  // const totalCount:number = allTokenList ? allTokenList.length : 0

  const allBalances = useMemo(() => {
    // const obj:any = {}
    return {
      ...allBridgeBalances,
      ...allRouterBalances
    }
    // if (allBridgeBalances && allRouterBalances) {
    //   return {
    //     ...allBridgeBalances
    //   }
    // } else if () {

    // }
  }, [allBridgeBalances, allRouterBalances])

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
      setAllTokenList(tlist)
      // setPoolArr(ulist)
      setAllTokenArr(alist)
    })
  }, [chainId, allTokensList])

  useEffect(() => {
    setAllTokenList([])
    // setPoolArr([])
    setAllTokenArr([])
    getAllTokens()
  }, [chainId])

  const [searchContent, setSearchContent] = useState('')
  const [showMore, setShowMore] = useState(true)

  const viewTokenList = useMemo(() => {
    // console.log(pagecount)
    const start = pagecount * pagesize
    const end = start + pagesize
    if (allTokenArr) {
      const resArr = searchContent ? allTokenArr : allTokenArr.slice(start, end)
      return resArr
    }
    return []
  }, [pagecount, allTokenArr, searchContent, allTokenList])
  
  const tokenList = useMemo(() => {
    const l:any = []
    if (account) {
      // console.log(viewTokenList)
      for (const token of viewTokenList) {
        const anyToken = allTokenList[token]?.underlying ? allTokenList[token]?.underlying?.address?.toLowerCase() : allTokenList[token]?.address?.toLowerCase()
        const undToken = allTokenList[token]?.underlying ? allTokenList[token]?.address?.toLowerCase() : ''
        let balance:any = allBalances && allBalances[anyToken] ? allBalances[anyToken]?.toSignificant(6) : ''
        
        let underlyingBlance:any = ''
        let totalBlance:any = 0
        if (undToken) {
          balance = allBalances && allBalances[undToken] ? allBalances[undToken]?.toSignificant(6) : ''
          underlyingBlance = allBalances && allBalances[anyToken] ? allBalances[anyToken]?.toSignificant(6) : ''
        }
        if (
          ETHBalance
          && config.getCurChainInfo(chainId)?.nativeToken
          && token.toLowerCase() === config.getCurChainInfo(chainId).nativeToken.toLowerCase()
        ) {
          balance = ETHBalance ? formatDecimal(ETHBalance.toSignificant(6), 2) : '0'
        }
        if (balance && underlyingBlance) {
          totalBlance = Number(balance) + Number(underlyingBlance)
        } else if (balance) {
          totalBlance = balance
        } else if (underlyingBlance) {
          totalBlance = underlyingBlance
        } else {
          totalBlance = ''
        }
        
        l.push({
          ...allTokenList[token],
          balance: balance,
          poolBlance: underlyingBlance,
          totalBlance: totalBlance
        })
      }
    } else {
      for (const token of viewTokenList) {
        l.push({
          ...allTokenList[token]
        })
      }
    }
    l.sort((a:any, b:any) => {
      if (!isNaN(a.totalBlance) && !isNaN(b.totalBlance) && Number(a.totalBlance) > Number(b.totalBlance)) {
        return -1
      }
      return 0
    })
    return l
  }, [viewTokenList, allTokenList, allBalances])
  // console.log(tokenList)
  {/*function searchBox() {
    return (
      <>
        <SearchBox>
          <div className="icon">
            <img src={SearchIcon} alt={''} />
          </div>
          <SearchInput
            placeholder={t('searchToken')}
            onChange={(e: any) => {
              setSearchContent(e.target.value)
            }}
          ></SearchInput>
        </SearchBox>
      </>
    )
  }*/}

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
        <Title title={t('dashboard')}></Title>
        <Row>
          <Col>
            <MyBalanceBox>
                <TitleAndSearchBox>
                  <h3>{t('Assets Under Management')}</h3>
                  {/*{searchBox()}*/}
                </TitleAndSearchBox>
                <AssetsManaged>
                  $29,701,198
                </AssetsManaged>


                <MyBalanceTokenBox className={showMore ? 'showMore' : ''}>
                  <DBTables>
                    <DBThead>
                      <tr>
                        <DBTh className="l">{t('By Network')}</DBTh>
                      </tr>
                    </DBThead>
                    <DBTbody>
                      <tr>
                        <DBTd>
                          <TokenTableCoinBox>
                            <TokenTableLogo>
                              <img src={require('../../assets/images/coin/source/FTM.png')} className="off" alt="" style={{width:'37px'}} />
                            </TokenTableLogo>
                            <TokenNameBox>
                              <h3>Fantom</h3>
                            </TokenNameBox>
                          </TokenTableCoinBox>
                        </DBTd>
                        <DBTd className="r">$14,593,729</DBTd>
                      </tr>
                      <tr>
                        <DBTd>
                          <TokenTableCoinBox>
                            <TokenTableLogo>
                              <img src={require('../../assets/images/coin/source/ETH.svg')} className="off" alt="" style={{width:'37px'}} />
                            </TokenTableLogo>
                            <TokenNameBox>
                              <h3>Ethereum</h3>
                            </TokenNameBox>
                          </TokenTableCoinBox>
                        </DBTd>
                        <DBTd className="r">$8,593,729</DBTd>
                      </tr>
                      <tr>
                        <DBTd>
                          <TokenTableCoinBox>
                            <TokenTableLogo>
                              <img src={require('../../assets/images/coin/source/BNB.svg')} className="off" alt="" style={{width:'37px'}} />
                            </TokenTableLogo>
                            <TokenNameBox>
                              <h3>Binance Smart Chain</h3>
                            </TokenNameBox>
                          </TokenTableCoinBox>
                        </DBTd>
                        <DBTd className="r">$5,523,120</DBTd>
                      </tr>
                      <tr>
                        <DBTd>
                          <TokenTableCoinBox>
                            <TokenTableLogo>
                              <img src={require('../../assets/images/coin/source/MATIC.png')} className="off" alt="" style={{width:'37px'}} />
                            </TokenTableLogo>
                            <TokenNameBox>
                              <h3>Polygon</h3>
                            </TokenNameBox>
                          </TokenTableCoinBox>
                        </DBTd>
                        <DBTd className="r">$990,620</DBTd>
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
            </MyBalanceBox>
          </Col>
          <Col>
            <MyBalanceBox2>
                <TitleAndSearchBox>
                  <h3>{t('Metrics')}</h3>
                </TitleAndSearchBox>
                <MyBalanceTokenBox className={showMore ? 'showMore' : ''}>
                  <DBTables>
                    <DBThead>
                      <tr>
                        <DBTh className="l">{t('Metric')}</DBTh>
                        <DBTh className="r">{t('Value')}</DBTh>

                      </tr>
                    </DBThead>
                    <DBTbody>
                      <tr>
                        <DBTd>
                          <TokenTableCoinBox>
                            <TokenNameBox>
                              <h3>Market Cap</h3>
                            </TokenNameBox>
                          </TokenTableCoinBox>
                        </DBTd>
                        <DBTd className="r">$13,987,307</DBTd>
                      </tr>
                      <tr>
                        <DBTd>
                          <TokenTableCoinBox>
                            <TokenNameBox>
                              <h3>Price</h3>
                            </TokenNameBox>
                          </TokenTableCoinBox>
                        </DBTd>
                        <DBTd className="r">$0.000000001</DBTd>
                      </tr>
                      <tr>
                        <DBTd>
                          <TokenTableCoinBox>
                            <TokenNameBox>
                              <h3>All Time High</h3>
                            </TokenNameBox>
                          </TokenTableCoinBox>
                        </DBTd>
                        <DBTd className="r">$0.000000001</DBTd>
                      </tr>
                      <tr>
                        <DBTd>
                          <TokenTableCoinBox>
                            <TokenNameBox>
                              <h3>Uniswap Liquidity</h3>
                            </TokenNameBox>
                          </TokenTableCoinBox>
                        </DBTd>
                        <DBTd className="r">$12,874,346</DBTd>
                      </tr>
                      <tr>
                        <DBTd>
                          <TokenTableCoinBox>
                            <TokenNameBox>
                              <h3>Pancakeswap Liquidity</h3>
                            </TokenNameBox>
                          </TokenTableCoinBox>
                        </DBTd>
                        <DBTd className="r">$3,268,692</DBTd>
                      </tr>
                      <tr>
                        <DBTd>
                          <TokenTableCoinBox>
                            <TokenNameBox>
                              <h3>Holders</h3>
                            </TokenNameBox>
                          </TokenTableCoinBox>
                        </DBTd>
                        <DBTd className="r">3,692</DBTd>
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
            </MyBalanceBox2>
          </Col>
          <Col>
            <MyBalanceBox2>
                <TitleAndSearchBox>
                  <h3>{t('Supply Mechanics')}</h3>
                </TitleAndSearchBox>
                <ProgressBar animated now={45} />
                <MyBalanceTokenBox className={showMore ? 'showMore' : ''}>
                  <DBTables>
                    <DBThead>
                      <tr>
                        <DBTh className="l">{t('')}</DBTh>

                      </tr>
                    </DBThead>
                    <DBTbody>
                      {tokenList.length > 0 ? (
                        tokenList.map((item:any, index:any) => {
                          if (
                            !searchContent
                            || (item?.name && item?.name.toLowerCase().indexOf(searchContent.toLowerCase()) !== -1)
                            || (item?.symbol && item?.symbol.toLowerCase().indexOf(searchContent.toLowerCase()) !== -1)
                            || (item?.address && item?.address.toLowerCase().indexOf(searchContent.toLowerCase()) !== -1)
                            || (item?.underlying?.address && item?.underlying?.address.toLowerCase().indexOf(searchContent.toLowerCase()) !== -1)
                            || (item?.underlying?.symbol && item?.underlying?.symbol.toLowerCase().indexOf(searchContent.toLowerCase()) !== -1)
                            || (item?.underlying?.name && item?.underlying?.name.toLowerCase().indexOf(searchContent.toLowerCase()) !== -1)
                          ) {
                            return (
                              <tr key={index}>
                                <DBTd>
                                  <TokenTableCoinBox>
                                    <TokenNameBox>
                                    </TokenNameBox>
                                  </TokenTableCoinBox>
                                </DBTd>
                                <DBTd className="r"></DBTd>
                                <DBTd className="r"></DBTd>
                                <DBTd className="r"></DBTd>
                                <DBTd className="c"></DBTd>
                              </tr>
                            )
                          } else {
                            return (
                              <tr key={index} style={{ display: 'none' }}>
                                <DBTd className="c">-</DBTd>
                                <DBTd className="c">-</DBTd>
                                <DBTd className="c">-</DBTd>
                                <DBTd className="c">-</DBTd>
                                <DBTd className="c">-</DBTd>
                              </tr>
                            )
                          }
                        })
                      ) : (
                        <tr key={0}>
                          <DBTd className="c">-</DBTd>
                          <DBTd className="c">-</DBTd>
                          <DBTd className="c">-</DBTd>
                          <DBTd className="c">-</DBTd>
                          <DBTd className="c">-</DBTd>
                        </tr>
                      )}
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
            </MyBalanceBox2>
          </Col>
        </Row>

        
      </AppBody>
    </>
  )
}
