import {Box, Typography} from "@mui/material";

import Button from '@mui/material/Button';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";
const steps = ['Conceder Acceso', 'Seleccionar Proyecto', 'Subir Presupuesto'];
const logo = require("../assets/logo.png")
const AutenticaAcc : React.FC = () => {

    const client_id = 's2ztlGcammyWFdVA7S4P9HX9cGaPKCk8'

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
                    <CssBaseline/>

                    <Box width="100%" display="flex" flexDirection="column" alignItems="left">
                        <Stepper
                            activeStep={0}
                            sx={{
                            pt: 3,
                            pb: 5
                        }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel >{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                    </Box>
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
                            xl: "30px 30px 30px 30px"
                        },
                        backgroundColor: "#FFFFFF"
                    }}>
                        <Stepper
                            sx={{
                            pt: 3,
                            pb: 2
                        }}>
                            <Step>
                                <StepLabel>
                                    <Typography color="black" fontSize="15px">
                                        Conceder Acceso con ACC
                                    </Typography>
                                </ StepLabel >
                            </Step>
                        </Stepper>

                        <Typography
                            color="black"
                            fontSize="12px"
                            sx={{
                            textAlign: 'left'
                        }}
                            mt={0}
                            pr={2}
                            mb={0}>
                            Deberás de autenticarte en ACC para continuar con el proceso. Para ello, deberás
                            hacer click en el botón.
                        </Typography>
                        <Typography
                            color="black"
                            fontSize="12px"
                            sx={{
                            textAlign: 'left'
                        }}
                            mt={1}
                            pr={2}
                            mb={3}>
                            Serás redirigido a la poágina web de Autodesk, en la que tendrás que iniciar
                            sesión, y aceptar que la aplicación pueda leer los datos de tu cuenta.
                        </Typography>

                        <Button
                            variant="contained"
                            /*
                            href={`https://developer.api.autodesk.com/authentication/v2/authorize?response_type=code&client_id=${client_id}&redirect_uri=http://localhost:3001/SelectProject/&scope=data:read%20viewables:read%20data:write%20data:create`}
*/
                            href={`https://developer.api.autodesk.com/authentication/v2/authorize?response_type=code&client_id=${client_id}&redirect_uri=https://parserbc3.azurewebsites.net/SelectProject/&scope=data:read%20viewables:read%20data:write%20data:create`}
                          
                            sx={{
                            mt: 2,
                            mb: 3,
                            pt: 1.5,
                            pb: 1.5,
                            borderRadius: '30px',
                            width: "95%"
                        }}>
                            <Typography color="white" fontSize="12px">
                                Aceptar Permisos en ACC
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
                            <Step active={false}>
                                <StepLabel icon={'2'}>
                                    <Typography color="grey" fontSize="15px">
                                        Selecciona el Proyecto
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
        </Grid>

    );
};

export default AutenticaAcc;
