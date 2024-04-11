import React from 'react'

function Layout({ children }) {
  return (
    <div className="bg-gradient-to-r from-cyan-200 via-green-100 to-sky-200 h-screen">
      {children}
    </div>
  )
}

export default Layout