export const Theatres = () => (
    <div>
        <h2 className="text-2xl font-bold mb-4">Theatres</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Grand Theatre</td>
                        <td className="px-6 py-4 whitespace-nowrap">New York</td>
                        <td className="px-6 py-4 whitespace-nowrap">500</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Starlight Cinema</td>
                        <td className="px-6 py-4 whitespace-nowrap">Los Angeles</td>
                        <td className="px-6 py-4 whitespace-nowrap">300</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
)