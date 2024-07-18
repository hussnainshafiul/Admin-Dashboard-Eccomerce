import React from 'react';
import { Card, Col, Row, Statistic, Divider, Space, Popover } from 'antd';
import { DollarOutlined, UserOutlined, ShoppingOutlined, FundOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import PopularCategories from './PopularCategories';
import Header from '../components/Header';
import SalesChart from './SalesChart';

const Dashboard = () => {
  const cardHoverContent = {
    'Weekly Sales': 'This represents the total sales for the current week.',
    'New Users': 'This indicates the number of new users registered.',
    'Items Ordered': 'This shows the total number of items ordered.',
    'Total Profit': 'This displays the total profit earned.',
  };

  const renderCard = (title, value, icon) => (
    <Popover content={cardHoverContent[title]} title={null} trigger="hover">
      <Card>
        <Space size={12}>
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    </Popover>
  );


  const websiteVisitsData = [
    { date: '2024-03-01', visits: 200 },
    { date: '2024-03-02', visits: 250 },
    { date: '2024-03-03', visits: 300 },
    { date: '2024-03-04', visits: 350 },
    { date: '2024-03-05', visits: 400 },
    { date: '2024-03-06', visits: 450 },
    { date: '2024-03-07', visits: 500 },
  ];

  const cityCustomerData = [
    { name: 'Faisalabad', customers: 200 },
    { name: 'Multan', customers: 150 },
    { name: 'Islamabad', customers: 300 },
    { name: 'Lahore', customers: 400 },
    { name: 'Peshawar', customers: 250 },
    { name: 'Karachi', customers: 500 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1952'];

  return (
    <div style={{ padding: '24px', backgroundColor: '#FAF9F6', width: '100%' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px', fontFamily: 'Arial', fontSize: '24px' }}>
        Hi, welcome to the Intellishops Dashboard
      </h1>
      <Divider />

         <Row gutter={[16, 16]} justify="space-around">
        <Col xs={24} sm={12} md={6} lg={6}>
          {renderCard('Weekly Sales', 2500, <DollarOutlined style={{ fontSize: '27px', color: '#1890ff' }} />)}
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          {renderCard('New Users', 150, <UserOutlined style={{ fontSize: '27px', color: '#52c41a' }} />)}
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          {renderCard('Items Ordered', 300, <ShoppingOutlined style={{ fontSize: '27px', color: '#faad14' }} />)}
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          {renderCard('Total Profit', 10000, <FundOutlined style={{ fontSize: '27px', color: '#eb2f96' }} />)}
        </Col>
      </Row>

      <Divider />

     

     
    <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={12} lg={12}>
          <SalesChart />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <PopularCategories />
        </Col>
      </Row>
    

      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={12} lg={12}>
          <h2 style={{ textAlign: 'center', marginBottom: '24px', fontFamily: 'Arial', fontSize: '20px' }}>Website Visits</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={websiteVisitsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <h2 style={{ textAlign: 'center', marginBottom: '24px', fontFamily: 'Arial', fontSize: '20px' }}>Customer Distribution by City</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart layout="vertical" data={cityCustomerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="customers" fill="#8884d8">
                {cityCustomerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;


