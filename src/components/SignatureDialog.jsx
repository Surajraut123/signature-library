import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styles from './styles'
import { Box, Button, Popover, Slider, TextField, Typography } from '@mui/material';
import { SketchPicker } from 'react-color';
import DrawIcon from '@mui/icons-material/Draw';
import PaletteIcon from '@mui/icons-material/Palette';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GestureIcon from '@mui/icons-material/Gesture';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import useResponsiveScale from "./userResponsiveScale";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import GetAppIcon from '@mui/icons-material/GetApp';



const SignatureDialog = (props) => {
  const { reset, copy, type, backgroundColor, pencilColor, pencilWidth} = props
  const sigCanvas = useRef({});
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [penWidth, setPenWidth] = React.useState(1);
  const [widthAnchor, setWidthAnchor] = React.useState(null);
  const [textFieldAnchor, setTextFieldAnchor] = React.useState(null);
  const openWidth = Boolean(widthAnchor);
  const openTextField = Boolean(textFieldAnchor);
  const containerRef = useRef(null);
  const scale = useResponsiveScale(containerRef);
  const [isEmpty, setIsEmpty] = useState(true);


  const [mode, setMode] = useState({
    draw: true,
    type: false
  })

  const handleMode = (action) => {
    setMode({draw: action === "draw", type: action === "type"})
  }
  const handleWrite = (action) => {
    if(action === "ok") {
    }
    setMode({ draw: action !== "cancel", type: action === "cancel" });
  }
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [penColorAnchor, setPenColorAnchor] = useState(null);
  const [bgColorAnchor, setBgColorAnchor] = useState(null);
  const openPenColor = Boolean(penColorAnchor);
  const openBgColor = Boolean(bgColorAnchor);

  useEffect(() => {
    fillCanvasBackground(bgColor);
  }, [bgColor]);
  

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

  useEffect(() => {
    const handleResize = () => {
      if (sigCanvas.current) {
        const parent = sigCanvas.current.getCanvas().parentElement; 
        const canvas = sigCanvas.current.getCanvas();
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        fillCanvasBackground(bgColor);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  
  
  return (
    <Box className="main" 
      style={{
        ...styles.main,
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        transition: "transform 0.3s ease",
      }}
    >
      <Box className="bodyContent" style={styles.bodyContent}>
        <Box className="suggestions" style={{display: 'flex', gap: '1rem', width: '100%', overflowX: 'scroll'}}>
          <Button variant='outlined' style={{
            color: "black",
            fontWeight: 800,
            fontSize: "1.5rem",
            borderRadius: "20px",
            border: "1px solid brown",
            padding: "0.3rem 2rem"
          }}
          >
            Test
          </Button>
        </Box>
        
        <Box className="signatureBox" style={styles.signatureBox}>
          <Box className="signatureBoard" style={styles.signatureBoard}>

            <Box className="signatureBtn" style={styles.signatureBtn}>
              {reset && <RotateLeftIcon className="actionBtn" style={styles.actionBtn} onClick={() => {sigCanvas.current.clear(); fillCanvasBackground(bgColor); setIsEmpty(true)}} />}
              {copy && <ContentCopyIcon className="actionBtn" style={styles.actionBtn}
                  onClick={() => {
                    const data = sigCanvas.current.toDataURL();
                    navigator.clipboard.writeText(data);
                    alert('Signature copied!');
                  }}
                />}
              <GestureIcon className="writeBtn" style={styles.writeBtn} onClick={(e) => handleMode("draw")}/>
              {type && <SortByAlphaIcon className="typeBtn" style={styles.typeBtn} onClick={(e) => {handleMode("type"), setTextFieldAnchor(e.currentTarget)}}/>}
              <Popover
                open={openTextField}
                anchorEl={textFieldAnchor}
                onClose={() => setTextFieldAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              >
                <Box style={{ padding: '0.5rem', width: 200, display: 'flex', alignItems: 'center', justifyContent:'center', gap:'1rem' }}>
                  <TextField id="standard-basic" label="Signature" variant="standard" />
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

            <Box className="board" style={{ ...styles.board, position: "relative" }}>
              <ResizableBox
                width={800}
                height={400}
                minConstraints={[400, 200]}
                maxConstraints={[1000, 600]}
                resizeHandles={["se"]}
                onResizeStop={(e, data) => {
                  const canvas = sigCanvas.current.getCanvas();
                  if (canvas) {
                    canvas.width = data.size.width;
                    canvas.height = data.size.height;
                    fillCanvasBackground(bgColor);
                  }
                }}
                handle={
                  <span
                    className="custom-handle-se"
                    style={{
                      position: "absolute",
                      bottom: "6px",
                      right: "6px",
                      cursor: "se-resize",
                      transform: "rotate(45deg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ff7e5f",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <ChevronRightIcon
                      style={{
                        fontSize: "1.8rem",
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                      }}
                    />
                  </span>
                }
                
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  background: bgColor,
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
                  border: "1px dashed"
                }}
              >
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor={color}
                  canvasProps={{ className: "sigCanvas" }}
                  onBegin={() => setIsEmpty(false)}
                  onEnd={() => setIsEmpty(sigCanvas.current.isEmpty())} 
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "2px dashed #ccc",
                    borderRadius: "15px",
                    cursor: "crosshair",
                    backgroundColor: bgColor,
                  }}
                  minWidth={penWidth}
                  maxWidth={penWidth}
                />
              </ResizableBox>
            </Box>

            <Box className="actions" style={styles.actions}>
              <Box className="actionButtons" style={styles.actionButtons}>
                {pencilWidth && <DrawIcon onClick={(e) => setWidthAnchor(e.currentTarget)} className="actionBtn" style={styles.actionBtn}/>}
                <Popover
                  open={openWidth}
                  anchorEl={widthAnchor}
                  onClose={() => setWidthAnchor(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                  <div style={{ padding: '1rem', width: 200 }}>
                    <Slider
                      min={1}
                      max={20}
                      value={penWidth}
                      valueLabelDisplay="auto"
                      onChange={(e, val) => setPenWidth(val)}
                    />
                  </div>
                </Popover>

                {pencilColor && <PaletteIcon onClick={(e) => setPenColorAnchor(e.currentTarget)} style={styles.writeBtn}/>}
                <Popover
                  open={openPenColor}
                  anchorEl={penColorAnchor}
                  onClose={() => setPenColorAnchor(null)}
                >
                  <SketchPicker color={color} onChangeComplete={(newColor) => setColor(newColor.hex)} />
                </Popover>

                {backgroundColor && <WallpaperIcon onClick={(e) => setBgColorAnchor(e.currentTarget)} style={styles.typeBtn}/>}
                <Popover
                  open={openBgColor}
                  anchorEl={bgColorAnchor}
                  onClose={() => setBgColorAnchor(null)}
                >
                  <SketchPicker color={bgColor} onChangeComplete={(newColor) => setBgColor(newColor.hex)} />
                </Popover>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignatureDialog;
