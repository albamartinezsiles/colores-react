function Color({id,r,g,b,borrarColor}) {
    return(
    <li onClick={()=> borrarColor(id)} style={{backgroundColor: `rgb(${[r,g,b].join(",")})`}}>{r},{g},{b}</li> //os valores r, g, b se colocan en un array ([r,g,b]) y luego se unen en una cadena con comas
    )
}


export default Color
