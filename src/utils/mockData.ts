import { startOfDay, startOfWeek, startOfMonth, startOfYear, eachDayOfInterval } from 'date-fns'

type DataPoint = {
    date: Date;
    theatreId: string;
    theatreName: string;
    ticketsSold: number;
    revenue: number;
    occupancyRate: number;
}

const theatres = [
    { id: 'th1', name: 'Grand Cinema' },
    { id: 'th2', name: 'City Movieplex' },
    { id: 'th3', name: 'Starlight Theatre' },
]

const generateDataForPeriod = (start: Date, end: Date): DataPoint[] => {
    const data: DataPoint[] = []

    eachDayOfInterval({ start, end }).forEach(date => {
        theatres.forEach(theatre => {
            data.push({
                date,
                theatreId: theatre.id,
                theatreName: theatre.name,
                ticketsSold: Math.floor(Math.random() * 500) + 100,
                revenue: Math.floor(Math.random() * 10000) + 2000,
                occupancyRate: Math.random() * 0.5 + 0.3,
            })
        })
    })

    return data
}

export const getMockData = (period: 'all' | 'today' | 'weekly' | 'monthly' | 'yearly') => {
    const now = new Date()
    let start: Date
    const end: Date = now

    switch (period) {
        case 'all':
            start = new Date(now.getFullYear(), 0, 1) // Start of the current year
            break
        case 'today':
            start = startOfDay(now)
            break
        case 'weekly':
            start = startOfWeek(now)
            break
        case 'monthly':
            start = startOfMonth(now)
            break
        case 'yearly':
            start = startOfYear(now)
            break
    }

    return generateDataForPeriod(start, end)
}

export const getKPIs = (data: DataPoint[]) => {
    const totalTickets = data.reduce((sum, point) => sum + point.ticketsSold, 0)
    const totalRevenue = data.reduce((sum, point) => sum + point.revenue, 0)
    const averageOccupancy = data.reduce((sum, point) => sum + point.occupancyRate, 0) / data.length

    return {
        totalTickets,
        totalRevenue,
        averageOccupancy: averageOccupancy * 100, // Convert to percentage
    }
}

export const getTheatres = () => theatres

