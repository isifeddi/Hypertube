import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AppsIcon from '@material-ui/icons/Apps';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'relative',
    marginBottom: theme.spacing(10),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
     
    }),
    backgroundColor:"#FFFFFF"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  title : {
    flexGrow: 1,
  },
  notif: {
    margin: 'auto'
  },
 
}));

function NavBar(props) {
  const {user, handleLogout} = props;

  const loggedInMenu = [
    {"text" : "Home","path" : "/", icon: <AppsIcon color="secondary"/>},
  ];
  const loggedOutMenu = [
    {"text" : "Se connecter","path" : "/login", icon: <LockOpenIcon color="inherit"/>},
    {"text" : "inscription","path" : "/register", icon: <LockOpenIcon color="inherit"/>},
  ];
  let menu = [];
  if(user && user.token)
  {
      menu = loggedInMenu;
  }
  else
    menu = loggedOutMenu;

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6"  color="primary" className={classes.title}>
              <Link to="/" style={{textDecoration: 'none', color:'inherit'}}>
                HYPERTUBE
              </Link>
             
          </Typography>
          
          {user && user.token && <Button color="primary" onClick={handleLogout}>Logout</Button>}
        </Toolbar>
      </AppBar>
      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon color="primary"/> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu.map((item) => (
            <Link to={item.path} style={{textDecoration: 'none', color:'primary'}} key={item.text}>
              <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
    </ClickAwayListener>
  );
}

export default NavBar;