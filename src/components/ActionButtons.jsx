import { Box, Popover, Slider, Tooltip } from '@mui/material'
import React from 'react'
import DrawIcon from '@mui/icons-material/Draw';
import PaletteIcon from '@mui/icons-material/Palette';
import { SketchPicker } from 'react-color';
import WallpaperIcon from '@mui/icons-material/Wallpaper';

const ActionButtons = (props) => {

  const {styles, pen, bgColor, penColor} = props
  const [widthAnchor, setWidthAnchor] = React.useState(null);
  const [penColorAnchor, setPenColorAnchor] = React.useState(null);
  const [bgColorAnchor, setBgColorAnchor] = React.useState(null);
  const openWidth = Boolean(widthAnchor);
  const openPenColor = Boolean(penColorAnchor);
  const openBgColor = Boolean(bgColorAnchor);

  return (
    <Box className="actions" style={styles.actions}>
     <Box className="actionButtons" style={styles.actionButtons}>
      <Tooltip title="Pen Width">
        {pen.isEnabled && <DrawIcon onClick={(e) => setWidthAnchor(e.currentTarget)} className="actionBtn" style={styles.actionBtn}/>}
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
              value={pen.value}
              valueLabelDisplay="auto"
              onChange={(e, val) => pen.set(val)}
            />
          </div>
        </Popover>
      </Tooltip>

      <Tooltip title="Pen Color">
        {penColor.isEnabled && <PaletteIcon onClick={(e) => setPenColorAnchor(e.currentTarget)} style={styles.writeBtn}/>}
        <Popover
          open={openPenColor}
          anchorEl={penColorAnchor}
          onClose={() => setPenColorAnchor(null)}
        >
          <SketchPicker color={penColor.value} onChangeComplete={(newColor) => penColor.set(newColor.hex)} />
        </Popover>
      </Tooltip>

      <Tooltip title="Background Color">
        {bgColor.isEnabled && <WallpaperIcon onClick={(e) => setBgColorAnchor(e.currentTarget)} style={styles.typeBtn}/>}
        <Popover
          open={openBgColor}
          anchorEl={bgColorAnchor}
          onClose={() => setBgColorAnchor(null)}
        >
          <SketchPicker color={bgColor.value} onChangeComplete={(newColor) => bgColor.set(newColor.hex)} />
        </Popover>
      </Tooltip>
    </Box>
  </Box>
  )
}

export default ActionButtons
