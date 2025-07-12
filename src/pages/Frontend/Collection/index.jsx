import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MenCollection from './MenCollection'
import WomenCollection from './WomenCollection'

const Collection = () => {
  return (
    <main>
      <Routes>
        <Route path='/men' element={<MenCollection />} />
        <Route path='/women' element={<WomenCollection />} />
      </Routes>
    </main>
  )
}

export default Collection
