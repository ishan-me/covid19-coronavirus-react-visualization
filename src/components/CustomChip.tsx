import React from 'react';
import { Chip } from '@material-ui/core';
import { getContrastYIQ } from '../utils/colors';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    chip: {
      margin: 5,
      backgroundColor: (props: { backgroundColor: string }) => props.backgroundColor,
      opacity: 0.9,
      color: (props: { backgroundColor: string }) =>
        props.backgroundColor ? getContrastYIQ(props.backgroundColor) : 'inherit',
      '& *': {
        color: (props: { backgroundColor: string }) =>
          props.backgroundColor ? getContrastYIQ(props.backgroundColor) : 'inherit',
      },
      '&:focus,&:hover,&$active': {
        backgroundColor: (props: { backgroundColor: string }) => props.backgroundColor,
        opacity: 1.0,
      },
    },
  })
);

const CustomChip = (props) => {
  const { handleDelete, label, backgroundColor, avatar } = props;
  const classes = useStyles({ backgroundColor });
  return (
    <Chip
      avatar={avatar}
      onClick={props.onClick}
      style={props.style}
      label={label}
      onDelete={handleDelete}
      className={classes.chip}
    />
  );
};

export default CustomChip;
