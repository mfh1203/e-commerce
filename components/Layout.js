import Modal from "./Modal"
import NavBar from "./NavBar"
import Notify from "./Notify"


function Layout({children}) {

    return (
        <div className="max-w-4xl mx-auto">
            <NavBar/>
            <Notify/>
            {children}
        </div>
    )
}

export default Layout
