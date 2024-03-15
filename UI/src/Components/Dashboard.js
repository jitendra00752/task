import React from "react";
import clsx from "clsx";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "./listItems";
 import Deposits from "./Deposits";
 
 import City from "./City";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
 import PieCharts from "./PieCharts";

  
const drawerWidth = 240;

const baseURL = "http://localhost:8080/api/posts";


const data = [
  { name: "Auburn", pv: 1800 },
  { name: "Decatur", pv: 2210 },
  { name: "Florence", pv: 2300 },
  { name: "Hoover", pv: 2000 }, 
  { name: "Mobile", pv: 1231 },
  { name: "Florencess", pv: 2091 }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    // content which is class of main needs to be flex and column direction
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 130
  },
  // added the footer class
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "white",
    // just this item, push to bottom
    alignSelf: "flex-end"
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  const [post, setPost] = React.useState(null);
  const [fromdate, setFromdate] = React.useState(null);
  const [todate, setTodate] = React.useState(null);


  const [state, setState] = React.useState('');
  const [fromdates, setFromdates] = React.useState('');
  const [todates, setTodates] = React.useState('');
  
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);


  const handleChange = (event) => {
    setState(event.target.value);
    axios.get(baseURL+'/'+ event.target.value).then((response) => {
      setFromdate(response.data.form);
      setTodate(response.data.to);
    });
  };

  const handleFrom = (event) => {
    setFromdates(event.target.value); 
  };

  const handleToDate = (event) => {
    setTodates(event.target.value); 
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Sales Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              {/* <NotificationsIcon /> */}
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List> 
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}> 

            <Grid item xs={12} md={3} lg={3}>
            <FormControl fullWidth>
              <label id="demo-simple-select-label">Select a state</label>
              <select
                className="form-control" 
                value={state}
                onChange={handleChange}
              > 
                {post &&
                  post.map((states) =>
                      <option value={states}>{states}</option> 
                  )}
              </select>
            </FormControl>
            </Grid> 
            <Grid item xs={12} md={3} lg={3}>
            <FormControl fullWidth>
              <label id="demo-simple-select-label">Select from date</label>
              <select
                className="form-control" 
                value={fromdates}
                onChange={handleFrom}
              > 
                {fromdate &&
                  fromdate.map((fromdate) =>
                      <option value={fromdate}>{fromdate}</option> 
                  )}
              </select>
            </FormControl>
            </Grid> 
            <Grid item xs={12} md={3} lg={3}>
            <FormControl fullWidth>
              <label id="demo-simple-select-label">Select to date</label>
              <select
                className="form-control" 
                value={todates}
                onChange={handleToDate}
              > 
                {todate &&
                  todate.map((states) =>
                      <option value={states}>{states}</option> 
                  )}
              </select>
            </FormControl>
            </Grid> 



        </Grid>
          <Grid container spacing={3}> 

            <Grid item xs={12} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits title="Total Sales"/>
              </Paper>
            </Grid>

            <Grid item xs={12} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits title="Quantity Sold"/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits title="Discount%"/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits title="Profit"/>
              </Paper>
            </Grid>


            {/* Chart */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.paper}>
                <City data={data} xKey="name" yKey="pv" title="Sales by City"/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.paper}>
                <City data={data} xKey="name" yKey="pv" title="Sales by Products"/>
              </Paper>
            </Grid>


            <Grid item xs={12} md={4} lg={4}>
              <Paper className={classes.paper}>
                <PieCharts data={data} title="Sales by Category"/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={classes.paper}>
                <City data={data} xKey="name" yKey="pv" title="Sales by Sub Category"/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={classes.paper}>
                <PieCharts data={data}  title="Sales by Segment"/>
              </Paper>
            </Grid>
 
          </Grid>
        </Container> 
      </main>
    </div>
  );
}
