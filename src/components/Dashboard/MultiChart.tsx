import React, { useEffect, useState, FC, useCallback } from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  TickFormatterFunction,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import Title from './Title';

import moment, { Moment } from 'moment';
import { FaBrush } from 'react-icons/fa';
import getBrush from './Brush';
import Colors from '../../utils/colors';
import { Button } from '@material-ui/core';
import useDataStore from '../../data/dataStore';
import { observer } from 'mobx-react-lite';
import { momentToFormat } from '../../utils/getDatesFromDataRow';
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export type Row = {
  [key in Column]: string;
};

type Column = 'Province/State' | 'Country/Region' | 'Lat' | 'Long' | string;

interface IProps {
  countries: string[];
  dataByCountry: { [key: string]: { confirmed: Row; dead: Row } };
  dates: Moment[];
}

const MultiChart: FC<IProps> = observer(({ countries, dataByCountry, dates }) => {
  const theme = useTheme();
  const [firstCaseDate, setFirstCaseDate] = useState();
  const [confirmedCasesData, setConfirmedCasesData] = useState();
  let colorsHelper = new Colors();
  const [colors, setColors] = useState();

  useEffect(() => {
    console.log({ dataByCountry });
    console.log({ countries });
    console.log({ dates });
    if (dataByCountry && countries && countries.length && dates) {
      let lastZeroDay: Moment | undefined;
      const d = dates.map((date) => {
        let toReturn: { [key: string]: number } = {
          time: date.unix(),
        };
        countries.forEach((country: string) => {
          if (dataByCountry[country].confirmed) {
            const confirmedCases = Number(dataByCountry[country].confirmed[momentToFormat(date)]);
            toReturn[`confirmedCases${country}`] = confirmedCases;
          }
        });
        return toReturn;
      });
      // .filter((el) => {
      //   return moment(el.time * 1000).isAfter(lastZeroDay);
      // });
      setConfirmedCasesData(d);
      setFirstCaseDate(lastZeroDay);
    }
  }, [countries, dataByCountry, dates]);

  const newColors = useCallback(() => {
    colorsHelper = new Colors();
    setColors(
      countries.map(() => {
        return colorsHelper.getRandomColor();
      })
    );
  }, [setColors, countries]);

  useEffect(() => {
    newColors();
  }, [countries, newColors]);

  const getFormattedLine = (dot: boolean = false) => {
    if (!confirmedCasesData) {
      return null;
    }

    return countries.map((country: string, i: number) => {
      return (
        <Line
          key={i}
          type='monotone'
          dataKey={`confirmedCases${country}`}
          name={country}
          stroke={colors[i]}
          dot={false}
          strokeWidth={2}
        />
      );
    });
  };

  const brush = getBrush({
    data: confirmedCasesData,
    color: theme.palette.text.secondary,
    tickFormatter: formatXAxis,
    dataKey: 'time',
    children: (
      <LineChart>
        <YAxis hide domain={[0, 'auto']} />
        {getFormattedLine()}
      </LineChart>
    ),
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItem: 'end',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '10px',
        }}
      >
        <Title>Today</Title>
        <Button
          style={{ marginLeft: 15 }}
          variant='outlined'
          color='primary'
          size={'small'}
          onClick={() => {
            newColors();
          }}
        >
          New colors
        </Button>
      </div>
      <ResponsiveContainer width={'100%'}>
        <LineChart
          data={confirmedCasesData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray='1 3' />
          <XAxis
            angle={-15}
            dataKey='time'
            stroke={theme.palette.text.secondary}
            tickFormatter={formatXAxis}
          />
          <YAxis stroke={theme.palette.text.secondary} domain={[0, 'auto']}>
            <Label
              angle={270}
              position='left'
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Cases
            </Label>
          </YAxis>
          {getFormattedLine(true)}
          <Line type='monotone' dataKey='deaths' stroke={theme.palette.secondary.main} dot={true} />
          {/* {brush} */}
          <Tooltip
            offset={-120}
            labelFormatter={formatXAxis}
            allowEscapeViewBox={{ x: true, y: true }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
});

const TIME_FORMAT = 'MMM Do';
const formatXAxis: TickFormatterFunction = (tickItem: number) =>
  moment(tickItem * 1000).format(TIME_FORMAT);

export default MultiChart;