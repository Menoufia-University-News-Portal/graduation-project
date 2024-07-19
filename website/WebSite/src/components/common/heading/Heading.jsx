import React from "react"
import "./heading.css"

const Heading = ({ title }) => {
  return (
    <>
      <div className='heading-top'>
        <h6>{title}</h6>
        <hr className="line90"/>
      </div>
    </>
  )
}

export default Heading
