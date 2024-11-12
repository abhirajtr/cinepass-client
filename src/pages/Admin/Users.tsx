import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance"
import { toast } from "sonner";
import { AxiosError } from "axios";
import Pagination from "../../components/Pagination";
import Search from "../../components/search";
import Title from "../../components/Title";

interface User {
    userId: string;
    name: string;
    email: string;
    phone: string,
    role: string
    isBlocked: boolean,
}
type UserRole = "regularUser" | "theatreOwner" | "";
type IsBlocked = true | false | "";


const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [filterRole, setFilterRole] = useState<UserRole>("");
    const [filterIsBlocked, setFilterIsBlocked] = useState<IsBlocked>("");
    const [search, setSearch] = useState<string>("");
    const [usersPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(1);

    const blockUnblock = async (userId: string, isBlocked: boolean) => {
        try {
            const response = await axiosInstance.post<{ updatedUser: User, message: string }>("/admin/users/block-unblock", { userId, isBlocked });
            toast.error(response.data.message);
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.userId === userId ? { ...user, isBlocked: response.data.updatedUser.isBlocked } : user
                )
            );
            // console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            } else {
                toast.error("An unexpected error occured");
            }
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const params = { search, userRole: filterRole, isBlocked: filterIsBlocked, limit: usersPerPage, currentPage };
                // console.log("Fetching users with params:", params);

                const response = await axiosInstance.get<{ users: User[], totalCount: number }>("/admin/users", { params });
                setUsers(response.data.users);
                setTotalCount(response.data.totalCount);
                console.log(response);
                
                console.log('totalCount', totalCount);

                // console.log(response.data.users);

            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message);
                } else {
                    toast.error("An unexpected error occured");
                }
            }
        }
        fetchUsers();
    }, [search, filterRole, filterIsBlocked, totalCount, usersPerPage, currentPage]);

    return (
        <>
            <div className="text-3xl">
                <Title text1="Users" text2="List" />
            </div>
            {/* <p className="mb-2 text-green-60 text-lg">Users List</p> */}
            <div className="mb-4 flex w-full justify-between">
                <div className="w-80">
                    {/* <input type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search users by name, email, or phone"
                        className="w-full rounded-md px-4 py-1 bg-grey-10 border border-grey-15 text-absolute-white outline-none ring-1 ring-green-60/20"
                    /> */}
                    <Search setSearch={setSearch} />
                </div>
                <div className="flex gap-2">
                    <div className="flex gap-2 justify-center items-center">
                        <label htmlFor="" className="text-absolute-white">Filter by Role</label>
                        <select
                            className="rounded-sm px-2 text-center py-1 bg-grey-11 border border-grey-15 text-grey-75"
                            onChange={(e) => setFilterRole((e.target as HTMLSelectElement).value as UserRole)}
                        >
                            <option className="hover:bg-green-60" value="">All Roles</option>
                            <option className="hover:bg-green-60" value="regularUser">Regular User</option>
                            <option className="hover:bg-green-60" value="theatreOwner">Theatre Owner</option>
                        </select>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <label htmlFor="" className="text-absolute-white">Filter by Status</label>
                        <select
                            className="rounded-sm px-2 text-center py-1 bg-grey-11 border border-grey-15 text-grey-75"
                            onChange={(e) => setFilterIsBlocked((e.target as HTMLSelectElement).value as IsBlocked)}>
                            <option value="">All User</option>
                            <option value="true">Only Blocked</option>
                            <option value="false">Only Unblocked</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 min-h-[65vh]">

                <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border border-grey-15 bg-grey-10 text-sm text-absolute-white">
                    <b>Name</b>
                    <b>Email</b>
                    <b>Phone</b>
                    <b>User Role</b>
                    {/* <b>Price</b> */}
                    <b className="text-center">Action</b>
                </div>

                {
                    users.map((user) => (
                        <div key={user.userId} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border border-grey-15 text-sm text-absolute-white">
                            {/* <img src={item.image[0]} alt="" className="w-12" /> */}
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                            <p>{user.role}</p>
                            <div className="flex items-center justify-center">
                                <p className={`${user.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} px-4 py-1 rounded-sm w-24 text-center font-semibold hover: cursor-pointer`}
                                    onClick={() => blockUnblock(user.userId, !user.isBlocked)}
                                >
                                    {user.isBlocked ? 'Unblock' : 'Block'}
                                </p>
                            </div>
                            {/* <p className="text-center md:text-center cursor-pointer text-lg bg-red-500 w-24"
                                // onClick={() => removeProduct(item._id)}
                            >{user.isBlocked ? 'Unblock': 'Block'}</p> */}
                        </div>
                    ))
                }


            </div>
            <Pagination currentPage={currentPage} limit={usersPerPage} totalCount={totalCount} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default Users