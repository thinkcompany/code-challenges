import trainImage from '../public/images/Septa_sideview.jpg';
import styles from "./styles/App.module.css";

function App() {
  return (
    <div className={styles.body}>
      <nav></nav>
      <img 
        className={styles.trainImage} 
        src={trainImage} 
        alt="A sideview of a regional rail train." 
      />
      <h1>SEPTA Regional Rail Fare</h1>
      <div>
        <div><p>i</p></div>
        <p>A 10% discount applies at checkout when you purchase 10 or more rides.</p>
      </div>
      <section>
        <form>
          <div></div>
          <button></button>
          <button></button>
        </form>
      </section>
      <h2>Map</h2>
      <h2>Prices</h2>
    </div>
  );
}

export default App;
