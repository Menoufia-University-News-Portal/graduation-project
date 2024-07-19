import React from 'react'
import Carsoul from './Carsoul'
import Section2 from './Section2'
import Homes from '../home/mainContent/homes/Home'
import AnimeTabe from './AnimeTabe/AnimeTabe'

//import Part2 from './Part2'

const Main = () => {
  return (
    <div style={{padding:0,margin:0}}>

      <Carsoul />
      <AnimeTabe />
      <Section2 />
      <Homes />
    </div>
  )
}

export default Main
