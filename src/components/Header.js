// import React from "react";
import PropTypes from 'prop-types'
import Button from "./Button";

const Header = ({title}) => {
    const onClick = () => {
        console.log("Here from the header file")
    }
    return (
        <header className='header'>
            <h1 >{title}</h1>
            <Button color='orange' text='Hello' onClick={onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
}

// CSS in js
// const headingStyle = {
//     color: 'purple',
//     backgroundColor: 'black'
// }
export default Header