import React from 'react'
import '../assets/css/infraction.css'
import API_URL from '../assets/constant'
import user from '../assets/images/User.png'

export default class Infraction extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            // Data
            cni: "",
            user: '',
            matricule: '',
            infractions: [],
            amendes: [],
            policiers: [],
            amende_choisie: "",
    
            // States
            infrac_is_loading: false,
            cni_is_found: true,
            user_is_loading: false,
            user_is_loaded: false,
            list_is_loading: false,
            searching: false,
            amendes_is_loading: true,
    
        } 
        this.res = ''
    }

    componentDidMount() {
        // Charger la liste des amendes
        fetch(API_URL + 'amende/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            this.setState({
                amendes: responseJson,
                amendes_is_loading: false,
            })
        })
        .catch((error) =>{
            console.log(error)
        })

        // Charger la liste des policiers
        fetch(API_URL + 'policier/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('policiers', responseJson)
            this.setState({
                policiers: responseJson,
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    handleTypeCNI = (event) => {
        if (event.code === 'Enter') {
            console.log("searching user info by CNI..." + this.state.cni)
            this.setState({
                user_is_loading: true,
            })
            fetch(API_URL + 'getuser/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'CNI': this.state.cni,
                })
    
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('user fetched by cni...', responseJson)
                this.setState ({
                    user: responseJson,
                    matricule: responseJson.matricule,
                    user_is_loading: false,
                    user_is_loaded: true,
                })
                this.loadInfractionList()
            })
            .catch((error) =>{
                console.log(error)
                this.setState({
                    cni_is_found: false,
                })
            })
        }
    }

    reload = () => {
        this.setState({ user_is_loading: true })
            fetch(API_URL + 'getuser/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'matricule': this.state.matricule,
                })
    
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('user fetched by matricule...', responseJson)
                this.setState ({
                    user: responseJson,
                    cni: responseJson.CNI,
                    user_is_loading: false,
                    user_is_loaded: true,
                })
                this.loadInfractionList()
            })
            .catch((error) =>{
                console.log(error)
            })
    }

    handleTypeMatricule = (event) => {
        if (event.code === 'Enter') {
            console.log("searching user info by matricule..." + this.state.matricule)
            this.reload();
        }
    }

    loadInfractionList() {
        this.setState({list_is_loading: true})
        fetch(API_URL + 'infraction/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
        .then((response) => response.json())
            .then((responseJson) => { 
            let infractionsL = []
            for (let inf of responseJson) {   
                if (this.state.user.id_usager === Number(inf.fuyard.split('/')[5])) {
                    let amende = Number(inf.amende.split('/')[5])
                    let policier = Number(inf.policier.split('/')[5])
                    let amende_found = false
                    let policier_found = false
                    let i = 0
                    while (!amende_found && i < this.state.amendes.length) {
                        if (this.state.amendes[i].id === amende) {
                            amende = this.state.amendes[i]
                        }
                        i += 1
                    }
                    i = 0
                    while (!policier_found && i < this.state.policiers.length) {
                        if (this.state.policiers[i].id === policier) {
                            policier = this.state.policiers[i]
                        }
                        i += 1
                    }
                    inf.amende = amende.nom_amende
                    inf.policier = policier.nom + " " + policier.prenom
                    
                    console.log(inf)
                    infractionsL.push(inf)
                } 
            }
            console.log(infractionsL)
            this.setState ({
                infractions: infractionsL,
                list_is_loading: false,
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    handleCreateInfraction = (event) => {
        fetch(API_URL + 'infraction/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'fuyard': API_URL + 'fuyard/' + this.state.user.id_usager + '/',
                'amende': '/api/amende/' + this.state.amende_choisie.id + '/',
                'policier': API_URL + 'policier/' + 2 + '/',
                'lieux': "Essos",
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            alert("Infraction enregistrée!")
            this.reload()
        })
        .catch((error) =>{
            console.log(error)
        })
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
                                <input
                                    type="number"
                                    className="form-control"
                                    value={this.state.cni}
                                    onChange={(event) => { this.setState({cni: event.target.value}) }}
                                    onKeyDown={this.handleTypeCNI} />
                            </div>
                        </div>
                        <div className="btn-group col-3">
                            <button className="btn btn-primary mr-4" data-toggle="modal" data-target="#modal" disabled={!this.state.user_is_loaded}>
                                Enregistrer une infraction
                            </button>
                            <button className="btn btn-primary" disabled={!this.state.user_is_loaded}>
                                Imprimer
                            </button>
                        </div>
                    </div>
                    
                    
                </div>

                <div className="card-deck ml-2 mr-2 mb-4">
                    <div className="card col pl-0 pr-0 ">
                        <div className="card-header"> Fautif </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                <span className="input-group-text">Matricule du véhicule</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.matricule}
                                    onChange={(event) => { this.setState({matricule: event.target.value}) }}
                                    onKeyDown={this.handleTypeMatricule}
                                />
                            </div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <span className="input-group-text">No Carte Grise</span>
                                </div>
                                <input type="text" className="form-control" value={this.state.user.carte_grise} readOnly/>
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
                                <img src={user} style={{width: 100, height: 100, borderRadius: 50}} className="rounded" alt="introuvable!"/>
                            </div>

                            <div className="form col">
                                <input type="text" className="form-control mb-3" id="name" placeholder="Nom" name="name" value={this.state.user.nom} readOnly/>
                                <input type="text" className="form-control mb-3" id="surname" placeholder="Prénom" name="surname" value={this.state.user.prenom} readOnly/>
                                <input type="text" className="form-control mb-3" id="Address" placeholder="Addresse" name="address" value={ this.state.user.adresse } readOnly/>
                                <input type="text" className="form-control mb-3" id="tel" placeholder="Téléphone" name="tel" value={this.state.user.contact} readOnly/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card ml-4 mr-4 pl-0 pr-0">
                    <div className="card-header"> Liste des infractions </div>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr className="table-row">
                                    <th className="table-head" scope="col">#ID</th>
                                    <th className="table-head" scope="col">Amende</th>
                                    <th className="table-head" scope="col">Policier</th>
                                    <th className="table-head" scope="col">Date</th>
                                    <th className="table-head" scope="col">Lieu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list_is_loading
                                    ?
                                        <div className="spinner-border text-primary align-self-center" />
                                    :
                                    this.state.infractions.map((inf) => {
                                        return(
                                            <tr className="table-row" key={inf.id}>
                                                <td className="id">{inf.id} </td>
                                                <td> {inf.amende } </td>
                                                <td> {inf.policier} </td>
                                                <td> {inf.date.slice(0, 21).replace('T', ' -Hr- ')} </td>
                                                <td> {inf.lieux} </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal CNI invalide */}
                <div className="modal fade" id="modal-invalid-cni">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">CNI Introuvable!</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <p className="text-center">L'individu possédant cette CNI n'a pas été enregistré dans le système.</p>
                            </div>

                        </div>
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
                                
                                <p>Choisir l'amende à coller : </p>
                                {this.state.amendes_is_loading &&
                                    <div className="spinner-border text-primary"></div>
                                }
                                <select
                                    className="dropdown"
                                    name="amendes"
                                    id='amendes'
                                    onChange={(event) => this.setState({
                                        amende_choisie: JSON.parse(event.target.value),
                                        amendes_is_loading: false,
                                    }) }
                                >
                                    {!this.state.amendes_is_loading && 
                                        this.state.amendes.map((elt) => {
                                            return(
                                                <option value={JSON.stringify(elt)} key={elt.id}>{elt.nom_amende}</option>
                                            )
                                        })
                                    }
                                </select>

                                <p className="infraction-number mt-4">
                                    Montant : {this.state.amende_choisie === "" ? 0 : this.state.amende_choisie.prix_penalite} XAF
                                </p>
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