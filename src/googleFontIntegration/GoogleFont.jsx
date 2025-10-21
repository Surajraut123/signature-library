import React, { useEffect } from 'react'

const GoogleFont = () => {

    useEffect(() => {
        const getFonts = async () => {
            try{    
                const response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCtsPoHp7HSTNqv1q6cJpkIo8r6uE78x3A", {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if(response.ok) {
                    const data = await response.json();
                    console.log("Data: ", data)
                }
            } catch(error) {
                console.log("While fetching font : ", error)
            }
        }
        getFonts()
    }, [])
    return (
        <div>
        hello
        </div>
    )
}

export default GoogleFont
