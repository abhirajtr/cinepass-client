import { FC } from "react"

interface SearchProps {
    setSearch: (searchValue: string) => void;
}

const Search: FC<SearchProps> = ({ setSearch }) => {
    return (
        <input type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name, email, or phone"
            className="w-full rounded-md px-4 py-1 bg-grey-10 border border-grey-15 text-absolute-white outline-none ring-1 ring-green-60/20"
        />
    )
}

export default Search