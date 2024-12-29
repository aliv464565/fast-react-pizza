import { useSelector } from "react-redux"

function User() {
    const username = useSelector((state) => state.user.username)
    return (
        <span className="hidden text-sm font-semibold md:inline"> {username}</span>
    )
}

export default User

