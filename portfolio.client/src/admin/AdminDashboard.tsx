import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box, Paper, Tab} from "@mui/material";
import {useState} from "react";
import EmployerTab from "./sections/EmployerTab";
import JobTab from "./sections/JobTab";
import SkillTab from "./sections/SkillTab";

const AdminDashboard = () => {
  const [tab, setTab] = useState<number>(0);

  return (
    <Box component={Paper}>
      <TabContext value={tab}>
        <TabList onChange={(e, t) => setTab(t)} aria-label="dashboard navigation">
          <Tab label="Employers" value={0} />
          <Tab label="Skills" value={1} />
          <Tab label="Jobs" value={2} />
        </TabList>
        <TabPanel value={0}>
          <EmployerTab />
        </TabPanel>
        <TabPanel value={1}>
          <SkillTab />
        </TabPanel>
        <TabPanel value={2}>
          <JobTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default AdminDashboard;