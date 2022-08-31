import * as React from 'react';
import API from '../utils/API';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AnimatedCheckmark, { MODES } from 'react-animated-checkmark'
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import DetailInformationComponent from './DetailInformationComponent';
import FlagIcon from '@mui/icons-material/Flag';

const styles = {
    mainTable:{
        width: "85%",
        height: "40%",    
        top: "30%",
        left: "7%",
        position: "fixed"
      },
      tableHead:{
        background: "#ff4d4d",
        border: "1px solid black"
      },
      whiteIcon:{
        color: "gray",
        
      },
      purpleIcon:{
        color: "purple"
      },
      greenIcon:{
        color: "green"
      },
      blueIcon:{
        color: "blue"
      },
      yellowIcon:{
        color: "yellow"
      },
      redIcon:{
        color: "red"
      },
      maxWidthColumn:{
        maxWidth: "150px",
      },
      customColumn:{
        maxHeight: "5px",
        fontSize: 13,
        height: "5px",
        padding: "0px",
        margin: 0,
        
      },
      customCell:{
        padding: 0,
        paddingLeft: "15px",
        border: "1px solid black"
      }
}
function MainTableComponent(props){
    const [keyAndSessionId, setKeyAndSessionId] = React.useState(undefined);
    const [lapData, setLapData] = React.useState(undefined);
    let interval ;

    React.useEffect(()=>{
        if(props!=undefined && keyAndSessionId===undefined){
            setKeyAndSessionId(props.keyAndSession)
        } 

        if(keyAndSessionId!=undefined){
        interval = setInterval(() => 
            {
                getDataAboutLap(keyAndSessionId.sessionUid, keyAndSessionId.key)
            }, 500);
            return () => {
                clearInterval(interval);
            };
            
        } else {
            stopTimeout()
        }
       
    },[keyAndSessionId, lapData])


    const stopTimeout  =()=>{
        clearInterval(interval)
    }

    const getDataAboutLap = (sessionUid, key) =>{
        API.getLapData(sessionUid, key)
        .then((response) => {
            if(response.request.status === 200){
                
                setLapData(response.data)
            }
        },
        (error) =>{

        })
    }

    return(
        <div style={styles.mainTable}>
            {lapData!=undefined ? (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 550 }}>
                    <Table stickyHeader>
                    <TableHead >
                        <TableRow>
                            <TableCell style={styles.tableHead}>Position</TableCell>
                            <TableCell style={styles.tableHead}>Name</TableCell>
                            <TableCell style={styles.tableHead}>Current Lap Time</TableCell>
                            <TableCell style={styles.tableHead}>Lap Number</TableCell>
                            <TableCell style={styles.tableHead}>Last Lap Time</TableCell>
                            <TableCell style={styles.tableHead}>Status</TableCell>
                            <TableCell style={styles.tableHead}>Penalties</TableCell>
                            <TableCell style={styles.tableHead}>Warnings</TableCell>                
                            <TableCell style={styles.tableHead}></TableCell>
                            <TableCell style={styles.tableHead}>Flag</TableCell>
                            <TableCell style={styles.tableHead}>FL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lapData
                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code} style={row.carPosition % 2 == 0 ?{background: "#bfbfbf",height: "5px"}:{}}
                            sx ={styles.customColumn}>
                               <TableCell style={styles.customCell}>{row.carPosition}</TableCell>
                               <TableCell style={styles.customCell}>{row.nameOfDriver}</TableCell>
                               <TableCell style={styles.customCell}>{row.currentLapTime}</TableCell>
                               <TableCell style={styles.customCell}>{row.currentLapNum}</TableCell>
                               <TableCell style={styles.customCell}>{row.lastLapTime}</TableCell>
                               <TableCell style={styles.customCell}>{row.driverStatus}</TableCell>
                               <TableCell style={styles.customCell} align={'center'}>
                                {row.penalties != 0 || row.penalties != undefined ? (
                                    <div>                         
                                        {row.penalties}s
                                    </div>
                                ):(
                                    <div>                         
                                        0s
                                    </div>
                                )
                                }
                                
                               </TableCell>
                               <TableCell style={styles.customCell} align={'center'}>
                                {row.warnings && (
                                    <div>
                                        {row.warnings}                 
                                    </div>
                                )}
                               </TableCell>
                               <TableCell style={styles.customCell}>
                                    <DetailInformationComponent data={row}/>
                               </TableCell>
                               <TableCell style={styles.customCell}>
                                {row.vehicleFlag && (
                                    <div>                    
                                        {row.vehicleFlag === 'NONE' && (<FlagIcon style={styles.whiteIcon}/>)}
                                        {row.vehicleFlag === 'GREEN' && (<FlagIcon style={styles.greenIcon}/>)}
                                        {row.vehicleFlag === 'BLUE' && (<FlagIcon style={styles.blueIcon}/>)}
                                        {row.vehicleFlag === 'YELLOW' && (<FlagIcon style={styles.yellowIcon}/>)}
                                        {row.vehicleFlag === 'RED' && (<FlagIcon style={styles.redIcon}/>)}
                                    </div>
                                )}
                               </TableCell>
                               <TableCell style={styles.customCell}>
                                {row.fastestLap && (
                                    <div>                    
                                        <SportsScoreIcon style={styles.purpleIcon} fontSize="large"/>
                                    </div>
                                )}
                               </TableCell>
                               
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
                ):(
                    <center>
                    <AnimatedCheckmark mode={MODES.LOADING} size={70}></AnimatedCheckmark>
                    </center>
                )}
        </div>
    )

}

export default MainTableComponent;