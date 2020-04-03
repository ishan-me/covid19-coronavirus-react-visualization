import React, { FC } from 'react';
import Title from 'components/Dashboard/Title';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import numberWithCommas from '../utils/numberWithCommas';

const useStyles = makeStyles((theme) => ({
  typo: { marginTop: '-11px', marginBottom: '2px' },
}));

interface IProps {
  color?: 'primary' | 'secondary' | 'initial';
  title: string;
  number: string | number;
  version?: 'large';
  centered?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

const NumberWithTitle: FC<IProps> = ({
  color = 'primary',
  title,
  number,
  version,
  centered = false,
  onClick,
  style,
}) => {
  const classes = useStyles();
  if (version === 'large') {
    return (
      <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'unset', ...style }}>
        <Title style={centered ? { textAlign: 'center' } : {}} color={'initial'}>
          {title}
        </Title>
        <Typography
          style={centered ? { textAlign: 'center' } : {}}
          color={color}
          component='p'
          variant='h2'
          className={classes.typo}
        >
          {numberWithCommas(number)}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Title color={'initial'}>{title}</Title>
      <Typography color={color} component='p' variant='h4' className={classes.typo}>
        {number}
      </Typography>
    </div>
  );
};

export default NumberWithTitle;
