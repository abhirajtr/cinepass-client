import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Users, Ticket, DollarSign } from 'lucide-react'

const dashboardItems = [
    { title: 'Total Revenue', icon: DollarSign, value: '$54,231', change: '+20%' },
    { title: 'Ticket Sales', icon: Ticket, value: '3,456', change: '+15%' },
    { title: 'New Customers', icon: Users, value: '246', change: '+10%' },
    { title: 'Occupancy Rate', icon: BarChart, value: '84%', change: '+5%' },
]

export default function DashboardTheatreOwner() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {dashboardItems.map((item) => (
                    <Card key={item.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {item.title}
                            </CardTitle>
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                            <p className="text-xs text-muted-foreground">{item.change} from last month</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}