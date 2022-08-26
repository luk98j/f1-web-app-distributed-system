import { style } from '@mui/system';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../utils/API';
import Grid from '@mui/material/Grid';
import AnimatedCheckmark, { MODES } from 'react-animated-checkmark'
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import EventIcon from '@mui/icons-material/Event';

const styles = {
    mainRectangle:{
      width: "85%",
      height: "20%",
      borderRadius: "25px",
      //background: "linear-gradient(to right, #cc33ff 0%, #3333cc 100%)",
      top: "7%",
      left: "7%",
      //border: "1px solid black",
      //padding: "20px",
      position: "fixed"
    },
    fastestLapRectangle:{
        marginTop: "2px",
        // margin: "2px",
        width: "42%",
        height: "19%",
        borderRadius: "25px",
        border: "1px solid black",
        position: "fixed",
        background: "white"
    },
    eventRectangle:{
        // margin: "2px",
        marginTop: "2px",
        width: "42%",
        height: "19%",
        borderRadius: "25px",
        border: "1px solid black",
        position: "fixed",
        background: "white"
    },
    oneLiner:{
        // display: "flex",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
    
  }

function EventComponent(props){
    const [keyAndSessionId, setKeyAndSessionId] = React.useState(undefined);
    const [fastestLap, setFastestLap] = React.useState(undefined);
    const [lastEvent, setLastEvent] = React.useState({eventName: undefined, value: undefined})
    const [runOnce, setRunOnce] = React.useState(true);
    let interval;

    React.useEffect(()=>{
        if(props!=undefined && keyAndSessionId===undefined){
            setKeyAndSessionId(props.keyAndSession)
            
        } 
        
        if(keyAndSessionId!=undefined){
            console.log(fastestLap)
            interval = setInterval(() => 
            {
                API.getLastFastestLap(keyAndSessionId.sessionUid, keyAndSessionId.key)
                    .then((response) => {
                        if(response.request.status === 200){
                            
                            if(fastestLap == undefined){
                                console.log(response)
                                
                                succesMessage("New Fastest Lap "+ response.data.nameOfDriver + "  time: "+ response.data.time)
                            } else if (response.data.carId != fastestLap.carId && response.data.time != fastestLap.time){
                                
                                // setFastestLap(response.data)
                                succesMessage("New Fastest Lap "+ response.data.nameOfDriver + "  time: "+ response.data.time)
                            }
                            setFastestLap(response.data)
                        }
                    },
                    (error) =>{

                    })

                API.getLastEvent(keyAndSessionId.sessionUid, keyAndSessionId.key)
                    .then((response) => {
                        if(response.request.status === 200){
                            console.log(lastEvent.eventName)
                            if(lastEvent.eventName == undefined && lastEvent.eventValue == undefined){
                                console.log(response.data.value)
                                let value = response.data.value
                                if(value !== ""){
                                    infoMessage(response.data.eventName + " "+ response.data.value)
                                } else {
                                    infoMessage(response.data.eventName)
                                }
                                
                                
                            } else if (response.data.value !== lastEvent.eventValue && response.data.eventName !== lastEvent.eventName){
                                console.log(response.data.value)
                                let value = response.data.value
                                if(value !== ""){
                                    infoMessage(response.data.eventName + " "+ response.data.value)
                                } else {
                                    infoMessage(response.data.eventName)
                                }
                                //setLastEvent({eventName: response.data.eventName, value: response.data.value})
                            } else {
                                console.log("nothing")
                            }
                            setLastEvent({eventName: response.data.eventName, value: response.data.value})
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
    },[keyAndSessionId, lastEvent, fastestLap])


    window.onpopstate = () => {
        stopTimeout()
        window.location.reload(true)
      }

    const stopTimeout  =()=>{
        clearInterval(interval)
    }

    function functionCall (keyAndSessionId){
            setRunOnce(false);
            getLastFastestLapFromApi(keyAndSessionId)
            getLastEventFromApi(keyAndSessionId)
    }

    const getLastFastestLapFromApi = (keyAndSessionId)=>{
        
        
    }

    function getLastEventFromApi(keyAndSessionId){
        
        API.getLastEvent(keyAndSessionId.sessionUid, keyAndSessionId.key)
        .then((response) => {
            if(response.request.status === 200){
                console.log(lastEvent.eventName)
                if(lastEvent.eventName == undefined && lastEvent.eventValue == undefined){
                    console.log(response.data.value)
                    let value = response.data.value
                    if(value !== ""){
                        infoMessage(response.data.eventName + " "+ response.data.value)
                    } else {
                        infoMessage(response.data.eventName)
                    }
                    
                    
                } else if (response.data.value !== lastEvent.eventValue && response.data.eventName !== lastEvent.eventName){
                    console.log(response.data.value)
                    let value = response.data.value
                    if(value !== ""){
                        infoMessage(response.data.eventName + " "+ response.data.value)
                    } else {
                        infoMessage(response.data.eventName)
                    }
                    //setLastEvent({eventName: response.data.eventName, value: response.data.value})
                } else {
                    console.log("nothing")
                }
                setLastEvent({eventName: response.data.eventName, value: response.data.value})
            }
        },
        (error) =>{

        })
        
    }

    const succesMessage = (text) =>{
        toast.success(text, {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
      });
    }

    const infoMessage = (text) =>{
        toast.info(text, {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
      });
    }

    const warnMessage = (text) =>{
        toast.warn(text, {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
      });
    }

    return(
        <div>
            <div style={styles.mainRectangle}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div style={styles.eventRectangle}>
                            {lastEvent.eventName != undefined ? (
                                <div>
                                    <center>
                                        <EventIcon></EventIcon>
                                        <h2>
                                            
                                            {lastEvent.eventName.toUpperCase()}
                                            {lastEvent.value != "" || lastEvent.value != undefined ?(
                                                <div>
                                                    {lastEvent.value == "true" &&
                                                    <div>ENABLE</div>}
                                                    {lastEvent.value == "false" &&
                                                    <div>DISABLE </div>}
                                                </div>
                                            ):(
                                                <div>
                                                </div>
                                            )}
                                        </h2>
                                    </center>
                                </div>
                            ):(
                                <div>
                                    <center>
                                        <AnimatedCheckmark mode={MODES.LOADING} size={70}></AnimatedCheckmark>
                                        </center>
                                </div>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                    <div style={styles.fastestLapRectangle}>
                        {fastestLap != undefined ? (
                                    <div>
                                        <center>
                                            <SportsScoreIcon></SportsScoreIcon>
                                            <h2>
                                            {fastestLap.nameOfDriver}<br></br>
                                            {fastestLap.time}
                                            </h2>
                                        </center>
                                    </div>
                                ):(
                                    <div>
                                        <center>
                                            <AnimatedCheckmark mode={MODES.LOADING} size={70}></AnimatedCheckmark>
                                        </center>
                                    </div>
                                )}
                    </div>
                    </Grid>
                </Grid>
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

export default EventComponent;