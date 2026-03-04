import { TrendingUp} from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

export default function KPICard({ title, value, change, icon }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-green-600">+{change}%</span>
        <span className="text-sm text-gray-600">from last month</span>
      </div>
    </div>
  )
}