import * as React from 'react';
import AnimatedCheckmark, { MODES } from 'react-animated-checkmark'
import API from "../utils/API.js"
import { useParams, useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventComponent from '../component/EventComponent.js';
import MainTableComponent from '../component/MainTableComponent.js';
import SessionInformation from '../component/SessionInformation.js';
import Grid from '@mui/material/Grid';

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
    loadingIcon:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
    }
  }


function PageWithData(props){
    const [mode, setMode] = React.useState(MODES.LOADING)
    const [keyAndSessionId, setKeyAndSessionId] = React.useState(undefined);
    const {keyId} = useParams();
   

    React.useEffect(()=>{
        if(keyAndSessionId === undefined){
            
            checkIfKeyExists(keyId)
        }
       
    },[keyAndSessionId])

   const checkIfKeyExists = (key) =>{
    API.getSessionUid(key).then(
        (response) => {
            
            if(response.request.status === 200){
                
                const keyAndSesssionUid = {
                    sessionUid: response.data.sessionUid,
                    key: response.data.key
                }
                
                setKeyAndSessionId(keyAndSesssionUid)
                succesMessage("FOUND KEY!")
                setMode(MODES.SUCCESS)
            } 
        },
        (error) =>{
            if(error.response.status === 404){
                errorMessage("Not found key, try once again")
            } else {
                errorMessage("Service is unavailable")
            }
        }
        )
    }

    const succesMessage = (text) =>{
        toast.success(text, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    
      const errorMessage = (text) =>{
        toast.error(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }
    

    return(
        <div style={styles.mainRectangle}>
            {mode === MODES.SUCCESS ? (
                    <div>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <EventComponent keyAndSession={keyAndSessionId}/>
                        </Grid>
                        <Grid item xs={6}>
                            <SessionInformation keyAndSession={keyAndSessionId}/>
                        </Grid>
                    </Grid>
                        <MainTableComponent keyAndSession={keyAndSessionId}/>
                    </div>
            ):(
                <div style={styles.loadingIcon}>
                    <AnimatedCheckmark mode={mode} size={70}/>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            )}
        </div>
    )

}

export default PageWithData;