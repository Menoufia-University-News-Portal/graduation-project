import React from "react"

import Side from "../../sideContent/side/Side"
import LastSection from "../LastSection/LastSection"
import SecondSection from "../SecondSection/SecondSection"
import Popular from "../popular/Popular"
import Ppost from "../Ppost/Ppost"
import "./style.css"
import Creative from "../../../Pages/CreativePage/Creative";
import Media from "../../../Pages/media/Media"
import Leaders from "../../../Pages/Leaders/Leaders"
import SquareAnimatedButtons from "../../../Pages/SquareAnimatedButtons/SquareAnimatedButtons"

const Homes = () => {
  return (
    <>
      <main style={{padding:0,margin:0}}>
        <div className='container88'>
          <section className='mainContent'>

            <Ppost />
            <Leaders />
            <SecondSection />
           {/*
           <SquareAnimatedButtons />
            <SquareAnimatedButtons />
            */} 
            <div className="image-container">
              <img
                src="../images/ser4.jpg"
                alt="الطلبة الوافدين"
                width={"100%"}
                style={{ marginTop: "30px" }}
              />
            </div>
            <Popular />
            <Creative />
            <LastSection />
            <Media />
          </section>
          {/*
           <section className='sideContent'>
            <Side />
          </section>
           */}

        </div>
      </main>
    </>
  )
}

export default Homes
