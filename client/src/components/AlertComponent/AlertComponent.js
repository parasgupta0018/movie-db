import React, { useState, useEffect } from 'react';
import './AlertComponent.css';
function AlertComponent(props) {
    const [modalDisplay, toggleDisplay] = useState('none');
    const openModal = () => {
        toggleDisplay('block');     
    }
    const closeModal = () => {
        toggleDisplay('none'); 
        props.hideError(null);
    }
    useEffect(() => {
        if(props.errorMessage !== null) {
            openModal()
        } else {
            closeModal()
        }
    });
    
    return(
        <div 
            className="alert alert-danger mt-2 alert-dismissible fade show"
            role="alert" 
            id="alertPopUp"
            style={{ display: modalDisplay }}
        >
            <div className="d-flex alertMessage">
                <span>{props.errorMessage}</span>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            
        </div>
    )
} 

export default AlertComponent