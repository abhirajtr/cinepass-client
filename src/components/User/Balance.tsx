import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

const Balance = () => {
    const balance = 150.00

    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">&#8377;{balance.toFixed(2)}</p>
            </CardContent>
        </Card>
    )
}

export default Balance;

