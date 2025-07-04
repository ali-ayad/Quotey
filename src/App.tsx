import { useState } from 'react'
import { Button } from './components/ui/button'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex   justify-between max-w-7xl mx-auto">
          <h1 className='font-bold text-3xl'> Quotey</h1>
      <Button>Add Quote</Button>
    
    </div>
    </>
  )
}

export default App
