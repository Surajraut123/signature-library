import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "../../fonts/fonts.css"
import DoneIcon from "@mui/icons-material/Done";

const SignatureTypeSuggestions = (props) => {

    const { userSign, setUserSign, penColor, bgColor, sigWrite, setTypeCompleteStatus, typeCompleteStatus, setIsEmpty, doneStatus} = props;
    console.log("doneStatus : ", doneStatus)
    const [selectedFont, setSelectedFont] = useState("Corinthia");
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
                ref={sigWrite}
                sx={{    
                    height: !doneStatus ? "80%" : "100%",
                    background: bgColor,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Typography sx={{fontFamily: selectedFont, fontSize: '5rem', color: penColor}}>{userSign}</Typography>
            </Box>
            {!doneStatus && 
                <Box sx={{
                        height:'20%', 
                        boxSizing:'border-box', 
                        display:'flex', 
                        gap: '0.8rem', 
                        alignItems:'center', 
                        width:'100%', 
                        overflow:'scroll', 
                        backgroundColor: 'white'
                    }}
                >
                    {
                        typeCompleteStatus ? 
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
                        :
                        <TextField 
                            id="outlined-basic" 
                            label="Enter signature" 
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <DoneIcon
                                    sx={{ cursor: "pointer", color: "green" }}
                                    onClick={() => {setTypeCompleteStatus((prev) => !prev ); setIsEmpty(false)}}
                                    />
                                </InputAdornment>
                                ),
                            }}
                            value={userSign}
                            onChange={(e) => setUserSign(e.target.value)}
                            sx={{
                                width: "90%",
                                margin: "auto",

                                "& .MuiInputLabel-root": {
                                    color: "black",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "black",
                                },
                            
                                "& .MuiOutlinedInput-root": {
                                borderRadius: "15px",
                                overflow: "hidden",
                                backgroundColor: "aliceblue",

                                "& fieldset": {
                                    borderColor: "black",
                                },

                                "&:hover fieldset": {
                                    borderColor: "black !important",
                                },

                                "&.Mui-focused fieldset": {
                                    borderColor: "black !important",
                                    borderWidth: "1.5px",
                                },
                                "& .MuiInputLabel-root" : {
                                    color: 'black'
                                }
                                }
                            }}
                        />
                    }
                </Box>
            }
        </Box>
    )
}

export default SignatureTypeSuggestions
