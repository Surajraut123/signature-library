import { Box, Popover, TextField, Tooltip } from '@mui/material';
import React from 'react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GestureIcon from '@mui/icons-material/Gesture';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import GetAppIcon from '@mui/icons-material/GetApp';
import html2canvas from 'html2canvas';

const SignatureButtons = (props) => {
  const {styles, sigCanvas, sigWrite, reset, setIsEmpty, isEmpty, copy, type, bgColor, handleMode, setUserSign, setDownLoadPNG, setImageBaseURL, mode} = props;
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
    setDownLoadPNG((prev) => !prev)
  }

  const handleBaseImageURL = () => {
    if(mode?.type) {
      html2canvas(sigWrite.current)
      .then((canvas) => {
        const imageURL = canvas.toDataURL("image/png").split(",")[1];
        setImageBaseURL(imageURL)
      });
    } else{
      const imageURL = sigCanvas.current.toDataURL();
      setImageBaseURL(imageURL)
    }
  }

  const IconToolTip = ({Icon, title, className, style, onClick}) => (
    <Tooltip title={title}>
      <Icon
        className={className}
        style={style}
        onClick={onClick}
      />
    </Tooltip>
  )
  console.log("IsEmpty: ", isEmpty)
    
  return (
    <Box className="signatureBtn" style={styles.signatureBtn}>
    {reset.isEnabled 
      && 
      <IconToolTip 
        Icon={RotateLeftIcon} 
        title="Reset" 
        className="actionBtn" 
        style={styles.actionBtn} 
        onClick={() => {sigCanvas?.current?.clear(); fillCanvasBackground(bgColor); setIsEmpty(true)}} 
      />
    }
    {copy.isEnabled 
      && 
      <IconToolTip 
        Icon={ContentCopyIcon}
        title="Copy"
        className="actionBtn" 
        style={styles.actionBtn}
        onClick={() => {
          handleBaseImageURL()
        }}
      />
    }
    <IconToolTip 
      Icon={GestureIcon}
      title="Draw"
      className="writeBtn" 
      style={styles.writeBtn} 
      onClick={(e) => handleMode("draw")}
    />
    <Tooltip title="Write">
      {type.isEnabled 
        && 
        <SortByAlphaIcon 
          className="typeBtn" 
          style={styles.typeBtn} 
          onClick={(e) => {handleMode("type"), setTextFieldAnchor(e.currentTarget), setIsEmpty(false)}}
        />
      }
      <Popover
        open={openTextField}
        anchorEl={textFieldAnchor}
        onClose={() => setTextFieldAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box style={{ padding: '0.5rem', width: 200, display: 'flex', alignItems: 'center', justifyContent:'center', gap:'1rem' }}>
          <TextField id="standard-basic" label="Signature" variant="standard" onChange={(e) => setUserSign(e.target.value)}/>
        </Box>
      </Popover>
    </Tooltip>
    <IconToolTip 
      Icon={GetAppIcon}
      title="Download PNG"
      className="download"
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
