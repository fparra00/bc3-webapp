import {Box, Button, Checkbox, FormControlLabel, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from "axios";
import {FileUploader} from 'react-drag-drop-files';
import io from 'socket.io-client';
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import ClipLoader from "react-spinners/ClipLoader";

const logo = require("../assets/logo.png")

const fileTypes = ['BC3'];
const steps = ['Conceder Acceso', 'Seleccionar Proyecto', 'Subir Presupuesto'];

const SendBc3 : React.FC = () => {

    const [open,
        setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [fileOrFiles,
        setFile] = useState < File | File[] | null > (null);
    const handleChange = (fileOrFiles : File | File[]) => {
        setFile(fileOrFiles);
    };
    const [loading,
        setLoading] = useState(false);
    const handleClick = () => {
        if (fileOrFiles) {
            uploadFile(fileOrFiles);
            onOpenModal();
            setLoading(true)
        }
    }

    const [pythonMessage,
        setPythonMessage] = useState('');
    const uploadFile = async(fileOrFiles : File | File[]) => {
        const formData = new FormData();
        if (Array.isArray(fileOrFiles)) {
            fileOrFiles.forEach((file, index) => {
                formData.append(`myBc3`, file);
            });
        } else {
            formData.append("myBc3", fileOrFiles);
        }

        try {
            /* const response =*/
            await axios.post("/upload/", formData);
        } catch (error) {
            console.error(error);
        }
    };

    const onSelect = (fileOrFiles : File | File[]) => {
        console.log('test', fileOrFiles);
    };

    const onTypeError = (err = 1) => console.log(err);
    const onSizeError = (err = 1) => console.log(err);

    useEffect(() => {
        const socket = io('http://localhost:8080');

        // Manejar el evento 'pythonMessage' y actualizar el estado con el mensaje
        // recibido
        socket.on('pythonMessage', (data) => {
            console.log('Mensaje desde Python en el lado del cliente:', data.message);
            setPythonMessage(data.message);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (

        <Grid
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            minHeight={550}
            sx={{
            boxShadow: {
                xs: "",
                sm: "",
                md: "15px 2px 5px -5px",
                lg: "15px 2px 5px -5px",
                xl: "15px 2px 5px -5px"
            }
        }}>

            <Box
                sx={{
                backgroundColor: "rgba(245,245,245,255)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                borderRadius: {
                    xs: "30px",
                    sm: "30px",
                    md: "30px 0 0 30px",
                    lg: "30px 0 0 30px",
                    xl: "30px 0 0 30px"
                }
            }}>

                <Box width="90%">
                    <Box display="flex" flexDirection="column" alignItems="left">
                        {/* LOGO */}
                        <img
                            src={logo}
                            style={{
                            width: 100,
                            height: 'auto',
                            marginTop: 15
                        }}></img>

                        {/* LOGO END */}
                        <Typography
                            color="#96ce00"
                            fontSize="22px"
                            sx={{
                            textAlign: 'left',
                            marginTop: 2,
                            marginBottom: 0
                        }}
                            mt={10}
                            mb={1}>
                            Integración de Presupuestos

                        </Typography>
                        <Typography
                            color="black"
                            fontSize="13px"
                            sx={{
                            textAlign: 'left',
                            marginTop: 1
                        }}
                            mt={7}
                            mb={3}>
                            Plataforma de integración de presupuestos BC3 con ACC
                        </Typography>
                    </Box>

                    <React.Fragment>
                        <CssBaseline/>

                        <Box width="100%" display="flex" flexDirection="column" alignItems="left">
                            <Stepper
                                activeStep={2}
                                sx={{
                                pt: 3,
                                pb: 5
                            }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </React.Fragment>

                    <Box
                        sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        height: "80%"
                    }}>

                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                            paddingLeft='20px'
                            sx={{
                            borderRadius: {
                                xs: "30px",
                                sm: "30px",
                                md: "30px 30px 30px 30px",
                                lg: "30px 30px 30px 30px",
                                xl: "30px 30px 30px 30px",
                                width: "100%"
                            },
                            backgroundColor: "#FFFFFF"
                        }}>

                            <Stepper
                                sx={{
                                pt: 3,
                                pb: 2
                            }}>
                                <Step active={false}>
                                    <StepLabel icon={'1'}>
                                        <Typography color="grey" fontSize="15px">
                                            Conceder Acceso en ACC
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            </Stepper>
                        </Box>

                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                            paddingLeft='20px'
                            sx={{
                            mt: 4,
                            borderRadius: {
                                xs: "30px",
                                sm: "30px",
                                md: "30px 30px 30px 30px",
                                lg: "30px 30px 30px 30px",
                                xl: "30px 30px 30px 30px",
                                width: "100%"
                            },
                            backgroundColor: "#FFFFFF"
                        }}>

                            <Stepper
                                sx={{
                                pt: 3,
                                pb: 2
                            }}>
                                <Step active={false}>
                                    <StepLabel icon={'2'}>
                                        <Typography color="grey" fontSize="15px">
                                            Selecciona tu Proyecto
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            </Stepper>
                        </Box>

                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                            paddingLeft='20px'
                            sx={{
                            mt: 4,
                            borderRadius: {
                                xs: "30px",
                                sm: "30px",
                                md: "30px 30px 30px 30px",
                                lg: "30px 30px 30px 30px",
                                xl: "30px 30px 30px 30px"
                            },
                            backgroundColor: "#FFFFFF"
                        }}>
                            <Stepper
                                sx={{
                                pt: 3,
                                pb: 2
                            }}>
                                <Step active={true}>
                                    <StepLabel icon={'3'}>
                                        <Typography fontSize="15px">
                                            Sube tu Presupuesto
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            </Stepper>

                            <Typography
                                color="black"
                                fontSize="12px"
                                sx={{
                                textAlign: 'left'
                            }}
                                mt={0}
                                pr={3}
                                mb={0}>
                                Al subir tu presupuesto en formato BC3, se importará de manera automáticamente
                                en APS, en el proyecto que seleccionaste previamente.
                            </Typography>
                            <Typography
                                color="black"
                                fontSize="12px"
                                sx={{
                                textAlign: 'left'
                            }}
                                mt={1}
                                mb={3}>
                                * Todos los campos son requeridos.
                            </Typography>

                            {loading
                                ? (

                                    <div
                                        style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingBottom: '20dp',
                                        paddingTop: '20dp'
                                    }}><ClipLoader color={'#96ce00'} loading={loading} size={50}/>
                                        <Box marginTop={10} paddingBottom={4}></Box>
                                    </div>

                                )
                                : (
                                    <div>
                                        <div className="App">
                                            <FileUploader
                                                classes="file-uploader"
                                                fileOrFiles={fileOrFiles}
                                                fontSize={12}
                                                onTypeError={onTypeError}
                                                handleChange={handleChange}
                                                name="myBc3"
                                                types={fileTypes}
                                                onSizeError={onSizeError}
                                                onSelect={onSelect}
                                                label="Sube tu presupuesto aquí"
                                                dropMessageStyle={{
                                                backgroundColor: 'red'
                                            }}/>
                                        </div>

                                        <FormControlLabel
                                            style={{
                                            marginTop: '10px'
                                        }}
                                            control={< Checkbox defaultChecked />}
                                            label={< Typography color = "black" fontSize = "12px" > ¿Deseas eliminar los presupuestos existentes en el proyecto? </Typography>}/>
                                        <Button
                                            variant="contained"
                                            onClick={handleClick}
                                            sx={{
                                            mt: 2,
                                            mb: 3,
                                            pt: 1.5,
                                            pb: 1.5,
                                            borderRadius: '30px',
                                            width: "95%"
                                        }}>
                                            <Typography color="white" fontSize="12px">
                                                Subir Presupuesto
                                            </Typography>
                                        </Button>
                                    </div>
                                )}

                        </Box>

                        <Modal open={open} onClose={onCloseModal} center>
                            <Box pl={1} pr={1} pb={1}>
                                <Typography
                                    color="#96ce00"
                                    fontSize="25px"
                                    sx={{
                                    marginBottom: 0
                                }}>
                                    Proceso de Subida de Presupuesto Iniciado
                                </Typography>
                                <Typography
                                    color="black"
                                    fontSize="14px"
                                    sx={{
                                    textAlign: 'left',
                                    marginTop: 2.5
                                }}>
                                    Ha comenzado el proceso de subida del presupuesto de tu archivo BC3 al proyecto
                                    seleccionado en ACC.
                                </Typography>
                                <Typography
                                    color="black"
                                    fontSize="14px"
                                    sx={{
                                    textAlign: 'left',
                                    marginTop: 1
                                }}>
                                    Por favor, no cierres la página hasta que se confirme la finalización del
                                    proceso. Ten en cuenta que puede llegar a durar hasta 20 minutos.
                                </Typography>
                            </Box>

                        </Modal>
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                            paddingLeft='20px'
                            sx={{
                            mt: 4,
                            borderRadius: {
                                xs: "30px",
                                sm: "30px",
                                md: "30px 30px 30px 30px",
                                lg: "30px 30px 30px 30px",
                                xl: "30px 30px 30px 30px",
                                width: "100%"
                            },
                            backgroundColor: "#FFFFFF"
                        }}></Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default SendBc3;
