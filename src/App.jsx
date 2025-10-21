import { useState } from 'react'
import './App.css'
import SignatureDialog from './components/SignatureDialog'
import GoogleFont from './googleFontIntegration/GoogleFont'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignatureDialog
        reset={true}
        copy={true}
        type={true}
        backgroundColor={true}
        pencilColor={true}
        pencilWidth={true}
      />
      {/* <GoogleFont/> */}
    </>
  )
}

export default App
