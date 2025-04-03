'use client'

import { useState } from 'react'

const InfoModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-white p-4 rounded-full shadow-lg hover:bg-gray-100 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Sobre Nosotros</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <p>
                Bienvenidos a nuestra cafetería, un lugar donde la calidad y el sabor se encuentran.
                Nuestro objetivo es ofrecer una experiencia gastronómica única con productos frescos
                y de la más alta calidad.
              </p>
              <div>
                <h3 className="font-semibold">Horario:</h3>
                <p>Lunes a Viernes: 8:00 - 20:00</p>
                <p>Sábados y Domingos: 9:00 - 21:00</p>
              </div>
              <div>
                <h3 className="font-semibold">Contacto:</h3>
                <p>Teléfono: 123-456-789</p>
                <p>Email: info@cafeteria.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InfoModal 