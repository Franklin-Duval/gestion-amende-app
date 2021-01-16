import React from 'react'
import { Link } from 'react-router-dom'

import '../assets/css/home.css'
import police from '../assets/images/police.png'
import im1 from '../assets/images/im1.png'
import im2 from '../assets/images/im2.png'
import im3 from '../assets/images/im3.png'

export default class Home extends React.Component{

    render(){
        return(
            <div className="container-fluid">
                <div className="banner row" style={styles.container}>
                    <div className="col-md-6">
                        <p className="text-left title">Système de Gestion Automatique des Amendes Routier</p>
                    </div>
                    <div className="col-md-6">
                        <img src={police} alt="police" style={styles.image} />
                    </div>
                </div>

                <p className="sub-title text-center">Que faisons nous</p>
                <div className="container">
                    <p className="text text-center">Les amendes sont généralement géré de facon manuel. Cela n'est pas très éfficace car les policier ne reconnaissent pas facilement les usagers routiers 
                        à travers la plateform, les policier seront capable de entrer une amende et la coller a un usager dans un cas infractions routier. On pourra visualiser les infractions commisent par
                        différent usager.
                    </p>
                </div>

                <p className="sub-title text-center">Nos Services</p>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4" style={styles.service}>
                            <img src={im1} alt="" width={150} height={150} />
                            <Link to="/register_user" style={styles.link} >Inscription Usager</Link>
                        </div>
                        <div className="col-md-4" style={styles.service}>
                            <img src={im2} alt="" width={150} height={150} />
                            <Link to="/register_police" style={styles.link} >Inscription Policier</Link>
                        </div>
                        <div className="col-md-4" style={styles.service}>
                            <img src={im3} alt="" width={150} height={150} />
                            <Link to="/usager" style={styles.link} >Liste Usager</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    container:{
        
    },

    image:{
        height: 350,
        width: 350,
        borderRaduis: 175,
        marginTop: 50,
        marginBottom: 50,
    },

    service:{
        marginBottom: 100,
        marginTop: 50,
        
    },

    link:{
        display: 'block',
        color: 'black',
        fontSize: 25,
        fontFamily: 'Barlow Condensed'
    }
}