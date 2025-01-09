import AddMoneyForm from '../../components/User/AddMoneyForm';
import Balance from '../../components/User/Balance';
import TransactionHistory from '../../components/User/TransactionHistory';

export default function WalletPage() {
    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">My Wallet</h1>
            <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6">
                <div className="space-y-6">
                    <Balance />
                    <AddMoneyForm />
                </div>
                <TransactionHistory />
            </div>
        </div>
    )
}

