import { useState } from 'react'

function Formulario({crearColor}) { //recibe una prop. Es la única forma de pasarle datos de padres a hijos. crearColor es una funcion que se le pasa a Formulario (su padre)

	let [textoInput,setTextoInput] = useState("")
	let [error,setError] = useState(false)
	let [msgError,setMsgError] = useState("")

  return ( //con el return devolvemos el jsx que va a conformar la UI
    <form onSubmit={ evento => { //onSubmit es una forma de manejar las acciones de envio del formulario
		evento.preventDefault() //evita que la página se recargue cuando hacemos click en enviar

		setError(false) //el error no existe

		let valido = /^([0-9]{1,3},){2}[0-9]{1,3}$/.test(textoInput) //valido es true si textoInput coincide con la expresion regular

		if(valido){ //el if implica que entra por aqui si es true y por else si es falso

			let [r,g,b] = textoInput.split(",").map(n => Number(n)); //lo divide por numeros individuales. Estos numeros son string, asi que los convertimos en numeros. usando el let [ r,g,b ] lo que hace es asignar cada elemento a cada una de las variables. Realmente lo que hacemos es pasar los string a numeros

			[r,g,b].forEach( n => valido = valido && n <= 255 ) //si alguno de los numeros es falso se establecera como false. 

			if(valido){ //si el codigo sigue siendo valido entonces se entra aqui
				return fetch("https://api-colores-full-wbzb.onrender.com/crear-color",{
							method : "POST",
							body : JSON.stringify({r,g,b}), //enviamos {r,g,b}
							headers : {
								"Content-type" : "application/json"
							}
						})
						.then(respuesta => respuesta.json())
						.then(({error,id}) => { //esperamos un error y el id. Lo sabemos por la api
							if(!error){
								crearColor({id,r,g,b}) //formulario sabe que existe esta funcion porque se la pasamos como una prop
								return setTextoInput("")
							}
							console.log("error a usuario")
						})
			}

			setMsgError("deben ser tres números entre 0 y 255")
			return setError(true)
			
		}

		setMsgError("formato inválido")
		setError(true)

	} }>
		<input type="text" placeholder="rrr,ggg,bbb" value={textoInput} onChange={ evento => setTextoInput(evento.target.value) } />
		<p className={ `error ${ error ? "visible" : "" }` }>{ msgError }</p> 
		<input type="submit" value="crear color" />
	</form>
  )
  //a p se le pone la clase visible si error es true. Si no se le pone no se le ve porque por defecto está escondido en css
}

export default Formulario
