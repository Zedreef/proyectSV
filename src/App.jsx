// Importamos useState para manejar estados en React
import { useState, useEffect } from "react";
// Importamos JSConfetti para mostrar confeti de emojis
import JSConfetti from 'js-confetti'

function App() {

  // instancia para manejar la animación
  const jsConfetti = new JSConfetti()
  // Estado para manejar el valor aleatorio
  const [randomValor, setRandomValor] = useState({})
  // Estado para controlar si una imagen se ha cargado
  const [imagenCargada, setImagenCargada] = useState(false);
  // Estado para manejar el tamaño dinamico del botón "Si"
  const [agrandar, setAgrandar] = useState(45)
  // Estado que indica si el usuario ha seleccionado "Si"
  const [valueSi, setValueSi] = useState(false)
  // Estado para manejar el tamaño del boton "No"
  const [achicar, setAchicar] = useState(45)
  // Estado para el tamaño de fuente del botón "No"
  const [fontSizeNo, setFontSizeNo] = useState(16); // Valor inicial en px
  const [posicionBotón, setPosicionBotón] = useState({ x: 0, y: 0 });
  const [timeoutMovimiento, setTimeoutMovimiento] = useState(null);

  // Lista de mensajes con imágenes que se muestran aleatoriamente
  let random = [
    {id: 1, description: "Di si por favor", img: "/1.gif"},
    {id: 2, description: "Piénsalo de nuevo.", img: "/2.gif"},
    {id: 3, description: "Vamos, atrévete a decir que sí.", img: "/3.gif"},
    {id: 4, description: "No tengas miedo.", img: "/4.gif"},
    {id: 5, description: "El que no arriesga no gana.", img: "/5.gif"},
    {id: 6, description: "Te hare sonreír.", img: "/6.gif"},
    {id: 7, description: "Te prometo que será inolvidable.", img: "/7.gif"},
    {id: 8, description: "No dejes que el miedo te detenga.", img: "/8.gif"},
    {id: 9, description: "Confía en el destino, nos está dando una señal.", img: "/9.gif"},
    {id: 10, description: "Confía en mí.", img: "/10.gif"},
    {id: 11, description: "Te olvidaras de tu Ex. 😉", img: "/11.gif"},
    {id: 12, description: "Puedo hacer esto todo el dia.", img: "/12.gif"},
    {id: 13, description: "¿Ya viste que el botón se hace mas pequeño?", img: "/13.gif"},
    {id: 14, description: "Hay mas gif.", img: "/14.gif"},
    {id: 15, description: "Los dos sabemos que si se puede.", img: "/15.gif"},
    {id: 16, description: "Mejor presiona el botón verde", img: "/16.gif"},
    {id: 17, description: "Error, intenta de nuevo", img: "/17.gif"},
    {id: 18, description: "No hay huevos para el si.", img: "/17.gif"}
  ]

  // Estado para controlar los mensajes restantes
  const [mensajesRestantes, setMensajesRestantes] = useState([...random]);

  useEffect(() => {
    moverBoton(); // Posición inicial aleatoria al cargar la app
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(moverBoton, 50); // Esperar a que termine el resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [achicar, agrandar]);

  // Genera una respuesta aleatoria y ajusta el tamaño del botón dinámicamente
  const randomResponse = () => {
    if (mensajesRestantes.length === 0) {
      // Reinicia la lista de mensajes si ya se mostraron todos
      setMensajesRestantes([...random]);
      return
    }

    // Genera un índice aleatorio
    let index = Math.floor(Math.random() * mensajesRestantes.length);

    // Obtiene el mensaje seleccionado y lo elimina de la lista
    const nuevoMensaje = mensajesRestantes[index];
    const nuevoMensajeRestantes = mensajesRestantes.filter((_, i) => i !== index);
    console.log("Mensaje seleccionado:", nuevoMensaje)

    // Actualiza los mensajes restantes
    setMensajesRestantes(nuevoMensajeRestantes);

    // Aumenta el tamaño del botón hasta un límite
    setAgrandar(prev => prev >= 500 ? prev : prev + 10);
    setAchicar(prev => {
     if (prev <= 8) return prev;
     setFontSizeNo(prevFont => (prevFont <= 15 ? 15 : prevFont - 1))
     return prev - 5;
    });
    // Actualiza el estado con el valor aleatorio
    setRandomValor(nuevoMensaje);
    setTimeout(moverBoton, 10);
  }

  const moverBoton = () => {
    if (timeoutMovimiento) clearTimeout(timeoutMovimiento); // Limpiar timeout anterior
    
    const nuevoTimeout = setTimeout(() => {
      const boton = document.getElementById('boton-no');
      if (!boton) return;
  
      const rect = boton.getBoundingClientRect();
      const margenSeguridad = Math.min(50, Math.max(20, rect.width * 0.15));
      
      const maxX = window.innerWidth - rect.width - margenSeguridad;
      const maxY = window.innerHeight - rect.height - margenSeguridad;
  
      setPosicionBotón({
        x: Math.max(margenSeguridad, Math.random() * maxX),
        y: Math.max(margenSeguridad, Math.random() * maxY)
      });
    }, 300); // 300ms de delay
  
    setTimeoutMovimiento(nuevoTimeout);
  };

  // Marca que la imagen ha sido cargada
  const handleImageLoad = () => {
    setImagenCargada(true);
  }

  return (
    <main id="canvas" className="fondo w-screen h-screen bg-no-repeat bg-cover flex items-center justify-center bg-center relative ">
      {
        // Condición para mostrar contenido antes y después de aceptar
        !valueSi ? (
          <div className="p-5">
            <h1 className="text-white font-bold text-5xl text-center">
              ¿Quieres ser mi San Valentin?
            </h1>
            <img src={Object.keys(randomValor).length === 0 ? "/quieres.gif" : randomValor.img} alt="San Valentin" className="mx-auto" width={400} height={400} />
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5 items-center">
              <button onClick={() => {
                setValueSi(true)
                setPosicionBotón({ x: 0, y: 0 });
                jsConfetti.addConfetti({
                  emojis: ['😍', '🥰', '❤️', '😘'],
                  emojiSize: 70,
                  confettiNumber: 80,
                })
              }} 
              className={`bg-green-500 text-white font-bold p-2 rounded-md text-xl h-${agrandar}`} 
              style={{ height: `${agrandar}px` }}>
                Si
              </button>
              <button 
                id="boton-no"
                className="bg-red-500 text-white font-bold p-2 rounded-md text-xl transition-all duration-300 fixed"
                onClick={randomResponse}
                disabled={imagenCargada}
                style={{ 
                  height: `${achicar}px`,
                  fontSize: `${fontSizeNo}px`,
                  left: `${posicionBotón.x}px`,
                  top: `${posicionBotón.y}px`,
                  minWidth: '80px',
                  padding: '0 12px',
                  lineHeight: '1.2',
                  touchAction: 'none',
                  userSelect: 'none',
                  zIndex: 1000,
                  transform: 'none'
                }}
                onMouseEnter={moverBoton} // Para desktop
                onTouchMove={moverBoton} // Para móviles
                >
                {Object.keys(randomValor).length === 0 ? "No" : randomValor.description}
                <span hidden>{document.title = Object.keys(randomValor).length === 0 ? "¿Quieres ser mi San Valentin?" : randomValor.description}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col space-y-10">
            <h1 className="text-4xl text-white font-bold">Sabia que dirías que si ❤️!</h1>
            <img src="/si.gif" alt="" className="mx-auto" />
            <span hidden>{document.title = 'Sabia que dirías que si ❤️!'}</span>
          </div>
        )
      }
    </main>
  )
}

export default App
