import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import Calendar from 'react-calendar';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for fetching data
import 'react-calendar/dist/Calendar.css'; // Import styles for the calendar
import UserService from "../Home/UserService";
import { motion } from "framer-motion";
import { FiFilter, FiDownload, FiRefreshCw } from "react-icons/fi";

const AnalyzePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State to hold fetched data for the charts
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [areaChartData, setAreaChartData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalWaste: 0,
    averageWeight: 0,
    mostCommonType: '',
    recyclingRate: 0
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${UserService.BASE_URL}/public/getAllReport`);
      const wasteReports = response.data;
      
      // Process data for different charts
      processChartData(wasteReports);
      calculateStats(wasteReports);
    } catch (error) {
      console.error("Error fetching waste report data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Set up real-time updates every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  const processChartData = (wasteReports) => {
    // Line chart data (monthly trends)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyWaste = months.map((month, index) => {
      const monthReports = wasteReports.filter(report => new Date(report.date).getMonth() === index);
      const totalWaste = monthReports.reduce((total, report) => total + report.wasteWeight, 0);
      return { name: month, value: totalWaste };
    });
    setLineChartData(monthlyWaste);

    // Bar chart data (waste types)
    const wasteTypes = Array.from(new Set(wasteReports.map(report => report.wasteType)));
    const wasteTypeData = wasteTypes.map(type => {
      const typeReports = wasteReports.filter(report => report.wasteType === type);
      return { name: type, value: typeReports.length };
    });
    setBarChartData(wasteTypeData);

    // Pie chart data (waste distribution)
    const pieData = wasteTypes.map(type => {
      const typeReports = wasteReports.filter(report => report.wasteType === type);
      const totalWeight = typeReports.reduce((sum, report) => sum + report.wasteWeight, 0);
      return { name: type, value: totalWeight };
    });
    setPieChartData(pieData);

    // Area chart data (cumulative waste)
    const sortedReports = [...wasteReports].sort((a, b) => new Date(a.date) - new Date(b.date));
    let cumulativeWeight = 0;
    const areaData = sortedReports.map(report => {
      cumulativeWeight += report.wasteWeight;
      return {
        date: new Date(report.date).toLocaleDateString(),
        weight: cumulativeWeight
      };
    });
    setAreaChartData(areaData);
  };

  const calculateStats = (wasteReports) => {
    const totalWaste = wasteReports.reduce((sum, report) => sum + report.wasteWeight, 0);
    const averageWeight = totalWaste / wasteReports.length;
    const wasteTypeCounts = {};
    wasteReports.forEach(report => {
      wasteTypeCounts[report.wasteType] = (wasteTypeCounts[report.wasteType] || 0) + 1;
    });
    const mostCommonType = Object.entries(wasteTypeCounts)
      .sort(([,a], [,b]) => b - a)[0][0];
    const recyclingRate = (wasteReports.filter(r => r.wasteType === 'Recyclable').length / wasteReports.length) * 100;

    setStats({
      totalWaste,
      averageWeight,
      mostCommonType,
      recyclingRate
    });
  };

  const onDateChange = (newDate) => setDate(newDate);

  // Define colors for each bar
  const barColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/WasteManagementDashboard' },
    { icon: '📶', label: 'Analyze', path: '/AnalyzePage' },
    { icon: '🏆', label: 'Rewards', path: '/Leaderboard' },
    { icon: '📋', label: 'Report Data', path: '/WasteReportingTable' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black p-6 shadow-lg">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold flex items-center space-x-2"
        >
          ♻ <span>WasteTrack</span>
        </motion.h1>
        <nav className="mt-8 space-y-4">
          {menuItems.map((item) => (
            <motion.button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`w-full text-left p-3 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                location.pathname === item.path ? 'bg-green-600 text-white' : 'hover:bg-green-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.icon} <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Advanced Analytics Dashboard</h2>
          <div className="flex space-x-4">
            <button 
              onClick={fetchData}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiRefreshCw className="mr-2" /> Refresh Data
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FiDownload className="mr-2" /> Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Waste', value: `${stats.totalWaste.toFixed(2)} kg`, color: 'bg-blue-500' },
            { title: 'Average Weight', value: `${stats.averageWeight.toFixed(2)} kg`, color: 'bg-green-500' },
            { title: 'Most Common Type', value: stats.mostCommonType, color: 'bg-purple-500' },
            { title: 'Recycling Rate', value: `${stats.recyclingRate.toFixed(1)}%`, color: 'bg-yellow-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.color} p-6 rounded-xl text-white shadow-lg`}
            >
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Monthly Waste Trends</h3>
            <LineChart width={500} height={300} data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Waste Type Distribution</h3>
            <BarChart width={500} height={300} data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {barChartData.map((entry, index) => (
                <Bar key={entry.name} dataKey="value" fill={COLORS[index % COLORS.length]} />
              ))}
            </BarChart>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Waste Composition</h3>
            <PieChart width={500} height={300}>
              <Pie
                data={pieChartData}
                cx={250}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Area Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Cumulative Waste Over Time</h3>
            <AreaChart width={500} height={300} data={areaChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="weight" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </div>
        </div>

        {/* Calendar and Filters */}
        <div className="mt-8 grid grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Date Selection</h3>
            <Calendar
              onChange={onDateChange}
              value={date}
              className="border p-2 rounded-lg shadow-sm"
            />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Time Range Filter</h3>
            <div className="flex space-x-4">
              {['week', 'month', 'quarter', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTimeRange === range
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyzePage;