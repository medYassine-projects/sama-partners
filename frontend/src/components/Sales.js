import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect , useState } from 'react';
import axios from 'axios'
Chart.register(...registerables);

export const Sales = (props) => {
  const [dataArray,setDataArray] = useState()
  const theme = useTheme();
  useEffect( () => {
    axios.get('http://127.0.0.1:3030/res/numberOfReservationsChart').then((res)=>{setDataArray(res.data)})
  }, [])

  const day = new Date()
  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: dataArray,
        label: 'This year',
        maxBarThickness: 10
      },
      {
        backgroundColor: '#EEEEEE',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [11, 20, 12, 29, 30, 25, 13],
        label: 'Last year',
        maxBarThickness: 10
      }
    ],
    labels: [day.getDate(day.setDate(day.getDate()-6))+' '+day.toLocaleString('default', { month: 'short' }),
    day.getDate(day.setDate(day.getDate()+1))+' '+day.toLocaleString('default', { month: 'short' }),
    day.getDate(day.setDate(day.getDate()+1))+' '+day.toLocaleString('default', { month: 'short' }),
    day.getDate(day.setDate(day.getDate()+1))+' '+day.toLocaleString('default', { month: 'short' }),
    day.getDate(day.setDate(day.getDate()+1))+' '+day.toLocaleString('default', { month: 'short' }),
    day.getDate(day.setDate(day.getDate()+1))+' '+day.toLocaleString('default', { month: 'short' }),
    day.getDate(day.setDate(day.getDate()+1))+' '+day.toLocaleString('default', { month: 'short' })]
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
            Last 7 days
          </Button>
        )}
        title="Dernières ventes"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        {/*<Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
    </Button>*/}
      </Box>
    </Card>
  );
};
