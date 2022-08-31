import { style } from '@mui/system';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../utils/API';
import Grid from '@mui/material/Grid';
import AnimatedCheckmark, { MODES } from 'react-animated-checkmark'
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import EventIcon from '@mui/icons-material/Event';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import HeavyRain from '../pictures/heavy_rain.png';
import LightCloud from '../pictures/light_cloud.png';
import LightRain from '../pictures/light_rain.png';
import Overcast from '../pictures/overcast.png';
import Sun from '../pictures/sun.png'
import SafetyCar from '../pictures/sc.gif';
import VSC from '../pictures/vsc.png'

const styles = {
    mainRectangle:{
      width: "50%",
      height: "20%",
      borderRadius: "25px",
      //background: "linear-gradient(to right, #cc33ff 0%, #3333cc 100%)",
      top: "7%",
      left: "50%",
      //border: "1px solid black",
      //padding: "20px",
      position: "fixed"
    },
    sessionRectangle:{
        // margin: "2px",
        marginTop: "2px",
        width: "42%",
        height: "22%",
        borderRadius: "25px",
        border: "1px solid black",
        position: "fixed",
        background: "white",
        
    },
    oneLiner:{
        display: "flex",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
    pictures:{
        width: "20px"
    },
    picturesSC:{
        width: "30px"
    },
    tableDesing:{
        maxHeight:"100px",
        padding: "2px",

    },
    cellDesign:{
        padding: "4px",
    },
    marshalZones:{
        paddingLeft:"12px",
        padding: "0px",
        height:"30px",
        width: "30px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display:"flex"
    },
    noneFlag:{
        width:"25px",
        height:"25px",
        backgroundColor: "#999999",
        
    },
    greenFlag:{
        width:"25px",
        height:"25px",
        backgroundColor: "green"
    },
    blueFlag:{
        width:"25px",
        height:"25px",
        backgroundColor: "blue"
    },
    yellowFlag:{
        width:"25px",
        height:"25px",
        backgroundColor: "yellow"
    },
    redFlag:{
        width:"25px",
        height:"25px",
        backgroundColor: "red"
    },
    
  }

function SessionInformation(props){
    const [keyAndSessionId, setKeyAndSessionId] = React.useState(undefined);
    const [data, setData] = React.useState(undefined);
    let interval;

    React.useEffect(()=>{
        if(props!=undefined && keyAndSessionId===undefined){
            setKeyAndSessionId(props.keyAndSession)
            
        } 
        
        if(keyAndSessionId!=undefined){
            interval = setInterval(() => 
            {
                API.getSessionInfo(keyAndSessionId.sessionUid, keyAndSessionId.key)
                    .then((response) => {
                        if(response.request.status === 200){
                            console.log(response.data)
                            setData(response.data)
                        }
                    },
                    (error) =>{

                    })
            }, 2000);
            return () => {
                clearInterval(interval);
            };
            
        } else {
            stopTimeout()
        }
    },[keyAndSessionId, data])


    window.onpopstate = () => {
        stopTimeout()
        window.location.reload(true)
      }

    const stopTimeout  =()=>{
        clearInterval(interval)
    }

    return(
        <div>
            <div style={styles.mainRectangle}>
                <div style={styles.sessionRectangle}>
                    {data !=undefined ? (
                            <div>
                                <Table style={styles.tableDesing}>
                                    <TableBody >
                                        <TableRow >
                                            <TableCell style={styles.cellDesign}>
                                                {data.safetyCarStatus == "VIRTUAL_SAFETY_CAR" && (
                                                    <div>
                                                        <img src={VSC} style={styles.picturesSC} alt="vsc" /><br/>
                                                        <b>Virtual SC</b>
                                                    </div>
                                                )}
                                                 {data.safetyCarStatus == "FULL_SAFETY_CAR" && (
                                                    <div>
                                                        <img src={SafetyCar} style={styles.picturesSC} alt="vsc" /><br/>
                                                        <b>Safety Car</b>
                                                    </div>
                                                )}
                                                {data.safetyCarStatus == "NO_SAFETY_CAR" && (
                                                    <div>
                                                        <center>
                                                        <b>NO SAFETY CAR</b>
                                                        </center>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell style={styles.cellDesign}>
                                                {data.trackName != undefined && (
                                                    <div>
                                                    <b>{data.trackName}</b>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell style={styles.cellDesign}>
                                                {data.pitSpeedLimit != undefined && (
                                                    <div>
                                                        <center>
                                                            <b> Pit speed limit:<br/>
                                                            {data.pitSpeedLimit}km/h</b>
                                                        </center>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell style={styles.cellDesign}>
                                                {data.trackTemperature != undefined && (
                                                    <div>
                                                        <center>
                                                            <b>Actual track temperature:<br/>
                                                            {data.trackTemperature}°</b>
                                                        </center>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell style={styles.cellDesign}>
                                                {data.airTemperature != undefined && (
                                                    <div>
                                                        <center>
                                                            <b>Actual air temperature:<br/>
                                                            {data.airTemperature}°</b>
                                                        </center>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell style={styles.cellDesign}>
                                                {data.weather != undefined && (
                                                    <div>
                                                    <b>
                                                    <center>
                                                    {data.weather == 'CLEAR' && (
                                                        <div>
                                                            <img src={Sun} style={styles.pictures} alt="vsc" /><br/>
                                                            {data.weather}
                                                        </div>
                                                    )}
                                                    {data.weather == 'LIGHT CLOUD' && (
                                                        <div>
                                                            <img src={LightCloud} style={styles.pictures} alt="vsc" /><br/>
                                                            {data.weather}
                                                        </div>
                                                    )}
                                                     {data.weather == 'OVERCAST' && (
                                                        <div>
                                                            <img src={Overcast} style={styles.pictures} alt="vsc" /><br/>
                                                            {data.weather}
                                                        </div>
                                                    )}
                                                    {data.weather == 'LIGHT RAIN' && (
                                                        <div>
                                                            <img src={LightRain} style={styles.pictures} alt="vsc" /><br/>
                                                            {data.weather}
                                                        </div>
                                                    )}
                                                    {data.weather == 'HEAVY RAIN' && data.weather == 'STORM' (
                                                        <div>
                                                            <img src={HeavyRain} style={styles.pictures} alt="vsc" /><br/>
                                                            {data.weather}
                                                        </div>
                                                    )}
                                                   
                                                    </center>
                                                    </b>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow alig="center">
                                            
                                            {data.weatherForecastSamples != undefined && data.weatherForecastSamples.map((key, data) => {
                                                return(
                                                <TableCell style={styles.cellDesign}>
                                                    <div>
                                                        
                                                        <center>
                                                        <b>
                                                        {key.weather == 'CLEAR' && (
                                                            <div>
                                                                <img src={Sun} style={styles.pictures} alt="vsc" /><br/>
                                                                {key.weather}
                                                            </div>
                                                        )}
                                                        {key.weather == 'LIGHT_CLOUD' && (
                                                            <div>
                                                                <img src={LightCloud} style={styles.pictures} alt="vsc" /><br/>
                                                                {key.weather}
                                                            </div>
                                                        )}
                                                        {key.weather == 'OVERCAST' && (
                                                            <div>
                                                                <img src={Overcast} style={styles.pictures} alt="vsc" /><br/>
                                                                {key.weather}
                                                            </div>
                                                        )}
                                                        {key.weather == 'LIGHT_RAIN' && (
                                                            <div>
                                                                <img src={LightRain} style={styles.pictures} alt="vsc" /><br/>
                                                                {key.weather}
                                                            </div>
                                                        )}
                                                        {key.weather == 'HEAVY_RAIN' && key.weather == 'STORM' (
                                                            <div>
                                                                <img src={HeavyRain} style={styles.pictures} alt="vsc" /><br/>
                                                                {key.weather}
                                                            </div>
                                                        )} 
                                                        +{key.timeOffset} min
                                                        </b>
                                                        </center>
                                                        
                                                        </div>
                                                    
                                                </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                            <div style={styles.oneLiner}>
                                           <b> Marshal Zones :</b>
                                            {data.marshalZones != undefined && data.marshalZones.map((key, data) => {
                                                return(
                                                    <div style={styles.marshalZones}>
                                                        {key.zoneFlag == 'NONE' && (
                                                            <div style={styles.noneFlag}>
                                                                <center>
                                                                    <b>{data+1}</b>
                                                                </center>
                                                            </div>
                                                        )}
                                                        {key.zoneFlag == 'GREEN' && (
                                                            <div style={styles.greenFlag}>
                                                                <center>
                                                                    <b>{data+1}</b>
                                                                </center>
                                                            </div>
                                                        )}
                                                        {key.zoneFlag == 'BLUE' && (
                                                            <div style={styles.blueFlag}>
                                                                <center>
                                                                    <b>{data+1}</b>
                                                                </center>
                                                            </div>
                                                        )}
                                                        {key.zoneFlag == 'YELLOW' && (
                                                            <div style={styles.yellowFlag}>
                                                                <center>
                                                                    <b>{data+1}</b>
                                                                </center>
                                                            </div>
                                                        )}
                                                        {key.zoneFlag == 'RED' && (
                                                            <div style={styles.redFlag}>
                                                                <center>
                                                                    <b>{data+1}</b>
                                                                </center>
                                                            </div>
                                                        )}
                                                        
                                                        
                                                    </div>
                                                )
                                            })}
                                            </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        ):(
                            <div>
                                <center>
                                    <AnimatedCheckmark mode={MODES.LOADING} size={70}></AnimatedCheckmark>
                                </center>
                            </div>
                        )}
                            
                    
                </div>
            </div>
            
            <ToastContainer
                position="top-right"
                autoClose={7000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
        
    )

}

export default SessionInformation;