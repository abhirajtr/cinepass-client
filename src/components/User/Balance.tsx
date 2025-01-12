import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

interface BalanceProps {
    balance: number;
}

const Balance: FC<BalanceProps> = ({ balance }) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">&#8377;{balance / 100}</p>
            </CardContent>
        </Card>
    )
}

export default Balance;

