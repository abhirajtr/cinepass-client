const Dashboard = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold">1,234</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Theatres</h3>
                <p className="text-3xl font-bold">56</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Active Shows</h3>
                <p className="text-3xl font-bold">23</p>
            </div>
        </div>
    </div>
)

export default Dashboard;