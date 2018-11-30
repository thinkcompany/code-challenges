import React, { Component } from 'react'
import Header from './components/Header/Header'
import styles from './App.sass'
import Form from './components/Form/Form'

export default class App extends Component {
  render () {
    return (
      <div className={styles.container}>
        <Header />
        <Form />
      </div>
    )
  }
}
