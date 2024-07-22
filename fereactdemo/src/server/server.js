const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());

const config = {
  user: "sa",
  password: "0335572988",
  server: "your_server",
  database: "EBSITE_BAN_GIAY",
  options: {
    encrypt: true, // Sử dụng nếu SQL Server của bạn yêu cầu kết nối mã hóa
  },
};

sql
  .connect(config)
  .then((pool) => {
    if (pool.connected) {
      console.log("Connected to SQL Server");
    }

    app.get("/api/products", async (req, res) => {
      try {
        const result = await pool.request().query("SELECT * FROM Products");
        res.json(result.recordset);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      }
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
