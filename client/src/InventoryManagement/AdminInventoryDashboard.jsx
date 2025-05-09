import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Tabs, Tab, List, ListItem, ListItemText, Divider } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const tabStyle = {
  minWidth: 100,
  fontWeight: 500,
  fontSize: '1rem',
  color: '#2563eb',
  '&.Mui-selected': {
    color: '#2563eb',
    borderBottom: '2px solid #2563eb',
  },
};

const AdminInventoryDashboard = () => {
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [pendingRestocks, setPendingRestocks] = useState(0);
  const [stockChartData, setStockChartData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:4000/api/stock/get-stock').then(res => {
      setTotalMedicines(res.data.length);
      setLowStock(res.data.filter(item => Number(item.quantity) <= Number(item.restockThereshold)).length);
      setStockChartData(
        res.data.map(item => ({
          name: item.medicineName,
          Stock: Number(item.quantity)
        }))
      );
    });
    axios.get('http://localhost:4000/api/supplier/get-suppliers').then(res => {
      setTotalSuppliers(res.data.length);
    });
    axios.get('http://localhost:4000/api/restoke/get-restoke').then(res => {
      setPendingRestocks(res.data.data.filter(r => r.status === 'Pending').length);
    });
  }, []);

  return (
    <Box sx={{ background: '#fff', borderRadius: 2, boxShadow: 2, p: 0 }}>
      {/* Header */}
      <Box sx={{ background: '#2563eb', px: 3, py: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
        <Typography variant="h5" fontWeight="bold" color="#fff">
          Inventory Management
        </Typography>
      </Box>
      {/* Tabs */}
      
      {/* Overview Content */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} color="#2563eb">
          Dashboard Overview
        </Typography>
        <Grid container spacing={3} mb={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: '#a7c7e7', color: '#22223b', borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <InventoryIcon sx={{ fontSize: 32, color: '#2563eb' }} />
                <Typography variant="subtitle1" fontWeight={600}>Total Medicines</Typography>
                <Typography variant="h5">{totalMedicines}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: '#d6c1e7', color: '#22223b', borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <WarningIcon sx={{ fontSize: 32, color: '#a259c7' }} />
                <Typography variant="subtitle1" fontWeight={600}>Low Stock Items</Typography>
                <Typography variant="h5">{lowStock}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: '#b7e4c7', color: '#22223b', borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <GroupIcon sx={{ fontSize: 32, color: '#22c55e' }} />
                <Typography variant="subtitle1" fontWeight={600}>Suppliers</Typography>
                <Typography variant="h5">{totalSuppliers}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: '#f7c6c7', color: '#22223b', borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <AssignmentReturnIcon sx={{ fontSize: 32, color: '#e57373' }} />
                <Typography variant="subtitle1" fontWeight={600}>Pending Restocks</Typography>
                <Typography variant="h5">{pendingRestocks}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ background: '#f8fafc', borderRadius: 2, boxShadow: 1, p: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} mb={2} color="#2563eb">
                Stock Levels
              </Typography>
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <ResponsiveContainer width={Math.max(400, stockChartData.length * 80)} height={320}>
                  <BarChart
                    data={stockChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      stroke="#2563eb"
                      fontSize={13}
                      angle={-35}
                      textAnchor="end"
                      interval={0}
                      height={60}
                      tick={{ fontWeight: 500, fill: '#183a6d' }}
                    />
                    <YAxis
                      stroke="#2563eb"
                      fontSize={13}
                      label={{
                        value: 'Quantity',
                        angle: -90,
                        position: 'insideLeft',
                        fill: '#2563eb',
                        fontWeight: 600,
                        fontSize: 14,
                        dx: -10,
                      }}
                    />
                    <Tooltip
                      contentStyle={{ background: '#fff', border: '1px solid #2563eb', borderRadius: 8, color: '#183a6d' }}
                      labelStyle={{ color: '#2563eb', fontWeight: 600 }}
                      cursor={{ fill: '#e3f0ff' }}
                    />
                    <Bar
                      dataKey="Stock"
                      fill="#a7c7e7"
                      radius={[8, 8, 0, 0]}
                      maxBarSize={40}
                      label={{ position: 'top', fill: '#2563eb', fontWeight: 600, fontSize: 13 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminInventoryDashboard; 