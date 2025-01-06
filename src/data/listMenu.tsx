import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  PieChart,
  Bell,
  Diamond,
  Settings,
  Network,
} from 'lucide-react'

export type ListMenuType = {
  label: string
  icon: JSX.Element
  status: 'pending' | 'coming-soon' | 'unavailable' | 'beta' | 'available'
  description: string
}

export const ListMenu: ListMenuType[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard size={16} />, // Icon for dashboard
    status: 'pending',
    description: 'Displays a summary of the portfolio and charts.',
  },
  {
    label: 'Portfolio',
    icon: <Briefcase size={16} />, // Icon for portfolio
    status: 'coming-soon',
    description:
      'Details of owned crypto assets, recent transactions, and diversification analysis.',
  },
  {
    label: 'Transactions',
    icon: <TrendingUp size={16} />, // Icon for transactions
    status: 'coming-soon',
    description: 'Page to record, edit, and view transactions.',
  },
  {
    label: 'BlockScan',
    icon: <Network size={16} />, // Icon for Blockscan
    status: 'pending',
    description: 'EVM Tracker',
  },
  {
    label: 'Analysis',
    icon: <PieChart size={16} />, // Icon for analysis
    status: 'unavailable',
    description:
      'Features to view price prediction charts, market sentiment, and portfolio statistics.',
  },
  {
    label: 'Alerts',
    icon: <Bell size={16} />, // Icon for alerts
    status: 'unavailable',
    description: 'Set notifications for price changes and ROI.',
  },
  {
    label: 'NFT & DeFi',
    icon: <Diamond size={16} />, // Icon for NFT & DeFi
    status: 'coming-soon',
    description: 'Track NFT portfolios and DeFi activities (staking, farming).',
  },
  {
    label: 'Settings',
    icon: <Settings size={16} />, // Icon for settings
    status: 'coming-soon',
    description: 'Customize app preferences and user account settings.',
  },
]
