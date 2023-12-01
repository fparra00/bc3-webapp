import {Box, Button, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CustomDropdown from "./CustomDropdown";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import {Navigate} from 'react-router-dom';
const logo = require("../assets/logo.png")

const steps = ['Conceder Acceso', 'Seleccionar Proyecto', 'Subir Presupuesto'];
interface Option {
    label : string;
    value : string | number;
}

interface ProjectData {
    name : string;
    id : string;
}

const SigninPage : React.FC = () => {

    let jsonData : ProjectData[] = [];
    const [dynamicOptions,
        setDynamicOptions] = useState < Option[] > ([]);
    const [loading,
        setLoading] = useState(false);
    const [dropdownValue,
        setDropdownValue] = useState < Option | null > (null);
    const [deberiaRedirigir,
        setDeberiaRedirigir] = useState(false);

    const handleDropdownChange = (selectedOption : Option | null) => {
        setDropdownValue(selectedOption);
    };

    const handleButtonClick = async() => {

        try {
            const response = await axios.post("/UploadNameProject", dropdownValue);
            console.log(dropdownValue)
            setDeberiaRedirigir(true);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchDataWithDelay = async() => {
            setLoading(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 5000));
                const response = await fetch('/api/data').then(function (response) {
                    return response.json();
                })
                    .then(function (data) {
                        jsonData = data.attributesArray || [];
                    })
                console.log(jsonData)
                const formattedOptions = jsonData.map((item) => ({
                    label: `Proyecto ${item.name}`, 
                    value: `${item.id}`, 
                }));
                setLoading(false)
                setDynamicOptions(formattedOptions);

            } catch (error) {
                console.error('Error en la solicitud al servidor intermedio:', error);
            }
        };
        fetchDataWithDelay();
    }, []);
    if (deberiaRedirigir) {
        return <Navigate to="/SendBc3"/>;
    }
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
                        <img src={logo} style={{width:100, height: 'auto', marginTop: 15}}></img>

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
                                activeStep={1}
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
                                <Step key={0} active={false}>
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
                                xl: "30px 30px 30px 30px"
                            },
                            backgroundColor: "#FFFFFF"
                        }}>
                            <Stepper
                                sx={{
                                pt: 3,
                                pb: 2
                            }}>
                                <Step key={'1'}>
                                    <StepLabel icon={'2'}>
                                        <Typography color="black" fontSize="15px">
                                            Selecciona tu Proyecto
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
                                mb={0}>
                                Selecciona el proyecto en el que se importará automáticamente tu BC3
                                automáticamente
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

                            <div>
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
                                        </div>
                                    )
                                    : (
                                        <div className="container">
                                            <div>
                                                <div
                                                    className="col-md"
                                                    style={{
                                                    width: '100%'
                                                }}>

                                                    <CustomDropdown
                                                        options={dynamicOptions}
                                                        onDropdownChange={handleDropdownChange}/>

                                                </div>
                                                <div className="col-md"></div>
                                            </div>
                                        </div>
                                    )}
                            </div>

                            <Button
                                variant="contained"
                                onClick={handleButtonClick}
                                sx={{
                                mt: 4,
                                mb: 3,
                                pt: 1.5,
                                pb: 1.5,
                                borderRadius: '30px',
                                width: "95%"
                            }}>
                                <Typography color="white" fontSize="12px">
                                    Seleccionar Proyecto
                                </Typography>
                            </Button>
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
                                <Step key={0} active={false}>
                                    <StepLabel icon={'3'}>
                                        <Typography color="grey" fontSize="15px">
                                            Sube tu Presupuesto
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            </Stepper>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default SigninPage;
