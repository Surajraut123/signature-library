import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import "../../fonts/fonts.css"

const SignatureTypeSuggestions = (props) => {

    const { userSign } = props;

    const [selectedFont, setSelectedFont] = useState("Corinthia");
    // const fonts = import.meta.glob('/src/assets/fonts/*.{ttf}');
    // const fonts = import.meta.glob('../');
    // console.log(Object.keys(fonts));


    const fontOptions = [
        "ImperialScript",
        "LavishlyYours",
        "MeaCulpa",
        "Corinthia",
        "Birthstone",
        "BirthstoneBounce",
        "BonheurRoyale",
        "Dynalight",
        "Festive",
        "GreyQo",
        "Inspliration",
        "LeagueScript",
        "Licorice",
        "Lovelight",
        "MarckScript",
        "MissFajardose",
        "MrBedfort",
        "MrDeHaviland",
        "MrsSaintDelafield",
        "PassionsConflict",
        "WindSong",
        "Yesteryear"
      ];

    return (
        <Box sx={{height:'100%'}}>
            <Box 
                sx={{    
                    height: "80%",
                    background: "aliceblue",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Typography sx={{fontFamily: selectedFont, fontSize: '5rem'}}>{userSign}</Typography>
            </Box>
            <Box sx={{height:'20%', boxSizing:'border-box', display:'flex', gap: '0.8rem', alignItems:'center', width:'100%', overflow:'scroll'}}>
                {
                    fontOptions.map((item, index) => (
                        <Typography 
                            sx={{
                                fontFamily: item, 
                                fontSize: '1rem', 
                                backgroundColor: 'white', 
                                borderRadius: "10px", 
                                border: '1px solid black', 
                                padding:'0.3rem',
                                cursor:'pointer'
                            }} 
                            key={index}
                            onClick={() => setSelectedFont(item)}
                        >
                            {userSign==="" ? "Signature" : userSign}
                        </Typography>
                    ))
                }
            </Box>
        </Box>
    )
}

export default SignatureTypeSuggestions
