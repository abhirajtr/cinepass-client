import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import theatreOwnerApi from '../../axiosInstance/theatreOwnerApi'
import { TicketSalesChart } from '../../components/TheatreOwner/TicketSalesChart'
import { RevenueChart } from './RevenueChart'
import { convertCentsToINR } from '../../constants'
// import { TicketSalesChart } from './TicketSalesChart'
// import { RevenueChart } from './RevenueChart'
// import { OccupancyRateChart } from './OccupancyRateChart'

type Period = 'today' | 'weekly' | 'monthly' | 'yearly'

type DataPoint = {
    date: string;
    ticketsSold: number;
    revenue: number;
};

export default function TheatreOwnerDashboard() {
    const [period, setPeriod] = useState<Period>('weekly')
    // const [selectedTheatre, setSelectedTheatre] = useState<string>('all')
    const [totalTicketSales, setTotalTicketSales] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [dailySalesData, setDailySalesData] = useState<DataPoint[]>([]);

    useEffect(() => {        
        const fetchTotalTicketSales = async() => {
            try {
                const response = await theatreOwnerApi.get('/dashboard', {
                    params: { period: period}
                });
                console.log(response);
                setTotalTicketSales(response.data.responseData.totalTickets)
                setTotalRevenue(response.data.responseData.totalRevenue)
                setDailySalesData(response.data.responseData.dailySalesData)
            } catch (error) {
                console.log(error);
            }
        }
        fetchTotalTicketSales();
    }, [period]);

    // const allData = useMemo(() => getMockData(period), [period])
    // const theatres = getTheatres()

    // const filteredData = useMemo(() => {
    //     if (selectedTheatre === 'all') {
    //         return allData
    //     }
    //     return allData.filter((point: { theatreId: string }) => point.theatreId === selectedTheatre)
    // }, [allData, selectedTheatre])

    // const kpis = getKPIs(filteredData)

    return (
        <div className="container mx-auto p-4 space-y-4">
            <h1 className="text-3xl font-bold">Theatre Owner Dashboard</h1>

            <div className="flex flex-wrap gap-4">
                <Select value={period} onValueChange={(value: Period) => setPeriod(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="weekly">This Week</SelectItem>
                        <SelectItem value="monthly">This Month</SelectItem>
                        <SelectItem value="yearly">This Year</SelectItem>
                    </SelectContent>
                </Select>

                {/* <Select value={selectedTheatre} onValueChange={setSelectedTheatre}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select theatre" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Theatres</SelectItem>
                        {theatres.map((theatre: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }) => (
                            <SelectItem key={theatre.id} value={theatre.id}>{theatre.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Tickets Sold</CardTitle>
                        <CardDescription>For the selected period and theatre</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{totalTicketSales}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                        <CardDescription>For the selected period and theatre</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">₹{convertCentsToINR(totalRevenue)}</p>
                    </CardContent>
                </Card>
                {/* <Card>
                    <CardHeader>
                        <CardTitle>Average Occupancy Rate</CardTitle>
                        <CardDescription>For the selected period and theatre</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{kpis.averageOccupancy.toFixed(2)}%</p>
                    </CardContent>
                </Card> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Ticket Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TicketSalesChart data={dailySalesData}/>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RevenueChart data={dailySalesData} />
                    </CardContent>
                </Card>
            </div>

            {/* <Card>
                <CardHeader>
                    <CardTitle>Occupancy Rate</CardTitle>
                </CardHeader>
                <CardContent>
                    <OccupancyRateChart data={filteredData} />
                </CardContent>
            </Card> */}
        </div>
    )
}

