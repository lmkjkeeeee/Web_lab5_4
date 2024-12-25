import React, { useState } from "react";
import axios from "axios";

// Перелік зображень металів
const metals = [
  { id: "gold", name: "Золото", image: "/images/gold.png" },
  { id: "silver", name: "Срібло", image: "/images/silver.png" },
  { id: "platinum", name: "Платина", image: "/images/platinum.png" },
];

function App() {
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [rate, setRate] = useState(null);

  const fetchMetalRate = async (metalId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/metals/${metalId}`);
      console.log("Дані з сервера:", response.data); // Додано логування
      setRate(response.data.rate ? `${response.data.rate}` : "Дані не знайдені");
    } catch (error) {
      console.error("Помилка отримання курсу:", error.response || error.message); // Детальніше логування
      setRate("Помилка завантаження даних");
    }
  };
  
  
  

  const handleMetalClick = (metal) => {
    setSelectedMetal(metal.name);
    fetchMetalRate(metal.id);
  };

  return (
    <div>
      <h1>Курс банківських металів</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {metals.map((metal) => (
          <div
            key={metal.id}
            onClick={() => handleMetalClick(metal)}
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <img src={metal.image} alt={metal.name} width="100" />
            <p>{metal.name}</p>
          </div>
        ))}
      </div>
      {selectedMetal && (
        <div>
          <h2>Обраний метал: {selectedMetal}</h2>
          <p>Курс: {rate}</p>
        </div>
      )}
    </div>
  );
}

export default App;
