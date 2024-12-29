import { Link } from "react-router-dom"

function Button({ handler, children, disabled, to, type }) {

    const base = "text-sm inline-block uppercase tracking-wide text-stone-800 transition-all duration-300 font-semibold bg-yellow-400 rounded-full hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"

    const style = {
        privet: base + ' px-4 py-3 md:px-6 md:py-4  ',
        secondary: "inline-block  px-4 py-3 md:px-6 md:py-4  uppercase tracking-wide text-stone-400 transition-all duration-300 font-semibold  rounded-full hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:ring focus:ring-stone-300 focus:ring-offset-2 border-2 border-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2",
        small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        round: base + ' px-2.5 py-1 md:px-3 md:py-1.5 text-sm'
    }
    if (to) return <Link to={to} className={style[type]}>{children}</Link>
    if (handler) return <button onClick={handler} disabled={disabled} className={style[type]}>
        {children}
    </button>
    return (
        <button disabled={disabled} className={`${style[type]} ${disabled ? 'cursor-not-allowed bg-yellow-200' : ''}`}>
            {children}
        </button>
    )
}

export default Button
