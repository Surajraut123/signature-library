import { useState } from 'react'
import './App.css'
import SignatureDialog from './components/SignatureDialog'

function App() {
  const [count, setCount] = useState(0)
  const [imageBaseURL, setImageBaseURL] = useState('')
  console.log(imageBaseURL)
  const imageURL="";


  const [fontFamily, setFontFamily] = useState()
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
        imageBaseURL={imageBaseURL}
        base64String={null}
      />
    </>
  )
}

export default App
