import React from 'react'
import Hero from './Hero'
import NewArrival from './NewArrival'
import TopSelling from './TopSelling'
import Ratings from './Ratings'
import NewsLetter from './NewsLetter'
import Brands from './Brands'

const Home = () => {
    return (
        <main>
            <Hero />
            <Brands />
            <NewArrival />
            <TopSelling />
            <Ratings />
            <NewsLetter />
        </main>
    )
}

export default Home
