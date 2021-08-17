import '../styles/globals.css'
import App from 'next/app';
import React from 'react'
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
