require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const http = require("http")
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/question");
const chatRoutes = require("./routes/chat")

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// routes 
app.use("/api/user", userRoutes)
app.use("/api/questions", questionRoutes);
app.use("/api/chat", chatRoutes);

// create http server
const server = http.createServer(app);

//create socket.io server
const io = socketio(server);

// // handle socket.io events
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  // Handle incoming messages from the client
  socket.on("chat", (msg) => {
    io.sockets.emit("message", msg);
  })
  //   // Save the message to MongoDB using Mongoose
  //   const Message = mongoose.model("Message", { content: String });
  //   const message = new Message({ content: msg });
  //   message
  //     .save()
  //     .then(() => console.log("Message saved to MongoDB"))
  //     .catch((err) => console.log(err));

  //   // Broadcast the message to all connected clients
  //   io.emit("message", msg);
  // });

  // Handle disconnection events
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

//connect to db and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    server.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
