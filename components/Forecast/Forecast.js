import classes from './Forecast.module.css'
import React,{useState} from 'react'
import Conditions from '../Conditions/Conditions.js'


    const Forecast =() =>{
        let[city, setCity]= useState('')
        let[unit,setUnit] = useState('imperial');
        let [responseObj,setResponseObj] = useState({})
        const uriEncodedCity = encodeURIComponent(city)
        let[error, setError] = useState(false)
        let[loading, setLoading] = useState(false)



        function getForecast(e){
            e.preventDefault();
            if(city.length===0){
                return setError(true)
            }

            setError(false);
            setResponseObj({})
            setLoading(true);

            fetch(`https://community-open-weather-map.p.rapidapi.com/weather??units=${unit}&q=${uriEncodedCity}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "5ee0ec1586msh187a78f8fea20bdp1322d4jsn07d685aa1f46",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
    })
.then(response=>response.json())
.then(response=>{
    setResponseObj(response)
    if(response.cod!==200){
        throw new Error()
    }
    setResponseObj(response)
    setLoading(false)

})           
    .catch(err=>{
        setError(true)
        setLoading(false)
        console.log(err.message)
    })


}
    
        return(
            <div>
                <h2>Find Current Weather Conditions</h2>
               <form onSubmit={getForecast}>
                   <input 
                   type= "text"
                   placeholder ="Enter City"
                   maxLength ="50"
                   className={classes.textInput}
                   value= {city}
                   onChange={(e) => setCity(e.target.value)}
                   />
                   <label className={classes.Radio}>
                       <input 
                       type = "radio"
                       name= "units"
                       checked ={unit === "imperial"}
                       value= "imperial"
                       onchange ={(e)=> setUnit(e.target.value)}
                       />Fahrenhiet

                   </label>
                   <label className={classes.Radio}>
                       <input
                       type = "radio"
                       name ="units"
                       checked ={unit === "metric"}
                       value= "metric"
                       onChange={(e)=> setUnit(e.target.value)}
                       />
                       Celcius
                   </label>
                   <button className={classes.Button} type="submit">Get ForeCast</button>
                   </form>
                <Conditions 
                responseObj={responseObj}
                error ={error}
                loading ={loading}
                />
            </div>

        )
    }
    
    export default Forecast