import React from 'react'
import API_URL from '../assets/constant'
import { BeatLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

export default class Usager extends React.Component{

    componentDidMount(){
        this.fetchAmende()
    }

    state = {
        isLoading: true,
        usagers: [],
        usager: {}
        
    }

    fetchAmende = () => {
        fetch(API_URL + 'bd_police/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                usagers: responseJson,
                isLoading: false
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    render(){
        return(
            this.state.isLoading
            ?
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <BeatLoader loading={this.state.isLoading} size={100} color="#673ab7" />
            </div>
            :
            <div className="container-fluid">
                <h1 className="text-center" style={{marginTop: 50, marginBottom: 30, fontFamily: 'Times New Roman'}}>Liste des Usagers Routiers au Cameroun</h1>
                <div style={{marginBottom: 50, marginTop: 20}} >
                    <Link type="button" className="ajouter col-md-12 text-center" to="/register_user">Ajouter un Usager</Link>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">CNI</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prenom</th>
                            <th scope="col">Adresse</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Date Naissance</th>
                            <th scope="col">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.usagers.map((item, index) => {
                                return(
                                    <tr data-toggle="modal" data-target="#modal" key={index} onClick={() => this.setState({usager: item}) }>
                                        <td>{item.CNI} </td>
                                        <td>{item.nom} </td>
                                        <td>{item.prenom} </td>
                                        <td>{item.adresse} </td>
                                        <td>{item.contact} </td>
                                        <td>{item.date_naissance} </td>
                                        <td>{item.statut_matrimoniale === 1 ? 'Célibataire' : item.statut_matrimoniale === 2 ? 'Marié' : 'Compliqué'} </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
                    
                
                {/* Modal Ajouter Amende */}
                <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Détail Usager</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5>Nom : {this.state.usager.nom} </h5>
                                <h5>Prénom : {this.state.usager.prenom} </h5>
                                <h5>CNI : {this.state.usager.CNI} </h5>
                                <h5>Adresse : {this.state.usager.adresse} </h5>
                                <h5>Téléphone : {this.state.usager.contact} </h5>
                                <h5>Date de Naissance : {this.state.usager.date_naissance} </h5>
                                <h5>Statut Matrimoniale : {this.state.statut_matrimoniale === 1 ? 'Célibataire' : this.state.statut_matrimoniale === 2 ? 'Marié' : 'Compliqué'} </h5>
                                <h5>Age : {this.state.usager.age} ans </h5>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" >Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
        )
    }
}