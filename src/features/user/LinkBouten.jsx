import { Link, useNavigate } from "react-router-dom"

function LinkBouten({ children, to }) {
    const navigate = useNavigate();
    const className = 'text-blue-500 text-sm hover:text-blue-600'
    if (to === "-1") return <button className={className} onClick={() => navigate(-1)}>{children}</button>
    return (
        <Link to={to} className={className}>
            {children}

        </Link>
    )
}

export default LinkBouten
