import { useState, useEffect } from 'react'
import Formulario from './Formulario.jsx'
import Color from './Color'
//import './index.css'


function Colores() { //funcion de un componente llamado colores

    let [colores,setColores] = useState([]) //crea colores y la funcion para cambiarlos. El estado inicial es vacio
    //se usan [ ] porque devuelve un array con dos elementos. el primero en colores y setColores el segundo

    useEffect(() => {
        //aqui van las llamadas a las apis. Se usa para ejecutar código despues de que react haya recargado la pagina
            fetch("https://api-colores-full-wbzb.onrender.com/colores")
            .then(respuesta => respuesta.json())
            .then(respuesta => { 
                setColores(respuesta) //le damos el valor de respuesta a colores!!!!
            });
    }, [])

    function crearColor(color){ //coge el color
        setColores([...colores,color]) //y añadelo a colores
    }


    function borrarColor(id){
        fetch("https://api-colores-full-wbzb.onrender.com/borrar/" + id, {
            method : "DELETE"
            })
            .then(respuesta => respuesta.json())
            .then(({resultado}) => {
                if(resultado == "ok"){
                    return setColores(colores.filter(color => color.id != id))
                }
                console.log("error usuario")
            })
    }


    return( //lo visual

        //a color le pasamos id,r,g,b. Se podria haber puesto Color.r Color.g Color.b 
 <>
    <Formulario crearColor={crearColor} /> 
    <ul>
    
    { colores.map(({id,r,g,b}) => <Color key={id} id={id} r={r} g={g} b={b} borrarColor={borrarColor} />) } 
    
    </ul>
</>
    )//tomamos cada color de la lista colores y lo mostramos con el componente Color
    //es decir, me va a pintar un color por cada ({id,r,g,b}) que se encuentre.
    //tiene la funcion borrarColor porque es el ul lo que se borra. El formulario es el que crea los colores
    //usas el formulario para hacer nuevos colores y borrar en cada color porque cada color tiene su "boton borrar"
}

export default Colores
