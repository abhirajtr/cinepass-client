import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type DataPoint = {
    date: string
    ticketsSold: number
}

export function TicketSalesChart({ data }: { data: DataPoint[] }) {
    const chartData = data.map(point => ({
        date: new Date(point.date).toLocaleDateString(),
        tickets: point.ticketsSold
    }))

    return (
        <ChartContainer
            config={{
                tickets: {
                    label: "Tickets Sold",
                    color: "hsl(var(--chart-1))",
                },
            }}
            className="h-[300px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="tickets" stroke="var(--color-tickets)" strokeWidth={2} />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

