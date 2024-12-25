const express = require("express");
const app = express();
const cors = require("cors");

const port = 5000;

app.use(cors());

// Статичні дані про курси металів
let metalRates = {
  gold: { name: "Gold", rate: 1800 },        // Курс золота
  silver: { name: "Silver", rate: 25 },     // Курс срібла
  platinum: { name: "Platinum", rate: 950 } // Курс платини
};

// Маршрут для отримання курсу металу
app.get("/api/metals/:metal", (req, res) => {
  const metal = req.params.metal.toLowerCase(); // Отримуємо назву металу з параметра URL
  const rate = metalRates[metal];              // Шукаємо відповідний курс
  if (rate) {
    res.json({ success: true, metal: rate.name, rate: `${rate.rate} USD` });
  } else {
    res.status(404).json({ success: false, message: "Metal not found" });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Metals API running at http://localhost:${port}`);
});
