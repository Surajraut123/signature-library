import { useState } from 'react'
import './App.css'
import SignatureDialog from './components/SignatureDialog'
import GoogleFont from './googleFontIntegration/GoogleFont'

function App() {
  const [count, setCount] = useState(0)
  const [imageBaseURL, setImageBaseURL] = useState('')
   console.log("Base64: ", imageBaseURL)
  return (
    <>
      <SignatureDialog
        reset={true}
        copy={true}
        type={true}
        backgroundColor={true}
        pencilColor={true}
        pencilWidth={true}
        setImageBaseURL={setImageBaseURL}
      />
      {/* <GoogleFont/> */}
    </>
  )
}

export default App
