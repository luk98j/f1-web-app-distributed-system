import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import F1Car from '../f1car.png'
import Hard from '../pictures/hard.png'
import Inter from '../pictures/inter.png'
import Medium from '../pictures/medium.png'
import Soft from '../pictures/soft.png'
import Wet from '../pictures/wet.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { width } from '@mui/system';

ChartJS.register(ArcElement, Tooltip, Legend);



const styles = {

    modalStyle:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "40%",
        height: "90%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    car:{
        width: "200px"
    },
    tyres:{
        width: "60px"
    },
    chartSize:{
        maxWidth:"10px",
        padding: "10px"
        // maxHeight:"15px",
    },
    donutSize:{
        width:"20%",
        height:"20px",
    },
    table:{
        width:"65%"
    },
    designeButton:{
        backgroundColor: "#ff3333",
        color: "white"
    }
 
    
}


function DetailInformationComponent(props){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = React.useState(undefined)

    React.useEffect(()=>{
        if(props.data != undefined){
            setData(props.data)
        }
    },[data, props.data])

    const prepareData = (lapData) =>{
        return {
            options: {
                elements: {
                    center: {
                        display: true,
                        text: `90%`
                    }
                }
            },
            datasets: [
              {
                data: [lapData, 100-lapData],
                backgroundColor: [
                  'red',
                  '#E9E9E9',
                ],
                borderWidth: 1,
              },
            ],
        
          };
    }

    const plugins = (textChart) => [{
        beforeDraw: function(chart) {
         var width = chart.width,
             height = chart.height,
             ctx = chart.ctx;
             ctx.restore();
             var fontSize = (height / 130).toFixed(2);
             ctx.font = fontSize + "em sans-serif";
             ctx.textBaseline = "top";
             var text = textChart,
             textX = Math.round((width - ctx.measureText(text).width) / 2),
             textY = height / 2;
             ctx.fillText(text, textX, textY);
             ctx.save();
        } 
      }]

    return (
        <div>
          <Button onClick={handleOpen} style={styles.designeButton}>Detail info</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styles.modalStyle}>
                {data != undefined && (
                    <center>
                <Table style={styles.table}>
                    <TableBody>
                    <TableRow>
                        <TableCell style={styles.chartSize}>
                            {data.tyresAgeLaps >=0 && (
                                <center><b>Tyres Age</b><br/>
                                <b>{data.tyresAgeLaps}</b>
                                </center>
                            )}
                            {data.actualTyreCompound == 'F1_C5' || data.actualTyreCompound == 'F1_C4' && (
                                <div>
                                    <center>
                                    <img src={Soft} style={styles.tyres} alt="tyre" /><br/>
                                    <b>Soft</b></center>
                                </div>
                            )}
                             {data.actualTyreCompound == 'F1_C3' && (
                                <div>
                                    <center>
                                    <img src={Medium} style={styles.tyres} alt="tyre" /><br/>
                                    <b>Medium</b></center>
                                </div>
                            )}
                              {data.actualTyreCompound == 'F1_C2' || data.actualTyreCompound == 'F1_C1' && (
                                <div>
                                    <center>
                                    <img src={Hard} style={styles.tyres} alt="tyre" /><br/>
                                    <b>Hard</b></center>
                                </div>
                            )}
                              {data.actualTyreCompound == 'F1_INTER' && (
                                <div>
                                    <center>
                                    <img src={Inter} style={styles.tyres} alt="tyre" /><br/>
                                    <b>Inter</b></center>
                                </div>
                            )}
                             {data.actualTyreCompound == 'F1_WET' && (
                                <div>
                                    <center>
                                    <img src={Wet} style={styles.tyres} alt="tyre" /><br/>
                                    <b>Wet</b></center>
                                </div>
                            )}
                        </TableCell>
                        <TableCell style={styles.chartSize}>
                            {data.frontLeftWingDamage != undefined && (   
                                <div>       
                                    <center><b>Front Left Wing Damage</b></center>
                                    <Doughnut data={prepareData(data.frontLeftWingDamage)} plugins={plugins(data.frontLeftWingDamage+"%")}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                      }}
                                     />
                                </div>
                            )}
                        </TableCell>
                        <TableCell style={styles.chartSize}>
                            {data.frontRightWingDamage != undefined && (   
                                <div>       
                                    <center><b>Front Right Wing Damage</b></center>
                                    <Doughnut data={prepareData(data.frontRightWingDamage)} plugins={plugins(data.frontRightWingDamage+"%")} options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                      }}
                                      />
                                </div>
                            )}
                        </TableCell>
                        <TableCell style={styles.chartSize}></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={styles.chartSize}>
                            {data.tyresDamage && (   
                                <div>       
                                    <center><b>Front Left Tyre Damage</b></center>
                                    <Doughnut data={prepareData(data.tyresDamage[2])} plugins={plugins(data.tyresDamage[2]+"%")} options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                      }}/>
                                </div>
                            )}
                        </TableCell>
                        <TableCell colSpan={2} rowSpan={3} align={'center'} style={styles.chartSize}>
                            <img src={F1Car} style={styles.car} alt="Logo" />
                        </TableCell>
                        
                        <TableCell style={styles.chartSize}>
                            <div>
                                <center><b>Front Right Tyre Damage</b></center>
                                {data.tyresDamage && (
                                    <Doughnut data={prepareData(data.tyresDamage[3])} plugins={plugins(data.tyresDamage[3]+"%")} options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                      }}/>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={styles.chartSize}>
                            {data.floorDamage != undefined && (   
                                <div>       
                                    <center><b>Floor damage</b></center>
                                    <Doughnut data={prepareData(data.floorDamage)} plugins={plugins(data.floorDamage+"%")} options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                      }}/>
                                </div>
                            )}
                        </TableCell>
                        
                        <TableCell style={styles.chartSize}>
                            {data.sidepodDamage != undefined && (   
                                <div>       
                                    <center><b>Sidepod damage</b></center>
                                    <Doughnut data={prepareData(data.sidepodDamage)} plugins={plugins(data.sidepodDamage+"%")} options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                      }}/>
                                </div>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={styles.chartSize}>
                            <div>
                                <center><b>Rear Left Tyre Damage</b></center>
                                {data.tyresDamage && (
                                        <Doughnut data={prepareData(data.tyresDamage[0])} plugins={plugins(data.tyresDamage[0]+"%")} options={{
                                            responsive: true,
                                            maintainAspectRatio: true,
                                          }}/>
                                    )}
                            </div>
                        </TableCell>
                        
                        <TableCell style={styles.chartSize}>
                            <div>
                                <center><b>Rear Right Tyre Damage</b></center>
                                {data.tyresDamage && (
                                        <Doughnut data={prepareData(data.tyresDamage[1])} plugins={plugins(data.tyresDamage[1]+"%")} options={{
                                            responsive: true,
                                            maintainAspectRatio: true,
                                          }}/>
                                    )}
                            </div>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell style={styles.chartSize}></TableCell>
                        <TableCell style={styles.chartSize}>
                            {data.diffuserDamage != undefined && (   
                                <div>       
                                    <center><b>Diffuser Damage</b></center>
                                    <Doughnut data={prepareData(data.diffuserDamage)} plugins={plugins(data.diffuserDamage+"%")} options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                      }}/>
                                </div>
                            )}
                        </TableCell>
                        <TableCell style={styles.chartSize}>
                            {data.rearWingDamage != undefined && (   
                                <div>       
                                    <center><b>Rear wing damage</b></center>
                                    <Doughnut  data={prepareData(data.rearWingDamage)} plugins={plugins(data.rearWingDamage+"%")} options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                      }}/>
                                </div>
                            )}
                        </TableCell>
                        <TableCell style={styles.chartSize}></TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </center>
                )} 
            </Box>
          </Modal>
        </div>
      );
}

export default DetailInformationComponent;