import Title from "../../components/Title"

const Movies = () => {
    return (
        <div className="w-full h-full">
            {/* Title */}
            <div className="text-3xl">
                <Title text1="Movies" text2="List" />
            </div>
            <div className="w-full flex justify-end">
                <button className="bg-[#22251B] px-4 py-2 rounded-md text-green-65 border border-grey-15">Add Movie</button>
            </div>
            {/* Search filter */}
            <div className="flex w-full justify-between mt-4">
                <div>
                    <input type="text"
                        placeholder="Search movie"
                        className="w-full rounded-md px-4 py-1 bg-grey-10 border border-grey-15 text-absolute-white outline-none ring-1 ring-green-60/20"
                    />
                </div>
                <div>
                    filter
                </div>
            </div>
            
        </div>
    )
}

export default Movies