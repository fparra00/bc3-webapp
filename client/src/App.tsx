import {Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import {Routes, Route,Router, BrowserRouter} from 'react-router-dom';
import AppRoutes from "./AppRoutes";
import TitleBox from "./components/TitleBox";
import MainLayout from "./layouts/MainLayout";
import AutenticaAcc from "./components/AutenticaAcc";
import SelectProject from "./components/SelectProject";
const App = () => {
    return (
        <BrowserRouter>

        <MainLayout>
          <Box
            sx={{
              width: {
                sm: '90vw',
                xs: '90vw',
                md: '60vw',
                lg: '60vw',
                xl: '60vw',
              },
            }}
          >
            <Grid container height="90vh">
              <Routes>
                <Route path="/" element={<AutenticaAcc />} />
                <Route path="/SelectProjectBc3" element={<SelectProject />} />
              </Routes>
              <TitleBox />
            </Grid>
          </Box>
        </MainLayout>
        </BrowserRouter>

    );
  };
  
  export default App;
<style > @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
</style>


