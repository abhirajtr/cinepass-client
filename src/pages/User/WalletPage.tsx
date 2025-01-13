import { useEffect, useState } from 'react';
// import AddMoneyForm from '../../components/User/AddMoneyForm';
import Balance from '../../components/User/Balance';
import TransactionHistory from '../../components/User/TransactionHistory';
import axiosInstance from '../../axiosInstance';

interface Transaction {
    amount: number;
    description: string;
    type: "credit" | "debit";
    createdAt: string;
}
interface Wallet {
    userId: string;
    balance: number;
    transaction: Transaction[]
}

const WalletPage = () => {
    const [wallet, setWallet] = useState<Wallet | null>(null);
    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const { data } = await axiosInstance.get<{ responseData: Wallet }>('/user/wallet');
                setWallet(data.responseData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchWallet();
    }, []);

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">My Wallet</h1>
            <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6">
                <div className="space-y-6">
                    <Balance balance={wallet?.balance || 0} />
                    {/* <AddMoneyForm /> */}
                </div>
                <TransactionHistory transaction={wallet?.transaction || []} />
            </div>
        </div>
    )
}

export default WalletPage;