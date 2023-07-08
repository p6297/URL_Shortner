require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const UrlRouter = require("./routes/UrlRouter");
const URL = require("./models/Url");
const {ConnectDB} = require("./config/DbConnection");
 const app = express();

app.use(morgan("tiny"));
app.use(express.json());

ConnectDB(process.env.DB_URL)
.then(()=> console.log("DB Connected"))
.catch((err)=> console.log(err.message))

const PORT = process.env.PORT || 8000;

app.use("/url",UrlRouter);

/* app.get("/:shortId",async(req,res)=> {
    const shortId = req.params.shortId;
   try {
    const finalEntry = await URL.findOneAndUpdate({
        shortId
   }, {
    $push : {
        visitHistory : {
        timestamps: Date.now(),
        },
    },
   })
   if (finalEntry) {
    res.redirect(finalEntry.redirectUrl);
  } else {
    res.status(404).send("URL not found");
  }
   } catch (error) {
    res.status(500).send(error.message);
    
   }
}) */

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    try {
      const finalEntry = await URL.findOneAndUpdate(
        { shortId },
        {
          $push: {
            visitHistory: {
              timestamps: Date.now(),
            },
          },
        }
      );
      if (finalEntry) {
        res.redirect(finalEntry.redirectUrl);
      } else {
        // Handle the case when finalEntry is null
        res.status(404).send("URL not found");
      }
    } catch (error) {
      // Handle any errors that occurred during the database operation
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  






app.listen(PORT,()=> {
    console.log(`Server is running on : ${PORT}`);
})