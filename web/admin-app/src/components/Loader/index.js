import React from 'react'

import './style.css'

const Loader = () => {
    return (
        <div className="d-flex justify-content-center" id="loader">
            <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
