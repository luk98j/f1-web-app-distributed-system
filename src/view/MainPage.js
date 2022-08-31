import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AnimatedCheckmark, { MODES } from 'react-animated-checkmark'


const styles = {
  mainRectangle:{
    width: "90%",
    height: "90%",
    borderRadius: "25px",
    background: "linear-gradient(to right, #cc33ff 0%, #3333cc 100%)",
    top: "5%",
    left: "5%",
    //padding: "20px",
    position: "fixed"
  },
  rectangleWithDescriptionAndLink:{
    width:"50%",
    height:"50%",
    top: "15%",
    left: "25%",
    position: "fixed"
  },
  rectangleWithKey:{
    width:"50%",
    height:"50%",
    top: "45%",
    left: "25%",
    position: "fixed"
  },
  rectangleWithButton:{
    width:"50%",
    height:"50%",
    top: "70%",
    left: "25%",
    position: "fixed"
  },
  oneLiner:{
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  middleDiv:{
    display: "inline-block",
    verticalAlign: "middle",
 
  },
  disableDecoration:{
    textDecoration: "none",
  },
  textFieldStyle:{
    backgroundColor: "white",
    opacity:"0.6"
  },
  
}

function MainPage() {
  const [checked, setChecked] = React.useState(false);
  const [gameKey, setGameKey] = React.useState("")
  const [mode, setMode] = React.useState(MODES.LOADING)
  const [isDisable, setDisable] = React.useState(true)

  React.useEffect(()=>{
    if(checked === true && gameKey.length === 36){
      setMode(MODES.SUCCESS)
      setDisable(false)
    } else {
      setMode(MODES.LOADING)
      setDisable(true)
      
    }
  },[checked, gameKey])

  window.onpopstate = () => {
    window.location.reload(true)
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleKey = (event) =>{
      setGameKey(event.target.value)
  }

  return (
    <div>
      <div style={styles.mainRectangle}>
        <center><h1>F1 distributed system</h1></center>
      
        <div style={styles.rectangleWithDescriptionAndLink}>
          
          <h3>
            <center>
            The first step for the application to work is to download the client's desktop version in order to receive data for the web application
            </center>
          </h3>
          <div style={styles.oneLiner}>
          <center>
          <Link to="/f1-client-app.exe" target="_blank" download style={styles.disableDecoration}>
              <Button variant="contained" color="error">
                Download app
              </Button>
            </Link>
            <Checkbox
              color="default"
              checked={checked}
              onChange={handleChange}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }}
              inputProps={{ 'aria-label': 'controlled' }}
            /> Mark as done
            </center>
          </div>
        </div>
        <div style={styles.rectangleWithKey}>
          <center>
            <h3>
              At this point, please put the key received in the desktop application and press start
            </h3>
            <TextField 
              id="filled-basic" 
              label="Game key" 
              variant="filled"  
              sx={{ m: 1, width: '65ch' }} 
              style={styles.textFieldStyle} 
              inputProps={{ maxLength: 36 }}
              onChange={handleKey}
            />
            <AnimatedCheckmark mode={mode} size={70}/>
          </center>
        </div>
        <div style={styles.rectangleWithButton}>
        
          <center>
            <Link to={"/key/"+gameKey} style={styles.disableDecoration}>
              <Button variant="contained" color="error" size="large" disabled={isDisable}>
                  Start!
              </Button>
            </Link>
          </center>
          
        </div>
      </div>
    </div>
  );
}

export default MainPage;
