import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function MyList(props) {
  const classes = useStyles();

  const open = (url) => window.open(url, '_blank');

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        {
          props.list ? props.list.map((a, i) =>
            <div key={i} onClick={e => open(a.link)}>
              <ListItemLink >
                <ListItemText primary={a.name} />
              </ListItemLink>
              <Divider />
            </div>
          ) : ''
        }

      </List>
    </div>
  );
}
