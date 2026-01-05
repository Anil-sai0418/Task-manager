import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Area, AreaChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "./ui/chart";
import API_BASE_URL from '../config/api';

export default function TransactionGraph() {
  const params = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [chartType, setChartType] = useState('bar'); // 'bar', 'line', 'area'

  useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/transactions/${params.id}`);
        const data = await response.json();
        
        if (data.success) {
          const transactionsData = data.transactions.map(tx => ({
            id: tx._id,
            type: tx.type,
            description: tx.name,
            amount: tx.amount,
            date: tx.date,
            time: tx.time,
            task: tx.taskId
          }));
          
          setTransactions(transactionsData);
          
          // Get task name from first transaction
          if (transactionsData.length > 0 && transactionsData[0].task) {
            setTaskName(transactionsData[0].task.name);
          }
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  // Transform data for individual transactions display
  const chartData = transactions.map((transaction, index) => ({
    index: index + 1,
    date: transaction.date,
    time: transaction.time,
    description: transaction.description,
    credit: transaction.type === 'credit' ? transaction.amount : null,
    debit: transaction.type === 'debit' ? transaction.amount : null,
    amount: transaction.amount,
    type: transaction.type,
  })).sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeA - dateTimeB;
  });

  // Calculate totals
  const totalCredit = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDebit = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalCredit - totalDebit;

  const chartConfig = {
    credit: {
      label: "Credit",
      color: "hsl(142, 76%, 36%)",
    },
    debit: {
      label: "Debit",
      color: "hsl(346, 87%, 43%)",
    },
  };

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 40 },
    };

    // Custom tooltip content for individual transactions
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {data.description}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {new Date(data.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })} at {data.time}
            </p>
            {data.type === 'credit' ? (
              <p className="text-green-600 dark:text-green-400 font-bold">
                Credit: ₹{data.amount.toLocaleString()}
              </p>
            ) : (
              <p className="text-red-600 dark:text-red-400 font-bold">
                Debit: ₹{data.amount.toLocaleString()}
              </p>
            )}
          </div>
        );
      }
      return null;
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="index" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-muted-foreground"
              label={{ value: 'Transaction #', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-muted-foreground"
              label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line 
              type="monotone" 
              dataKey="credit" 
              stroke="var(--color-credit)" 
              strokeWidth={3}
              dot={{ r: 6, fill: 'var(--color-credit)', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, strokeWidth: 2 }}
              connectNulls={true}
            />
            <Line 
              type="monotone" 
              dataKey="debit" 
              stroke="var(--color-debit)" 
              strokeWidth={3}
              dot={{ r: 6, fill: 'var(--color-debit)', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, strokeWidth: 2 }}
              connectNulls={true}
            />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="index" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-muted-foreground"
              label={{ value: 'Transaction #', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-muted-foreground"
              label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area 
              type="monotone" 
              dataKey="credit" 
              stroke="var(--color-credit)" 
              fill="var(--color-credit)"
              fillOpacity={0.3}
              strokeWidth={3}
              connectNulls={true}
              dot={{ r: 5, fill: 'var(--color-credit)', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7, strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="debit" 
              stroke="var(--color-debit)" 
              fill="var(--color-debit)"
              fillOpacity={0.3}
              strokeWidth={3}
              connectNulls={true}
              dot={{ r: 5, fill: 'var(--color-debit)', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7, strokeWidth: 2 }}
            />
          </AreaChart>
        );
      
      default: // bar
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="index" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-muted-foreground"
              label={{ value: 'Transaction #', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-muted-foreground"
              label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="credit" fill="var(--color-credit)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="debit" fill="var(--color-debit)" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                       border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800
                       text-gray-800 dark:text-gray-100
                       shadow-sm hover:shadow-md
                       hover:bg-gray-50 dark:hover:bg-gray-700
                       transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {taskName} - Transaction Analytics
          </h1>
          
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Credit</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ₹{totalCredit.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Debit</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  ₹{totalDebit.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${balance >= 0 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                <div className="h-6 w-6 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center">
                  ₹
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                  ₹{balance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => setChartType('bar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              chartType === 'bar'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              chartType === 'line'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Line Chart
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              chartType === 'area'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Area Chart
          </button>
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Credit vs Debit Over Time
          </h2>
          
          {chartData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              {renderChart()}
            </ChartContainer>
          ) : (
            <div className="h-[400px] flex items-center justify-center text-gray-500 dark:text-gray-400">
              No transaction data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
