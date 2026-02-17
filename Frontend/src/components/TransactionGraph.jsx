import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import {
  Bar, BarChart, CartesianGrid, XAxis, YAxis,
  Line, LineChart, Area, AreaChart, ResponsiveContainer, Tooltip, Legend
} from "recharts";
import { ChartContainer } from "./ui/chart"; // Assuming these are your Shadcn/UI wrappers
import API_BASE_URL from '../config/api';
import Footer from './Footer';

// --- Constants & Config ---
const CURRENCY_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const CHART_COLORS = {
  credit: "hsl(142, 76%, 36%)",
  debit: "hsl(346, 87%, 43%)",
};

const CHART_CONFIG = {
  credit: { label: "Credit", color: CHART_COLORS.credit },
  debit: { label: "Debit", color: CHART_COLORS.debit },
};

// --- Custom Hook for Logic Separation ---
const useTransactionData = (transactionId) => {
  const [data, setData] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!transactionId) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/transactions/${transactionId}`, {
          signal: controller.signal
        });
        const result = await response.json();

        if (result.success) {
          setData(result.transactions || []);
          if (result.transactions?.[0]?.task) {
            setTaskName(result.transactions[0].task.name);
          }
        } else {
          throw new Error(result.message || "Failed to fetch data");
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Transaction fetch error:", err);
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [transactionId]);

  // Memoize heavy calculations
  const chartData = useMemo(() => {
    return data.map((tx, idx) => ({
      index: idx + 1,
      ...tx,
      description: tx.name, // normalizing data shape
      credit: tx.type === 'credit' ? tx.amount : null,
      debit: tx.type === 'debit' ? tx.amount : null,
      dateTime: new Date(`${tx.date} ${tx.time}`)
    })).sort((a, b) => a.dateTime - b.dateTime);
  }, [data]);

  const totals = useMemo(() => {
    const credit = data.reduce((sum, t) => t.type === 'credit' ? sum + t.amount : sum, 0);
    const debit = data.reduce((sum, t) => t.type === 'debit' ? sum + t.amount : sum, 0);
    return { credit, debit, balance: credit - debit };
  }, [data]);

  return { chartData, totals, taskName, isLoading, error };
};

// --- Sub-Components ---

const StatCard = ({ title, amount, type, icon: Icon }) => {
  const colorClass = {
    credit: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
    debit: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
    neutral: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
    negative: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30"
  };

  const activeColor = type === 'balance'
    ? (amount >= 0 ? colorClass.neutral : colorClass.negative)
    : colorClass[type];

  const textColor = activeColor.split(' ')[0]; // Extract just the text color class

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${activeColor.split(' ').slice(1).join(' ')}`}>
          <Icon className={`h-6 w-6 ${textColor}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className={`text-2xl font-bold ${textColor}`}>
            {CURRENCY_FORMATTER.format(Math.abs(amount))}
            {type === 'balance' && amount < 0 && ' (Dr)'}
          </p>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const isCredit = data.type === 'credit';

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 text-sm">
      <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{data.description}</p>
      <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">
        {data.dateTime.toLocaleDateString()} at {data.time}
      </p>
      <div className={`flex items-center gap-2 font-bold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
        <span>{isCredit ? 'Credit' : 'Debit'}:</span>
        <span>{CURRENCY_FORMATTER.format(data.amount)}</span>
      </div>
    </div>
  );
};

// --- Main Component ---

export default function TransactionGraph() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [chartType, setChartType] = useState('bar');

  // Use the custom hook
  const { chartData, totals, taskName: fetchedTaskName, isLoading } = useTransactionData(id);

  const taskName = location.state?.taskName || fetchedTaskName;

  // Common props for all charts to enforce DRY
  const commonChartProps = {
    data: chartData,
    margin: { top: 20, right: 30, left: 20, bottom: 40 },
  };

  const renderChartContent = useCallback(() => {
    const AxisProps = {
      tickLine: false,
      axisLine: false,
      tickMargin: 8,
      className: "text-muted-foreground text-xs",
    };

    const CommonElements = (
      <>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis {...AxisProps} dataKey="index" label={{ value: '#', position: 'insideBottom', offset: -10 }} />
        <YAxis {...AxisProps} tickFormatter={(val) => `₹${val}`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
      </>
    );

    if (chartType === 'line') {
      return (
        <LineChart {...commonChartProps}>
          {CommonElements}
          <Line type="monotone" dataKey="credit" stroke={CHART_COLORS.credit} strokeWidth={3} dot={false} connectNulls />
          <Line type="monotone" dataKey="debit" stroke={CHART_COLORS.debit} strokeWidth={3} dot={false} connectNulls />
        </LineChart>
      );
    }

    if (chartType === 'area') {
      return (
        <AreaChart {...commonChartProps}>
          {CommonElements}
          <Area type="monotone" dataKey="credit" stroke={CHART_COLORS.credit} fill={CHART_COLORS.credit} fillOpacity={0.2} />
          <Area type="monotone" dataKey="debit" stroke={CHART_COLORS.debit} fill={CHART_COLORS.debit} fillOpacity={0.2} />
        </AreaChart>
      );
    }

    return (
      <BarChart {...commonChartProps}>
        {CommonElements}
        <Bar dataKey="credit" fill={CHART_COLORS.credit} radius={[4, 4, 0, 0]} maxBarSize={60} />
        <Bar dataKey="debit" fill={CHART_COLORS.debit} radius={[4, 4, 0, 0]} maxBarSize={60} />
      </BarChart>
    );
  }, [chartType, chartData, commonChartProps]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-gray-300 rounded-full mb-4"></div>
          <div className="text-gray-400 font-medium">Loading transactions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6 mb-10">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-300 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Transaction Analytics  of {taskName || 'project finances'}
              </h1>

            </div>
          </div>

          {/* Chart Controls */}
          <div className="bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 flex w-full md:w-auto shadow-sm">
            {['bar', 'line',].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${chartType === type
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Credit" amount={totals.credit} type="credit" icon={TrendingUp} />
          <StatCard title="Total Debit" amount={totals.debit} type="debit" icon={TrendingDown} />
          <StatCard title="Net Balance" amount={totals.balance} type="balance" icon={Wallet} />
        </div>

        {/* Chart Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="h-[450px] w-full">
            {chartData.length > 0 ? (
              <ChartContainer config={CHART_CONFIG} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {renderChartContent()}
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <BarChart className="h-12 w-12 mb-2 opacity-20" />
                <p>No transaction data found for this period.</p>
              </div>
            )}
          </div>
        </div>


      </div>
      <Footer />
    </div>
  );
}