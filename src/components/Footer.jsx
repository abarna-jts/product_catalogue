import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-teal-400 w-full z-50'>
      <div className='flex justify-center p-3 flex-col'>
        <p className='text-lg text-center'>Dynamic Product Catalog Application. All rights Reserved</p>
        <p className='mt-3 text-center text-sm'>Designed and Developed by
          <a href="https://www.jorim.in" target='_blank' rel="noreferrer" className='hover:text-teal-700'> Jorim Technology Solutions</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer