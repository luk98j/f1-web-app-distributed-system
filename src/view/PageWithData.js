import * as React from 'react';
import AnimatedCheckmark, { MODES } from 'react-animated-checkmark'
import API from "../utils/API.js"
import { useParams } from "react-router-dom";
import ParticipantService from '../service/ParticipantService.js';

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
    const [key, setKey] = React.useState(undefined)
    const [keyAndSessionId, setKeyAndSessionId] = React.useState(undefined);
    const {keyId} = useParams();

    React.useEffect(()=>{
        if(key == undefined){
            setKey(keyId)
            ParticipantService.checkIfKeyExists(keyId)
        }
       
    },[key, keyAndSessionId])

    return(
        <div style={styles.mainRectangle}>
            {mode == MODES.SUCCESS ? (
                    <div>

                    </div>
            ):(
                <div style={styles.loadingIcon}>
                    <AnimatedCheckmark mode={mode} size={70}/>
                </div>
            )}
        </div>
    )

}

export default PageWithData;