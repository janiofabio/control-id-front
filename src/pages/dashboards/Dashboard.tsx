import React from 'react';
import { Box, Typography, Grid, Paper, Avatar, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { People, Business, Devices, Person } from '@mui/icons-material';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Dashboard: React.FC = () => {
  // Dados fictícios para os gráficos
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gráfico de Acessos',
      },
    },
  };
  
  const hourlyData = {
    labels: ['0-1h', '1-2h', '2-3h', '3-4h', '4-5h', '5-6h', '6-7h'],
    datasets: [
      {
        label: 'Acessos',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };
  
  const weeklyData = {
    labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    datasets: [
      {
        label: 'Acessos',
        data: [50, 60, 70, 80, 90, 40, 30],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <Box padding={3}>
      {/* Cabeçalho do Dashboard */}
      <Typography variant="h5" fontWeight="bold" mb={2} display="flex" alignItems="center">
        <People fontSize="large" /> &nbsp;Dashboard
      </Typography>

      {/* Estatísticas Gerais */}
      <Typography variant="h6" gutterBottom>Estatísticas Gerais</Typography>
      <Grid container spacing={2} mb={3}>
        {[
          { title: "Pessoas Ativas", color: "#FFEB3B", count: 100, icon: <People /> },
          { title: "Visitantes", color: "#64FFDA", count: 50, icon: <Person /> },
          { title: "Pessoas no Local", color: "#F48FB1", count: 150, icon: <People /> },
          { title: "Equipamentos", color: "#42A5F5", count: 80, icon: <Devices /> },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper style={{ padding: 16, backgroundColor: stat.color }}>
              <Box display="flex" alignItems="center">
                <Avatar style={{ backgroundColor: 'white', marginRight: 8 }}>{stat.icon}</Avatar>
                <Box>
                  <Typography variant="h4">{stat.count}</Typography>
                  <Typography>{stat.title}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Lista de Últimos Acessos */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Últimos Acessos</Typography>
          <List>
            {/* Mock de Lista - Adicione dados reais aqui */}
            {[{ name: 'Silvia', date: '10:00', area: 'Administração' }].map((user, idx) => (
              <ListItem key={idx}>
                <ListItemAvatar>
                  <Avatar>{user.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={`${user.date} - ${user.area}`} />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Gráficos de Acesso */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6">Acessos nas Últimas 24 Horas</Typography>
              <Bar options={options} data={hourlyData} />

          <Typography variant="h6" mt={3}>Acesso Semanal</Typography>
             <Bar options={options} data={weeklyData} />
        </Grid> 
      </Grid>
    </Box>
  );
};

export default Dashboard;