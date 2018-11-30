import React from 'react'
import logo from './imgs/logo.png'
import styles from './Header.sass'

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.img} src={logo} alt='Septa Regional Rail Fares' />
    </header>
  )
}

export default Header
