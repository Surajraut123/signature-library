import { Box, Popover, TextField } from '@mui/material';
import React, { useState } from 'react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GestureIcon from '@mui/icons-material/Gesture';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import GetAppIcon from '@mui/icons-material/GetApp';

const SignatureButtons = (props) => {
    const {styles, sigCanvas, reset, setIsEmpty, isEmpty, copy, type, bgColor, handleMode, setUserSign} = props;
    const [textFieldAnchor, setTextFieldAnchor] = React.useState(null);
    const openTextField = Boolean(textFieldAnchor);
    const fillCanvasBackground = (color) => {
        if (sigCanvas.current) {
          const canvas = sigCanvas.current.getCanvas();
          const ctx = canvas.getContext('2d');
          ctx.save();
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
        }
      };
      const downloadPNG = () => {
        if (sigCanvas.current) {
          const canvas = sigCanvas.current.getCanvas();
          const dataURL = canvas.toDataURL('image/png');
    
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'signature.png';
          link.click();
        }
      }
  return (
    <Box className="signatureBtn" style={styles.signatureBtn}>
    {reset.isEnabled && <RotateLeftIcon className="actionBtn" style={styles.actionBtn} onClick={() => {sigCanvas.current.clear(); fillCanvasBackground(bgColor); setIsEmpty(true)}} />}
    {copy.isEnabled && <ContentCopyIcon className="actionBtn" style={styles.actionBtn}
        onClick={() => {
          const data = sigCanvas.current.toDataURL();
          navigator.clipboard.writeText(data);
          alert('Signature copied!');
        }}
      />}
    <GestureIcon className="writeBtn" style={styles.writeBtn} onClick={(e) => handleMode("draw")}/>
    {type.isEnabled && <SortByAlphaIcon className="typeBtn" style={styles.typeBtn} onClick={(e) => {handleMode("type"), setTextFieldAnchor(e.currentTarget)}}/>}
    <Popover
      open={openTextField}
      anchorEl={textFieldAnchor}
      onClose={() => setTextFieldAnchor(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Box style={{ padding: '0.5rem', width: 200, display: 'flex', alignItems: 'center', justifyContent:'center', gap:'1rem' }}>
        <TextField id="standard-basic" label="Signature" variant="standard" onChange={(e) => setUserSign(e.target.value)}/>
        <CloseIcon style={styles.closeIcon}/>
        <CheckIcon style={styles.checkIcon}/>
      </Box>
    </Popover>
    <GetAppIcon 
      style={{
        ...styles.actionBtn,
        opacity: isEmpty ? 0.5 : 1,
        pointerEvents: isEmpty ? "none" : "auto",
        cursor: isEmpty ? "not-allowed" : "pointer",
      }} 
      onClick={() => downloadPNG()}
    />
  </Box>
  )
}

export default SignatureButtons
