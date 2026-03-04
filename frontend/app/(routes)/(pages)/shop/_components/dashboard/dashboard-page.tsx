'use client'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ShoppingCart, DollarSign, CheckCircle } from 'lucide-react'
import KPICard from './kpicard'
import { handleDashboardData } from '@/lib/actions/dashboard-action'
import { handleGetAllShopsOfAUser } from '@/lib/actions/shop-action'

interface KPICards {
  revenue: number
  orders: number
  aov: number
  successfulPaymentRate: number
}

interface RevenueTrendItem {
  bucket: string
  value: number
}

interface PaymentSplitItem {
  provider: string
  count: number
  percentage: number
}

interface TopProduct {
  productId: string
  name: string
  revenue: number
  qty: number
}

interface DashboardData {
  cards: KPICards
  revenueTrend: RevenueTrendItem[]
  paymentSplit: PaymentSplitItem[]
  topProductsByRevenue: TopProduct[]
}

interface RevenueData {
  date: string
  revenue: number
}

interface PaymentData {
  name: string
  value: number
  color: string
}

interface TopProductData {
  name: string
  revenue: number
}

export default function DashboardPage() {
    const router = useRouter()
    const [dashboardData, setDashboardData] = useState<DashboardData>({
      cards: {
        revenue: 0,
        orders: 0,
        aov: 0,
        successfulPaymentRate: 0,
      },
      revenueTrend: [],
      paymentSplit: [],
      topProductsByRevenue: [],
    })

    const [revenueData, setRevenueData] = useState<RevenueData[]>([])
    const [paymentData, setPaymentData] = useState<PaymentData[]>([])
    const [topProducts, setTopProducts] = useState<TopProductData[]>([])
    const [hasShops, setHasShops] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const transformData = (data: any) => {
      setDashboardData(data)
      const transformedRevenueData = data.revenueTrend.map((item: RevenueTrendItem) => ({
        date: new Date(item.bucket).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        revenue: item.value,
      }))
      setRevenueData(transformedRevenueData)
      const providerNames: Record<string, string> = {
        'esewa': 'eSewa',
        'khalti': 'Khalti',
      }
      const transformedPaymentData = data.paymentSplit.map((item: PaymentSplitItem) => {
        const colors: Record<string, string> = {
          'esewa': '#635BFF',
          'khalti': '#10B981',
        }
        return {
          name: providerNames[item.provider] || item.provider,
          value: Math.round(item.percentage),
          color: colors[item.provider] || '#9CA3AF',
        }
      })
      setPaymentData(transformedPaymentData)
      const transformedTopProducts = data.topProductsByRevenue.map((product: TopProduct) => ({
        name: product.name,
        revenue: product.revenue,
      }))
      setTopProducts(transformedTopProducts)
    }

    const fetchData = async () => {
        const res = await handleDashboardData();
        console.log('Dashboard data:', res.data)
        if(res.success && res.data){
            transformData(res.data)
        }
    }
    const fetchShop = async () => {
        const res = await handleGetAllShopsOfAUser();
        if(res.success && res.data){
            console.log(res.data.length)
            if(res.data.length === 0){
                setHasShops(false)
                router.push('/shop/profile')
            } else {
                setHasShops(true)
            }
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchShop();
        fetchData();
    },[])
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {!isLoading && !hasShops ? (
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">No Shop Found</h1>
            <p className="text-lg text-gray-600 mb-8">Please create a shop first to view your dashboard</p>
            <button
              onClick={() => router.push('/shop/profile')}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Shop
            </button>
          </div>
        ) : !isLoading && hasShops ? (
          <>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Heres your shop performance overview.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={`Rs. ${dashboardData.cards.revenue.toFixed(2)}`}
            change={0}
            icon={<DollarSign className="w-8 h-8" />}
          />
          <KPICard
            title="Total Orders"
            value={dashboardData.cards.orders.toString()}
            change={0}
            icon={<ShoppingCart className="w-8 h-8" />}
          />
          <KPICard
            title="Average Order Value"
            value={`Rs. ${dashboardData.cards.aov.toFixed(2)}`}
            change={0}
            icon={<DollarSign className="w-8 h-8" />}
          />
          <KPICard
            title="Success Rate"
            value={`${(dashboardData.cards.successfulPaymentRate * 100).toFixed(1)}%`}
            change={0}
            icon={<CheckCircle className="w-8 h-8" />}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  cursor={{ stroke: '#E5E7EB' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value:any) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {paymentData.map((method) => (
                <div key={method.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }} />
                    <span className="text-gray-600">{method.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{method.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={190} />
              <Tooltip contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
              <Bar dataKey="revenue" fill="#10B981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        )}
      </div>
    </div>
  )
}
