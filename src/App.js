import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const lsTravels = window.localStorage.getItem('travels');
  const storedTravels = (lsTravels && lsTravels !== null && lsTravels !== undefined && lsTravels !== '') ? JSON.parse(window.localStorage.getItem('travels')) : [];
  const [travels, addTravel] = useState(storedTravels);
  const [travelDate, setTravelDate] = useState('26/set/2020');
  const [material, setMaterial] = useState('pedra');
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    console.log(JSON.stringify(travels));
    window.localStorage.setItem('travels', JSON.stringify(travels))
  }, [travels]);

  function handleTravelDateChange(ev) {
    const value = ev.currentTarget.value;
    setTravelDate(value);
  }

  function handleWeightChange(ev) {
    const value = ev.currentTarget.value;
    setWeight(value);
  }

  function handleMaterialChange(ev) {
    const value = ev.currentTarget.value;
    setMaterial(value);
  }

  function handleSubmit(ev) {
    ev.preventDefault();

    addTravel([
      ...travels,
      {
      travelDate,
      material,
      weight
    }]);

    setTravelDate('27/set/2020');
    setMaterial('pedra');
    setWeight(weight)
  }

  return (
    <div className="App">
      <h1>Cargas:</h1>
      <ul>
      <li>
          <table>
            <thead>
              <tr style={{ textAlign: 'center'}}>
                <td>Data</td>
                <td>Material</td>
                <td>Kilos</td>
                <td>Valor</td>
              </tr>
            </thead>
          </table>
        </li>
        <li>
          <table>
            <tbody>
              {
                travels.map((travel, index) => {
                  const price = travel.material === 'pedra' ? 0.02130 : 0.019;
                  return(
                    <tr key={`travel-${index}`}>
                      <td>{travel.travelDate}</td>
                      <td>{travel.material}</td>
                      <td>{travel.weight}</td>
                      <td>R$ {Number(travel.weight * price).toFixed(2)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </li>
      </ul>
      <h2>
        Registrar viagem:
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>data</label>
          <input type="text" defaultValue={travelDate} onChange={handleTravelDateChange} />
        </div>
        <div className="form-group">
        <label>material</label>
        <select name="material" defaultValue={material} onChange={handleMaterialChange}>
          <option value="base">Base</option>
          <option value="pedra">Pedra</option>
          <option value="outros">Outros</option>
        </select>

        </div>
        <div className="form-group">
          <label>peso</label>
          <input type="text" name="weight" defaultValue={weight} onChange={handleWeightChange} />
        </div>

        <div className="form-group">
        <input type="submit" value="registrar" />
        </div>
      </form>
    </div>
  );
}

export default App;
