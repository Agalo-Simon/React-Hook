import React, { useEffect, useState } from 'react'

const DataFetcher = () => {
  const [data, setData] = useState()
  const [loading, SetLoading] = useState(true)
  const [error, SetError] = useState('')

  useEffect(()=>{
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res =>{
        if(!res.ok){
          throw new Error("Error Occurred" , res.message); 
        }
        return res.json();
      })
      .then(data => {
        setData(data.slice(0, 200))
        SetLoading(false)
      }).catch(error =>{
        SetError(error)
        SetLoading(false)
      })
  },[])
  if(loading) return <p>Loading......</p>
  if(error) return <p>Error: {error}</p>

  return (
    <div>
       <ul>
        {data.map(item => 
          <li key={item.id}>{item.title}</li>
        )}
       </ul>
    </div>
  )
}

export default DataFetcher;
