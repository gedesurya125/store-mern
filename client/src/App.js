import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAll} from './actions/items';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {Container, CssBaseline} from '@material-ui/core';
import {useStyles} from './style.js';
import Stock from './components/Stock/Stock';


//TabPanel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          {children}
        </Box>
      )}
    </div>
  );
}

//TabPanel propTypes
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


//property untuk TabComponent
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function App() {
  const dispatch = useDispatch();




  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);
  
  const items = useSelector(state =>  state.itemReducer)
  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth='xl' disableGutters className={classes.root}>
        <AppBar position="static" className={classes.mainAppBar}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Stock" {...a11yProps(1)} />
            <Tab label="Report" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Home
        </TabPanel>
        <TabPanel className = {classes.tabPanel} value={value} index={1}>
          <Stock items={items}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Report
        </TabPanel>
      </Container>
      
    </React.Fragment>
    
  );
}


