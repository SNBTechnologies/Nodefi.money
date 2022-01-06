import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


export const Container = styled.div`
  display: flex; 
  justify-content: flex-start;
  flex-wrap: wrap;

}
`

export const Row = styled.div`
  display: inline-flex;
  @media (min-width: 320px) and (max-width: 480px) {
    display: block;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: block;
  }
}
`

export const Col = styled.div`
  width: 338px;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 375px;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    width: 275px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 800px;
  }
  @media only screen 
  and (min-width: 1024px) 
  and (max-height: 1366px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 1.5) {
   width: 620px;
  }
}
`

export const MyBalanceBox = styled.div`
width: 90%;
border-radius: 0.5625rem;
box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgb(0 0 0 / 6%);
background-color: #21263e;
padding: 1rem 2.5rem;
margin-bottom: 20px;
overflow: auto;
  }
`

export const MyBalanceBox2 = styled.div`
width: 90%;
border-radius: 0.5625rem;
box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgb(0 0 0 / 6%);
background-color: #21263e;
padding: 1rem 2.5rem;
margin-bottom: 20px;
overflow: auto;
  }
`

export const MyBalanceBox3 = styled.div`
width: 90%;
border-radius: 0.5625rem;
box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgb(0 0 0 / 6%);
background-color: #21263e;
padding: 1rem 2.5rem;
margin-bottom: 20px;
overflow: auto;
  }
`

export const BuybackLedger = styled.div`
  width: 100%;

  border-radius: 0.5625rem;
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.contentBg};
  padding: 1rem 2.5rem;
  margin-bottom: 20px;
  overflow:auto;
  @media screen and (max-width: 960px) {
    padding: 1rem 1rem;
  }
`

export const CenteredText = styled.div`
  font-size: 1.2rem;
  text-align: center;
`

export const Flex = styled.div`
  ${({ theme }) => theme.flexC};
`

export const TitleAndSearchBox = styled.div`
  ${({ theme }) => theme.flexBC};
  margin-bottom: 1.5625rem;
  font-family: 'Manrope';
  h3 {
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.5;
    color: ${({ theme }) => theme.textColorBold};
    margin: 0 1.25rem 0 0;
    white-space: nowrap;
  }
`
export const SearchBox = styled.div`
  width: 100%;
  max-width: 296px;
  height: 2.5rem;

  border-radius: 0.5625rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  border: solid 0.0625rem rgba(0, 0, 0, 0.1);
  // background-color: #ffffff;
  padding-left: 2.5rem;
  position: relative;

  .icon {
    ${({ theme }) => theme.flexC};
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.textColorBold};
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: none;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;
  background: none;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    // color: ${({ theme }) => theme.text4};
    color:#DADADA;
  }
`

export const MyBalanceTokenBox = styled.div`
  width: 100%;
  height: 230px;
  overflow-y: hidden;
  overflow-x: auto;
  &.showMore {
    height: auto;
    overflow: auto;
  }
`

export const DBTables = styled.table`
  min-width: 100%;
  table-layer: fixed;
  border-spacing:0px 10px;
`
export const DBThead = styled.thead`
  width: 100%;
  border-radius: 0.5625rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-bottom: 0.625rem;
  font-size: 12px;
  tr {
    box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  }
  @media screen and (max-width: 960px) {
    padding: 1rem 5px;
  }
`
export const DBTh = styled.th`
  color: ${({ theme }) => theme.textColorBold};
  background-color: ${({ theme }) => theme.contentBg};
  padding: 12px 8px;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.5;
  &.r {
    text-align: right;
  }
  &.l {
    text-align: left;
  }
  &.c {
    text-align: center;
  }
  &.hideSmall {
    
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    &.hideSmall {
      display:none;
    }
  `}
`
export const DBTbody = styled.tbody`
  width: 100%;
  border-radius: 0.5625rem;
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-bottom: 0.625rem;
  font-size: 12px;
  tr {
    // box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
    box-shadow: ${({ theme }) => theme.tableShadow};
  }
  @media screen and (max-width: 960px) {
    padding: 1rem 5px;
  }
`

export const DBTd = styled.td`
  background-color: ${({ theme }) => theme.contentBg};
  padding: 8px 8px;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.5;
  color: ${({ theme }) => theme.textColorBold};
  &.r {
    text-align: right;
  }
  &.l {
    text-align: left;
  }
  &.c {
    text-align: center;
  }
  p {
    margin: 0;
    &.lr {
      ${({ theme }) => theme.flexBC};
    }
    &.textR {
      ${({ theme }) => theme.flexEC};
    }
  }
  
  &.hideSmall {
    
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    &.hideSmall {
      display:none;
    }
  `}
`

export const TokenTableCoinBox = styled.div`
  ${({ theme }) => theme.flexSC};
  padding: 0 0px;

  @media screen and (max-width: 960px) {
    padding: 0 5px;
  }
`
export const TokenTableLogo = styled.div`
  ${({ theme }) => theme.flexC};
  width: 36px;
  height: 36px;

  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.04);
  border: solid 0.0625rem rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius: 100%;
  padding: 0.3125rem;
  margin-right: 1.25rem;
  @media screen and (max-width: 960px) {
    margin-right: 5px;
    padding: 5px;
  }
`

export const TokenNameBox = styled.div`
  font-family: 'Manrope';
  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.25;
    color: ${({ theme }) => theme.textColorBold};
    white-space: nowrap;
  }
  p {
    margin: 0.125rem 0 0;
    font-size: 0.75rem;
    font-weight: normal;
    white-space: nowrap;
    line-height: 1;
    color: ${({ theme }) => theme.textColorBold};
  }
`
export const TokenActionBtn = styled(NavLink)`
  ${({ theme }) => theme.flexC};
  font-family: 'Manrope';
  width: 88px;
  height: 38px;

  border-radius: 0.5625rem;
  background: ${({ theme }) => theme.selectedBg};
  margin-right: 0.125rem;

  font-size: 0.75rem;
  font-weight: 500;

  line-height: 1;

  color: ${({ theme }) => theme.textColorBold};
  box-shadow: none;
  padding: 0;
  text-decoration: none;
  &:hover,
  &:focus,
  &:active {
    background: ${({ theme }) => theme.selectedBg};
  }
`
export const TokenActionBtnSwap = styled(TokenActionBtn)`
  margin-right: 0.125rem;
  &.disabled{
    opacity: 0.5;
    cursor: no-drop;
  }
`
export const MoreBtnBox = styled.div`
  ${({ theme }) => theme.flexC};
  background-color: ${({theme}) => theme.tipBg};
  font-family: 'Manrope';
  width: 110px;
  height: 34px;

  border-radius: 6px;

  font-size: 0.75rem;
  font-weight: 500;

  line-height: 1.17;

  color: #734be2;
  margin: 1.25rem auto 0;
  cursor: pointer;
  display:none;
`

export const ChainCardList = styled.div`
  width: 100%;
  display:none;
  border-bottom: 1px solid #f0f0f0;
  .chain {
    ${({ theme }) => theme.flexSC};
    margin: 10px 0;
    .label {
      margin-left: 10px;
    }
  }
  .dtil {
    margin-bottom: 10px;
    .p {
      ${({ theme }) => theme.flexBC};
      margin:0;
      font-size: 10px;
    }
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display:block;
  `}
`