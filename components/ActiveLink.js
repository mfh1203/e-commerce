import { useRouter } from "next/router"

function ActiveLink({children, href}) {
    const router = useRouter()
    const active = href === router.asPath

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }
    return (
        <a className={`flex hover:cursor-pointer w-24 items-center justify-center rounded-md bg-white px-2 py-1 border-2 border-solid ${active ? "bg-blue-400 text-white" : null }`} href={href} onClick={handleClick}>
            {children}
        </a>
    )
}

export default ActiveLink
