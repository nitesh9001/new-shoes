import React from 'react'
import SearchIcon from '@material-ui/icons/Search'

function Header(props) {
    return (
        <>
        <div className="main-nav-wrapper">
            <div className= "nav-logo">
                <b className="logo_name">Shoes .</b>
                <div className="search_box">
                <SearchIcon style={{color:"grey",fontSize:"20px", margin:"6px 10px 6px 5px"}}/>
                <input type="search" placeholder="Search for Sneaker" />
                </div>
            </div>
        </div>
       </>
    )
}

export default Header
