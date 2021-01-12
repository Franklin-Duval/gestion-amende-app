import React from 'react'
import { BeatLoader } from 'react-spinners'
//import { BounceLoader } from 'react-spinners'

import API_URL from '../assets/constant'
import '../assets/css/amende.css'

export default class Amande extends React.Component{

    componentDidMount(){
        this.fetchAmende()
    }

    state = {
        isLoading: true,
        amende: [],
        nom_amende: "",
        description: "",
        prix: "",

        new_nom_amende: "",
        new_description: "",
        new_prix: "",
        
    }

    fetchAmende = () => {
        fetch(API_URL + 'amende/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                amende: responseJson,
                isLoading: false
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    handleSubmit = () => {
        console.log(this.state)
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
                <h1 className="text-center" style={{marginTop: 50, marginBottom: 30, fontFamily: 'Times New Roman'}}>Liste des Amendes en rigueur au Cameroun</h1>
                <div style={{marginBottom: 50, marginTop: 20}} >
                    <button type="button" className="ajouter col-md-12 text-center" data-toggle="modal" data-target="#modal" >Ajouter une Amende</button>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr className="table-row">
                            <th className="table-head" scope="col">#ID</th>
                            <th className="table-head" scope="col">Amende</th>
                            <th className="table-head" scope="col">Description</th>
                            <th className="table-head" scope="col">Pénalité (FCFA) </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.amende.map((item, index) => {
                                return(
                                    <tr className="table-row" key={index}>
                                        <td className="id">{item.id} </td>
                                        <td>{item.nom_amende} </td>
                                        <td>{item.desciption} </td>
                                        <td>{item.prix_penalite} </td>
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
                            <h5 className="modal-title" id="exampleModalLabel">Ajouter une Nouvelle Amende</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="nom">Nom de l'Amende</label>
                                    <input 
                                        type="text"
                                        className="form-control" id="nom"
                                        value={this.state.new_nom_amende}
                                        onChange={(event) => {
                                            this.setState({new_nom_amende: event.target.value})
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description" rows="3"
                                        value={this.state.new_description}
                                        onChange={(event) => {
                                            this.setState({new_description: event.target.value})
                                        }}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="penalite">Pénalité (FCFA)</label>
                                    <input 
                                        type="text"
                                        className="form-control" id="penalite"
                                        value={this.state.new_prix}
                                        onChange={(event) => {
                                            this.setState({new_prix: event.target.value})
                                        }}
                                    />
                                </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(event) => this.handleSubmit(event)}>Enregister</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}