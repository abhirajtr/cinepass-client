import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const AddMoneyForm = () => {
    const [amount, setAmount] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically call an API to add money to the wallet
        console.log(`Adding &#8377;${amount} to wallet`)
        // Reset form
        setAmount('')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Money</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">&#8377;</span>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="text-2xl"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Add Money</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default AddMoneyForm;