import {Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import {Routes, Route} from 'react-router-dom';

import TitleBox from "./components/TitleBox";
import MainLayout from "./layouts/MainLayout";
import AutenticaAcc from "./components/AutenticaAcc";

const App : React.FC = () => {
    return (

        <MainLayout>
            <Box
                sx={{
                width: {
                    sm: "90vw",
                    xs: "90vw",
                    md: "60vw",
                    lg: "60vw",
                    xl: "60vw"
                }
            }}>
                <Grid container height="90vh">
                  <AutenticaAcc></AutenticaAcc>
              
                    <TitleBox/>
                </Grid>
            </Box>
        </MainLayout>
    );
};

export default App;

<style > @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
</style>