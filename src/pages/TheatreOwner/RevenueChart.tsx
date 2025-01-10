import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart"
// import { convertCentsToINR } from "../../constants"

type DataPoint = {
    date: string
    revenue: number
}

export function RevenueChart({ data }: { data: DataPoint[] }) {
    const chartData = data.map(point => ({
        date: new Date(point.date).toLocaleDateString(),
        // revenue: point.revenue
        revenue: point.revenue/100
    }))

    return (
        <ChartContainer
            config={{
                revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-2))",
                },
            }}
            className="h-[300px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

