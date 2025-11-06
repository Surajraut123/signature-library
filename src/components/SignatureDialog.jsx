import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import styles from './styles'
import { Box, Button, Tooltip } from '@mui/material';
import useResponsiveScale from "./userResponsiveScale";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ActionButtons from './ActionButtons';
import SignatureButtons from './SignatureButtons';
import SignatureTypeSuggestions from './signatureTypeSuggestions/SignatureTypeSuggestions';
import html2canvas from 'html2canvas';
import GestureIcon from '@mui/icons-material/Gesture';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';



const SignatureDialog = (props) => {
  const { reset=true, copy, type, backgroundColor, pencilColor, pencilWidth, setImageBaseURL, imageBaseURL, base64String} = props
  const sigCanvas = useRef({});
  const sigWrite = useRef({});
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [penWidth, setPenWidth] = React.useState(1);
  const containerRef = useRef(null);
  const scale = useResponsiveScale(containerRef);
  const [isEmpty, setIsEmpty] = useState(base64String ? false: true);
  const [doneStatus, setDoneStatus] = useState(false)
  const [userSign, setUserSign] = useState("")
  const [downloadPNG, setDownLoadPNG] = useState(false)
  const[typeCompleteStatus, setTypeCompleteStatus] = useState(false)
  console.log("isEmpty in dialog: ", isEmpty)

  const [mode, setMode] = useState({
    draw: true,
    type: false
  })

  useEffect(() => {
    isEmpty && setUserSign("")
  }, [isEmpty])

  const handleMode = (action) => {
    setMode({draw: action === "draw", type: action === "type"})
  }

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

  useEffect(() => {
    if (sigCanvas.current && mode?.draw) {
      const isEmpty = sigCanvas.current.isEmpty();
      if (isEmpty) {
        return;
      }

      const canvas = sigCanvas.current.getCanvas();
      const dataURL = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'signature.png';
      link.click();
    } else{
      html2canvas(sigWrite.current, {
        backgroundColor: null,
        scale: 2,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "signature.png";
        const imageURL = canvas.toDataURL("image/png");
        setImageBaseURL && setImageBaseURL(imageURL)
        link.href = canvas.toDataURL("image/png")
        link.click();
      });
    }
  }, [downloadPNG])

  useEffect(() => {
    if (mode.draw && sigCanvas.current) {
      const canvas = sigCanvas.current.getCanvas();
      const ctx = canvas.getContext("2d");
  
      const box = document.querySelector(".react-resizable");
      if (canvas && box) {
        const rect = box.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
      if (imageBaseURL) {
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = imageBaseURL;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }, [mode.draw]);

  

  useEffect(() => {
    if (!sigCanvas.current || !base64String) return;
    sigCanvas.current.fromDataURL(base64String);
  }, [base64String, mode]);
  
  
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
        <Box className="signatureBox" style={styles.signatureBox}>
          <Box className="signatureBoard" style={styles.signatureBoard}>
            {!doneStatus && <SignatureButtons
              styles={styles}
              reset={{isEnabled: reset}}
              copy={{isEnabled: copy}}
              type={{isEnabled: type}}
              sigCanvas={sigCanvas}
              sigWrite={sigWrite}
              bgColor={bgColor}
              handleMode={handleMode}
              setIsEmpty={setIsEmpty}
              isEmpty={isEmpty}
              setUserSign={setUserSign}
              setDownLoadPNG={setDownLoadPNG}
              setImageBaseURL={setImageBaseURL}
              mode={mode}
            />}

            <Box className="board" style={{ ...styles.board, position: "relative" }}>
              <ResizableBox
                width={800}
                height={400}
                onResizeStart={() => {
                  if (sigCanvas.current) {
                    const img = new Image();
                    img.src = sigCanvas.current.toDataURL();
                    sigCanvas.current._lastImage = img;
                  }
                }}
                onResizeStop={(e, data) => {
                  if (!sigCanvas.current) return;
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
                    <Tooltip title="Expand">
                      <ChevronRightIcon
                        style={{
                          fontSize: "1.8rem",
                          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                        }}
                      />
                    </Tooltip>
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
              {
                mode.draw ? 
                  <SignatureCanvas
                    ref={sigCanvas}
                    penColor={color}
                    canvasProps={{ className: "sigCanvas" }}
                    onBegin={() => setIsEmpty(false)}
                    onEnd={() => {
                      if (!sigCanvas.current) return;
                      setIsEmpty(sigCanvas.current.isEmpty()); 
                      const canvas = sigCanvas.current.getCanvas();
                      const offscreen = document.createElement("canvas");
                      offscreen.width = canvas.width;
                      offscreen.height = canvas.height;
                      const offCtx = offscreen.getContext("2d");

                      offCtx.fillStyle = bgColor;
                      offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
                      offCtx.drawImage(canvas, 0, 0);

                      const mergedBase64 = offscreen.toDataURL("image/png");
                      setImageBaseURL && setImageBaseURL(mergedBase64);
                    }} 
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "2px dashed #ccc",
                      borderRadius: "15px",
                      cursor: "crosshair",
                    }}
                    minWidth={penWidth}
                    maxWidth={penWidth}
                  />
                :
                  <SignatureTypeSuggestions 
                    userSign={userSign}
                    penColor={color}
                    bgColor={bgColor}
                    downloadPNG={downloadPNG}
                    sigWrite={sigWrite}
                    setUserSign={setUserSign}
                    setTypeCompleteStatus={setTypeCompleteStatus}
                    typeCompleteStatus={typeCompleteStatus}
                    setIsEmpty={setIsEmpty}
                    doneStatus={doneStatus}
                  />
              }
              </ResizableBox>
            </Box>

            {!doneStatus && 
              <ActionButtons 
                styles={styles} 
                pen={{isEnabled: pencilWidth, value: penWidth, set: setPenWidth}}
                penColor={{isEnabled: pencilColor, value: color, set: setColor}}
                bgColor={{isEnabled: backgroundColor, value: bgColor, set: setBgColor}}
              />
            }
          </Box>
          <Box 
            className="completeStatus"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              padding: "1rem 0"
            }}
          >
            {!doneStatus && <Button 
              variant='contained'
              startIcon={
                <GestureIcon />
              }
              sx={{
                '& .MuiButton-startIcon': {
                  margin: 0,
                },
                backgroundColor: mode?.draw ? 'black' : "white",
                color: mode?.draw ? 'white' : 'black',
                border: mode?.draw && '1px solid',
                borderRadius:'10px'
              }}
              onClick={() => handleMode("draw")}
            >
              Draw
            </Button>}
            {!doneStatus && <Button 
              variant='contained'
              startIcon={
                <SortByAlphaIcon/>
              }
              sx={{
                '& .MuiButton-startIcon': {
                  marginRight: 0.5,
                },
                backgroundColor: mode?.draw ? 'white' : "black",
                color:mode?.draw ? 'black': "white",
                border: mode?.type && '1px solid',
                borderRadius:'10px'
              }}
              onClick={() => {handleMode("type"); setTypeCompleteStatus(false)}}
            >
              Type
            </Button>}
            <Button 
              style={{
                color: "white", 
                background: doneStatus ? "darkgray" : "blueviolet", 
                opacity: isEmpty ? 0.5 : 1, 
                pointerEvents: isEmpty ? "none" : "auto",
                cursor: isEmpty ? "not-allowed" : "pointer",
                borderRadius:'10px'
              }}
              onClick={(prev) => setDoneStatus(prev => !prev)}
            >
              {doneStatus ? "Re-try" : "Done"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignatureDialog;
