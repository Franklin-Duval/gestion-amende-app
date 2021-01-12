import React from 'react'
import '../assets/css/infraction.css'

export default class Infraction extends React.Component{

    state = {
        // Data
        cni: undefined,
        matricule: '',
        name: '',
        surname: '',
        address: '',
        tel: '',
        infractions: [],
        amendes: [],
        amende_choisie: undefined,

        // States
        infrac_is_loading: false,
        infos_is_loading: false,
        list_is_loading: false,
        searching: false,
    }

    componentDidMount() {
        
    }

    handleTypeCNI = (event) => {
        if (event.code === 'Enter') {
            this.setState({
                matricule: 'EN 845 FR',
                name: 'Talom',
                surname: 'Franklin Duval',
                address: 'Nkolmesseng',
                tel: '658 95 45 85',
                cni: event.target.value,
            })
        }
    }

    handleTypeMatricule = (event) => {
        this.setState({matricule: event.target.value})
    }

    handleCreateInfraction = (event) => {
        console.log("amende enregistrée")

    }


    render(){
        return (
            <div className="col" >
                
                <div className="card m-4">
                    <div className="card-body row">
                        <div className="col-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">CNI</span>
                                </div>
                                <input type="number" className="form-control" onKeyDown={this.handleTypeCNI} />
                            </div>
                        </div>
                        <div className="btn-group col-3">
                            <button className="btn btn-primary mr-4" data-toggle="modal" data-target="#modal">
                                Enregistrer une infraction
                            </button>
                            <button className="btn btn-primary">
                                Imprimer
                            </button>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="card-deck ml-2 mr-2 mb-4">
                    <div className="card col pl-0 pr-0 ">
                        <div className="card-header"> Fautif </div>
                        <div className="card-body">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text">Matricule du véhicule</span>
                                </div>
                                <input type="text" className="form-control" value={this.state.matricule} onChange={this.handleTypeMatricule}/>
                            </div>
                            <p className="infraction-number mt-4">
                                {this.state.infractions.length} Infractions
                            </p>
                        </div>
                        
                    </div>

                    <div className="card col pl-0 pr-0">
                        <div className="card-header"> Informations </div>
                        <div className="card-body row">
                            <div className="col-3">
                                <img src="../assets/images/User.png" className="rounded" alt="introuvable!"/>
                            </div>

                            <div className="form col">
                                <input type="text" className="form-control mb-3" id="name" placeholder="Nom" name="name" value={this.state.name} readOnly/>
                                <input type="text" className="form-control mb-3" id="surname" placeholder="Prénom" name="surname" value={this.state.surname} readOnly/>
                                <input type="text" className="form-control mb-3" id="Address" placeholder="Addresse" name="address" value={ this.state.address } readOnly/>
                                <input type="text" className="form-control mb-3" id="tel" placeholder="Téléphone" name="tel" value={this.state.tel} readOnly/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card ml-4 mr-4 pl-0 pr-0">
                    <div className="card-header"> Liste des infractions </div>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        0
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal Enregistrer une infraction */}
                <div className="modal fade" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Coller une amender</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <p>Put a dropdown of amendes here...</p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleCreateInfraction}>Enregistrer</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}