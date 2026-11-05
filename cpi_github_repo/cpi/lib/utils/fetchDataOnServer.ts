import { cache } from 'react'
import 'server-only'

const api_url = process.env.NEXT_PUBLIC_API_URL;

const API_URL_AAVE = `${api_url}/aave`;
const API_URL_OPTIMISM = `${api_url}/optimism`;
const API_URL_UNISWAP = `${api_url}/uniswap`;
const API_URL_COMPOUND = `${api_url}/compound`;

export const preload = () => {
  console.log(api_url)
  void getItemsAave()
  void getItem()
  void getItemsUniswap()
  void getItemCompound()
}

export const getItemsAave = cache(async () => {
    const data = await fetch(`${API_URL_AAVE}`, { next: { revalidate: 86400 } }).then((res) => res.json())
    return data
})

export const getItem = cache(async () => {
    const data = await fetch(`${API_URL_OPTIMISM}?page=1&sort=voting_power&isAsc=false&search=`, { next: { revalidate: 86400, tags: ['freshOptimismData'] } }).then((res) => res.json())
    return data
})

export const getItemsUniswap = cache(async () => {
    const data = await fetch(`${API_URL_UNISWAP}`, { next: { revalidate: 86400 } }).then((res) => res.json())
    return data
})

export const getItemCompound = cache(async () => {
    const data = await fetch(`${API_URL_COMPOUND}`, { next: { revalidate: 86400 } }).then((res) => res.json())
    return data
})