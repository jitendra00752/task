import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard"; 

import StorefrontIcon from '@material-ui/icons/Storefront';
import DvrIcon from '@material-ui/icons/Dvr';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import Brightness4Icon from '@material-ui/icons/Brightness4';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DvrIcon />
      </ListItemIcon>
      <ListItemText primary="Sales Overview" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StorefrontIcon/>
      </ListItemIcon>
      <ListItemText primary="Stores" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText primary="Notifications" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Brightness4Icon />
      </ListItemIcon>
      <ListItemText primary="Dark Themes" />
    </ListItem>
  </div>
);
 
