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

const styles = {
    mainTable:{
        width: "85%",
        height: "40%",
        // borderRadius: "25px",
        // //background: "linear-gradient(to right, #cc33ff 0%, #3333cc 100%)",
        top: "30%",
        left: "7%",
        // //border: "1px solid black",
        // //padding: "20px",
        position: "fixed"
      },
      tableHead:{
        background: "#bfbfbf",
      },
      purpleIcon:{
        color: "purple"
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
            }, 1000);
            return () => {
                clearInterval(interval);
            };
            
        } else {
            stopTimeout()
        }
       
    },[keyAndSessionId])


    const stopTimeout  =()=>{
        clearInterval(interval)
    }

    const getDataAboutLap = (sessionUid, key) =>{
        API.getLapData(sessionUid, key)
        .then((response) => {
            if(response.request.status === 200){
                console.log(response.data)
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
                    <TableHead>
                        <TableRow>
                            <TableCell style={styles.tableHead}>Position</TableCell>
                            <TableCell style={styles.tableHead}>Name</TableCell>
                            <TableCell style={styles.tableHead}>Current Lap Time</TableCell>
                            <TableCell style={styles.tableHead}>Current Lap Number</TableCell>
                            <TableCell style={styles.tableHead}>Last Lap Time</TableCell>
                            <TableCell style={styles.tableHead}>Status</TableCell>
                            <TableCell style={styles.tableHead}>Fastest Lap</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lapData
                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                               <TableCell>{row.carPosition}</TableCell>
                               <TableCell>{row.nameOfDriver}</TableCell>
                               <TableCell>{row.currentLapTime}</TableCell>
                               <TableCell>{row.currentLapNum}</TableCell>
                               <TableCell>{row.lastLapTime}</TableCell>
                               <TableCell>{row.driverStatus}</TableCell>
                               <TableCell>
                                {row.fastestLap && (
                                    <div>
                                        <center>
                                        <SportsScoreIcon style={styles.purpleIcon} fontSize="large"/>
                                        </center>
                                    </div>
                                )}
                               </TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                {/* <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
                </Paper>
                ):(
                    <AnimatedCheckmark mode={MODES.LOADING} size={70}></AnimatedCheckmark>
                )}
        </div>
    )

}

export default MainTableComponent;