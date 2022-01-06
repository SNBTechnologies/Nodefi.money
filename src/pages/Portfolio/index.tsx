
// import React, { useEffect, useMemo, useState } from 'react'
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'


// import { useETHBalances, useTokenBalancesList, useBridgeAllTokenBalances } from '../../state/wallet/hooks'
// import { useETHBalances, useBridgeAllTokensBalances } from '../../state/wallet/hooks'

import AppBody from '../AppBody'
import Title from '../../components/Title'

import { ReactComponent as Dropup } from '../../assets/images/dropup-blue.svg'
import { ReactComponent as Dropdown } from '../../assets/images/dropdown-blue.svg'



import {
  Container,
  Row,
  Col,
  MyBalanceBox,
  TitleAndSearchBox,
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




export default function Portfolio() {
  const { t } = useTranslation()


  // const totalCount:number = allTokenList ? allTokenList.length : 0




  return (
    <>
      <AppBody>
        <Title title={t('Portfolio')}></Title>
        <MyBalanceBox>
          <TitleAndSearchBox>
            <h3>{t('My Portfolio')}</h3>
          </TitleAndSearchBox>
        </MyBalanceBox>
        <Container>
          <Row>
            <Col>
              <MyBalanceBox>
            <TitleAndSearchBox>
              <h3>{t('Balance')}</h3>
            </TitleAndSearchBox>

              </MyBalanceBox>
            </Col>
            <Col>
              <MyBalanceBox>
            <TitleAndSearchBox>
              <h3>{t('Balance Value ($USD)')}</h3>
            </TitleAndSearchBox>

              </MyBalanceBox>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <MyBalanceBox>
            <TitleAndSearchBox>
              <h3>{t('Reflections Earned')}</h3>
            </TitleAndSearchBox>

              </MyBalanceBox>
            </Col>
            <Col>
              <MyBalanceBox>
            <TitleAndSearchBox>
              <h3>{t('Reflections Earned ($USD)')}</h3>
            </TitleAndSearchBox>

              </MyBalanceBox>
            </Col>
          </Row>
        </Container>
      </AppBody>
    </>
  )
}
