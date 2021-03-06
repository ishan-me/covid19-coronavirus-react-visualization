import { getCapitaScaleString } from 'data/dataStore';
import React from 'react';

import { Typography } from '@material-ui/core';

import numberWithCommas from '../../utils/numberWithCommas';
import NumberWithTitle from '../NumberWithTitle';

export default function CurrentCount({ style, confirmedCases, deaths, mortalityRate, perCapita }) {
  return (
    <div style={style}>
      {perCapita && (
        <Typography variant='caption' style={{ marginTop: -15 }}>
          {`(Values per ${getCapitaScaleString()} inhabitants)`}
        </Typography>
      )}
      <NumberWithTitle
        color={'primary'}
        title={'Confirmed cases'}
        number={numberWithCommas(confirmedCases)}
      />
      <NumberWithTitle color={'initial'} title={'Deaths'} number={numberWithCommas(deaths)} />
      {mortalityRate ? (
        <NumberWithTitle
          color={'secondary'}
          title={'Case fatality rate'}
          number={`${(mortalityRate * 100).toFixed(2)}%`}
        />
      ) : undefined}
    </div>
  );
}
