const isEmpty = require("./empty/isEmpty")
const isDigit = require("./string/isDigit")
const isLowercase = require("./string/isLowercase")
const isUppercase = require("./string/isUppercase")
const isSpecial = require("./string/isSpecial")
const isAlpha = require("./string/isAlpha")
const isAlphaNumeric =  require("./string/isAlphaNumeric")
const isNumeric = require("./string/isNumeric")
const isFloat = require("./string/isFloat")

const isUsername = require("./user/isUsername")
const isEmail = require("./user/isEmail")

const isFirstname = require("./user/isFirstname")
const isLastname = require("./user/isLastname")
const isPassword = require("./user/isPassword")

const generate = require("./user/PasswordGenerator")
const download = require("./image/downloadImage")

const isSort = require("./movieFilter/isSort")
const isCategory = require("./movieFilter/isCategory")
const isPage = require("./movieFilter/isPage")
const isTitle = require("./movieFilter/isTitle")

module.exports = {
    isEmpty, isDigit, isLowercase, isUppercase, isSpecial,
    isAlpha, isAlphaNumeric, isNumeric, isFloat, isUsername,
    isEmail,  isFirstname, isLastname, isPassword,
    isSort, isCategory, isPage, isTitle,
    generate, download,
};