import React from 'react';
import axios from 'axios';
class Home extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            allCountries: [],
            name: "",
            particularCountry: [],
            type: "FULLNAME",
            render:'true'
        }
    }

     grid={
        width: '150px',
  height: '150px',
  margin: '50px',
  float: 'left'
    }
    box={
        width: '350px',
        height: '550px',
        margin: '30px',
        float: 'left', 
    }
    componentWillMount()
    {
        axios.get(`https://restcountries.eu/rest/v2/all`)
        .then(response => {
            this.setState({allCountries:response.data})
            console.log(this.state.allCountries)
        })
        .catch(error =>{
            console.log("error",error)
        })
    
    }
    viewCountry= (value) =>{
        // this.setState({render:false})
        console.log(value);
        axios.get(`https://restcountries.eu/rest/v2/name/${value}?fullText=true`)
        .then(response => {
            this.setState({particularCountry:response.data})
            console.log('particular country',this.state.particularCountry)
        })
        .catch(error =>{
            console.log("not added",error)
        })

      }
    senddata=event=>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleChange=event =>{
        this.setState({type:event.target.value});
        console.log('type',this.state.type)
      }
    submitform=event=>{
        event.preventDefault()
        console.log(this.state)
        this.setState({render:false})
        if (this.state.type == "CURRENCY") {
            axios
              .get(`https://restcountries.eu/rest/v2/currency/${this.state.name}`)
              .then((response) => {
                this.setState({particularCountry:response.data})
              });
          } else if (this.state.type == "LANGUAGE") {
            axios
              .get(`https://restcountries.eu/rest/v2/lang/${this.state.name}`)
              .then((response) => {
                this.setState({particularCountry:response.data})
              });
          } else if (this.state.type == "CAPITALCITY") {
            axios
              .get(`https://restcountries.eu/rest/v2/capital/${this.state.name}`)
              .then((response) => {
                this.setState({particularCountry:response.data})
              });
          } else if (this.state.type == "CALLINGCODE") {
            axios
              .get(`https://restcountries.eu/rest/v2/callingcode/${this.state.name}`)
              .then((response) => {
                this.setState({particularCountry:response.data})
              });
          } else if (this.state.type == "REGION") {
            axios
              .get(`https://restcountries.eu/rest/v2/region/${this.state.name}`)
              .then((response) => {
                this.setState({particularCountry:response.data})
              });
            }
              else{
        axios.get(`https://restcountries.eu/rest/v2/name/${this.state.name}?fullText=true`)
        .then(response => {
            this.setState({particularCountry:response.data})
            console.log('particular country',this.state.particularCountry)
        })
        .catch(error =>{
            console.log("not added",error)
        })
    }
    }
    render(){
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
  <a class="navbar-brand" href="/">CountryInfo</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown">
      <label>Search type</label>
            <select onChange={this.handleChange} value={this.state.type}>
            {/* <option value="FULLNAME">Enter type of search</option> */}
              <option value="FULLNAME" >FULL NAME</option>
              <option value="CURRENCY">CURRENCY</option>
              <option value="LANGUAGE">LANGUAGE</option>
              <option value="CAPITALCITY">CAPITAL CITY</option>
              <option value="CALLINGCODE">CALLING CODE</option>
              <option value="REGION">REGION</option>
            </select>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0" onSubmit={this.submitform}>
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.name} name="name" onChange={this.senddata} />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
<div>
{this.state.particularCountry.map((country)=>
                    <div style={this.box}>
                    <h3 class="h3-responsive">Name:{ country.name }</h3>
              <h5 class="h5-responsive">Region:{ country.region }</h5>
              <h5 class="h5-responsive">Capital:{ country.capital }</h5>
              <h5 class="h5-responsive">subregion:{country.subregion }</h5>
              <h5 class="h5-responsive">population:{ country.population }</h5>
              <h5 class="h5-responsive">area:{ country.area }</h5>
              <h5 class="h5-responsive">nativeName:{ country.nativeName }</h5>
              <h5 class="h5-responsive">callingCodes:{ country.callingCodes.join(",") }</h5>
              <h5 class="h5-responsive">timezones:{ country.timezones.join(",") }</h5>
              <h5 class="h5-responsive">currency:{ country.currencies[0].name }</h5>
              <h5 class="h5-responsive">currency symbol:{ country.currencies[0].symbol }</h5>
              <h5 class="h5-responsive">borders:{ country.borders.join(",") }</h5>
                  </div>
                )}
</div>
                
               {this.state.render && <div>
                {this.state.allCountries.map((country)=>
                    <div style={this.grid} value={country.name} onClick={() => this.viewCountry(country.name)}>
                    {/* <form onSubmit={this.viewCountry}> */}
                    <h3>Name:{country.name }</h3>
                    <h5>Region:{ country.region }</h5>
                    {/* <button class="btn btn-primary" type="submit">View Details</button> */}
                    {/* </form> */}
                  </div>
                )}
                </div>}
    
                </div>
            
        )
    }
}
export default Home;