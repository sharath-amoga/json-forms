import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './form'
import Form2 from './form/form2'
import Form3 from './form/form3'
import Form4 from './form/form4'
import Form5 from './form/form5'
import Form6 from './object/form'
import Liveform from './liveform'

function App() {

  return (
    <div>

      <div className='form-root'>
        <Liveform />
        {/* <Form /> */}
        {/* <Form6 />


        <br />


        <Form2 />
        <br />
        <Form3 />
        <br />
        <Form4 />
        <br />

        <Form5 />
        <br />
        <br /> */}

      </div>
    </div>

  )
}

export default App
