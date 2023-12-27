import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs({ modelInfo }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const introductions = modelInfo.Introduction.split(/\n/g)
    .filter((item) => item.trim() !== "")
    .map((item) => item.trim());
  const usages = modelInfo.Usage.split(/\n/g)
    .filter((item) => item.trim() !== "")
    .map((item) => item.trim());
  const additionalInformations = modelInfo.AdditionalInformation.split(/\n/g)
    .filter((item) => item.trim() !== "")
    .map((item) => item.trim());

  return (
    <div className="overflow-hidden rounded-2xl">
      <Box sx={{ bgcolor: "background.paper", width: "full" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            className="bg-primary"
          >
            <Tab label="模型简介" {...a11yProps(0)} />
            <Tab label="使用方法" {...a11yProps(1)} />
            <Tab label="其他信息" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {introductions.map((introduction, index) => (
              <React.Fragment key={`introduction-${index}`}>
                <span className="block indent-8">{introduction}</span>
              </React.Fragment>
            ))}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {usages.map((usage, index) => (
              <React.Fragment key={`usage-${index}`}>
                <span className="block indent-8">{usage}</span>
              </React.Fragment>
            ))}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {additionalInformations.map((additionalInformation, index) => (
              <React.Fragment key={`additional-information-${index}`}>
                <span className="block indent-8">{additionalInformation}</span>
              </React.Fragment>
            ))}
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
