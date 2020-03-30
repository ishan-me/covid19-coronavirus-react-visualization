import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link as RouterLink, LinkProps as RouterLinkProps, useLocation } from 'react-router-dom';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { SvgIconProps, withStyles, createStyles, Hidden } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from '@material-ui/core/Link';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PublicIcon from '@material-ui/icons/Public';
import {
  FacebookShareButton,
  // FacebookIcon,
  LinkedinShareButton,
  // LinkedinIcon,
  WhatsappShareButton,
  // WhatsappIcon,
} from 'react-share';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import LinkedinIcon from '@material-ui/icons/LinkedIn';
import Typography from '@material-ui/core/Typography';

const StyledListItemIcon = withStyles((theme) => ({
  root: { minWidth: '45px' },
}))(ListItemIcon);

interface ICustomListItemProps {
  to?: string;
  href?: string;
  text: string;
  Icon: (SvgIconProps) => JSX.Element;
  AfterIcon?: (SvgIconProps) => JSX.Element;
  style?: CSSProperties;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: (props) => ({
      textDecoration: props.isSelected ? 'underline' : 'initial',
      textDecorationColor: theme.palette.secondary.main,
      '&:hover': {
        background: `${theme.palette.grey['200']} !important`,
        textDecoration: 'underline',
        textDecorationColor: theme.palette.grey['500'],
      },
      ...props.style,
    }),
    facebookShareButton: {
      display: 'flex',
      marginTop: '8px',
      // marginRight: '10px',
      opacity: 1,
      '&:hover': {
        color: `${theme.palette.secondary.main} !important`,
      },
    },
  })
);

const CustomListItem: FC<ICustomListItemProps> = ({ to, href, text, Icon, AfterIcon, style }) => {
  const location = useLocation();
  const theme = useTheme();
  let LinkElement = RouterLink;
  const isSelected = to ? location.pathname.split('/')[1] === to.split('/')[1] : false;
  const classes = useStyles({ isSelected, style });

  if (href) {
    LinkElement = Link;
  }

  return (
    <ListItem
      style={{ background: 'none' }}
      className={classes.root}
      selected={isSelected}
      button
      component={LinkElement}
      to={to}
      href={href}
      target={href ? '_blank' : '_self'}
    >
      <StyledListItemIcon>
        <Icon
          style={{ color: isSelected ? theme.palette.secondary.main : theme.palette.grey[800] }}
        />
      </StyledListItemIcon>
      <ListItemText primary={text} />
      {AfterIcon && <AfterIcon fontSize={'small'} />}
    </ListItem>
  );
};

export const MainListItems = () => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <List style={{ height: '100%', padding: 0 }}>
      <CustomListItem to='/world' text='World' Icon={PublicIcon} />
      <CustomListItem to='/dashboard' text='Country dashboard' Icon={DashboardIcon} />
      <CustomListItem
        to='/infection-trajectories'
        text='Infection trajectories'
        Icon={TrendingUpIcon}
      />
      <Divider />
      <Hidden smUp implementation='css'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: '10px',
          }}
        >
          <Typography style={{ fontWeight: 900 }}>SHARE</Typography>
          <FacebookShareButton
            url={`https://covid19.pink${location.pathname}`}
            className={classes.facebookShareButton}
          >
            <FacebookIcon
              size={32}
              round={true}
              iconFillColor={'#fff'}
              bgStyle={{
                backgroundColor: '#FFF',
              }}
            />
          </FacebookShareButton>
          <LinkedinShareButton
            url={`https://covid19.pink${location.pathname}`}
            className={classes.facebookShareButton}
          >
            <LinkedinIcon size={32} round={true} iconFillColor={'#fff'} />
          </LinkedinShareButton>
          <WhatsappShareButton
            url={`https://covid19.pink${location.pathname}`}
            className={classes.facebookShareButton}
          >
            <WhatsappIcon
              size={32}
              round={true}
              iconFillColor={'#fff'}
              bgStyle={{
                backgroundColor: '#FFF',
              }}
            />
          </WhatsappShareButton>
        </div>
      </Hidden>
      <Divider orientation='horizontal' flexItem={true} light={true} />

      <CustomListItem
        href='https://github.com/m3h0w/covid19-coronavirus-react-visualization'
        text={`GitHub repository`}
        Icon={GitHubIcon}
        AfterIcon={CallMadeIcon}
        style={{ position: 'absolute', bottom: 0 }}
      />
    </List>
  );
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Current month' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Last quarter' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Year-end sale' />
    </ListItem>
  </div>
);
