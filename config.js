const { Sequelize } = require("sequelize");
const fs = require("fs");
require("dotenv").config();
const toBool = (x) => x === "true";
const DATABASE_URL = process.env.DATABASE_URL || "./assets/database.db";
module.exports = {
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  LOGS: toBool(process.env.LOGS) || true,
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  SESSION_ID: process.env.SESSION_ID ||null,
  LANG: process.env.LANG || "EN",
  AUTH_TOKEN: "",
  HANDLERS:
    process.env.HANDLER === "false" || process.env.HANDLER === "null"
      ? "^"
      : "[#]",
  RMBG_KEY: process.env.RMBG_KEY || false,
  BRANCH: "main",
  WARN_COUNT: 3,
  PACKNAME: process.env.PACKNAME || "X-Asena",
  WELCOME_MSG: process.env.WELCOME_MSG || "Hi @user Welcome to @gname",
  GOODBYE_MSG: process.env.GOODBYE_MSG || "Hi @user It was Nice Seeing you",
  AUTHOR: process.env.AUTHOR || "X-Electra",
  SUDO:
    process.env.SUDO || "918113921898,919598157259,918590508376,919383400679",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  OWNER_NAME: process.env.OWNER_NAME || "Neeraj-X0",
  HEROKU: toBool(process.env.HEROKU) || false,
  BOT_NAME: process.env.BOT_NAME || "X-Asena",
  AUTO_READ: toBool(process.env.AUTO_READ) || false,
  AUTO_STATUS_READ: toBool(process.env.AUTO_STATUS_READ) || false,
  PROCESSNAME: process.env.PROCESSNAME || "x-asena",
  WORK_TYPE: process.env.WORK_TYPE || "private",
  SESSION_URL: process.env.SESSION_URL || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUtjbHRFTkdjei9SODcxZU1hczNDTGw5ZEdBSlp1OElXMmNUcmpjM1ZWRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWwwaFd4MW54NFRLeVU1S0U5U0xrczZuNElPakpCM3FOUzlFL2xGL2h6Zz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrT1dqcEM3NVd2SlFVZzJlWkpzREMvNmVkU3M0NzdLbUY4YTRTMnR4d0V3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsMFZrdFlJcFNvTER4c3M1S2wrWW9XTy9OT2FIRVFXa1A3Wnhrb204QUQ4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtQRzJVYkdkeWRORHV5a1RTWE41N3RVZzVCM1ZHcGZxcjFIRm9TZHV5MmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhSelg5VzRuVlgxV0ZnUEdNWk1CZ05xOHlDVDgzdWZKaXpUVjQrYU56bWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUFDNzhTbjREQ3JQd09EN2hhUTVyV3FQRWxMUDN2VzVVclpROTV4blQzYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUgydWtFYTAzNTJOU05qRU56VDRrWHRQaE1wdWpDeE9xcmxmblF4MmZVMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlUvd3JJcHdXaEt1V0liclM3eWJFcVVQNkhMRnp2ZjNhUXNrdDJ3NXVhS1hjelVHQzZPVUNCYXZzMUNrNkxFblpleTBtTFo5VjFvVjVZRG9YbHRLV2pnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgwLCJhZHZTZWNyZXRLZXkiOiJHZE1YNXdjYzRBb3BYaWh4RUFvRjlBTTU3VGo0NzFZT1NGRHg0YWlmTzNnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJtRnJXbUlaRlM0eW0xcnd4VGhBNk5RIiwicGhvbmVJZCI6ImZlMjJlYzQzLWZjNDItNGQ3Mi1hNzExLWVjMTI5ODAzYjc3NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVUzd3ZktBanhHVkh0OVN1c0xkOStTYWtmSHM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2V2blAyaEt0dWlIb3hyVVdFY1VvN2pURkRJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJNN005NTk2IiwibWUiOnsiaWQiOiIyMzQ5MTEyMTcxMDc4OjE3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkRhZGR5IEhha2kifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l2dDc5d0ZFSXIycXJnR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjR3NzB2UTg1WnUyL3pYNmdRVWtEN0tHdWU4bEYyUlNvSk05YkVSb0dyRmM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IklDZ2pJSmlZVTNURkFtMFp1WUpiK2d2YVJtaTdlUThzV2EyelBnM1NJVXJJRzZ2V1h0RnE1ZVdVN2lBTHphNDFta2JuMEhYdy9qWHNYN3ZSWWNhNEF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJXZDVpSDE5ekJZQ3laRG1FdXgzLzlkbTNjZmZJdy9SVk9kUWMvblhWaGRiSks4eXh4Nlp4LzhCQUN3Rkp3Z0tWYk1KOXZNQ2MzMHFYb2E5YWR0dkNnQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxMTIxNzEwNzg6MTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZU1POUwwUE9XYnR2ODErb0VGSkEreWhybnZKUmRrVXFDVFBXeEVhQnF4WCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyODc1NjUwNCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFIdXAifQ==",
  DELETED_LOG: toBool(process.env.DELETED_LOG) || false,
  DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
  REMOVEBG: process.env.REMOVEBG || false,
  DATABASE_URL: DATABASE_URL,
  STATUS_SAVER: toBool(process.env.STATUS_SAVER) || true,
  DATABASE:
    DATABASE_URL === "./assets/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
