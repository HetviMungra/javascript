import React, { useEffect } from 'react'

export default function UseEffect() {
    const [count, setCount] = React.useState(0)
    useEffect(() =>{
        console.log ( `Use effect ruuning`)
    },[count])
  return (
    <div>
        <h1>UseEffect</h1>
        <h1>{count}</h1>
        <button onClick={() => setCount(count+1)}> Add </button>
    </div>
  )
}
