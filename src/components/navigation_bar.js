import React from 'react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'

import '../assets/css/navigation.css'

export default class Navigation extends React.Component{

    render(){
        return(
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
                <Link to="/" className="row">
                    <img src={logo} alt="logo" style={styles.image} />
                    <p style={{marginTop: 2, marginLeft: 5, fontWeight: 'bold'}} >Gestion Amende</p>
                </Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navmenu" aria-controls="navmenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
    
                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/" >Home</Link></li>
    
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/login" >Login</Link></li>
    
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/register_user" >Register User</Link></li>
    
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/register_police" >Register Police</Link></li>

                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/infraction" >Register Police</Link></li>

                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/amende" >Register Police</Link></li>

                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/usager" >Register Police</Link></li>

                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/all_infractions" >Register Police</Link></li>
    
                    </ul>                    
                </div>
            </nav>
        )
    }
    
}

const styles = {

    image:{
        height: 30,
        width: 30
    },

    user:{
        height: 30,
        width: 30,
        padding: 5,
        backgroundColor: "black",
        borderRadius: 20,
        
    },

    link:{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 2
    }
    
}
