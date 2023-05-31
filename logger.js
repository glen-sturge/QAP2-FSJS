const { format } = require("date-fns");
// const { v4: uuid } = require('uuid');
const EventEmitter = require("events");
const path = require("path");
const fsP = require("fs").promises;

class Logger extends EventEmitter {
  listenForLog() {
    this.on("log", (url, notifyType, msg, clientIP) =>
      this.logEvents(url, notifyType, msg, clientIP)
    );
  }

  logEvents = async (url, notifyType, msg, clientIP) => {
    // Log the message to the console.
    console.log(`USER@${clientIP} : ` + msg);

    // time stamp to be included on each line of the log.
    const timeStamp = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;

    // formatted line for the log.
    const logItem = `${timeStamp}\t${clientIP}\t${notifyType}\t${url}\t${msg}\n`;
    //add in folder creation
    try {
      const fileName = `${format(new Date(), "yyy-MM-dd")}` + "_events.log";
      await fsP.appendFile(path.join(__dirname, "logs", fileName), logItem);
    } catch (error) {
      console.log("Problem encountered logging event: " + error);
    }
  };
}

module.exports = Logger;
