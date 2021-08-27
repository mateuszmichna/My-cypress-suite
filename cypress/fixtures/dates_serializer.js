//this function exists because of lack of consistency in date formatting
var dateFormat = require("dateformat");

function ConvertDates(t) {;
    const d = new Date()
    if (t == 'tommorow') {
        d.setDate(d.getDate() + 1)} 
    else if (t == 'yesterday') {
        d.setDate(d.getDate() - 1)} 
    else if (t == 'month_later') {
        d.setMonth(d.getMonth() + 1)}
    else if (t == 'subscription_end') {
        d.setMonth(d.getMonth() + 1)
        d.setDate(d.getDate() - 1)} 
    return {
        "ISO": dateFormat(d, 'yyyy-mm-dd'),
        "locale": dateFormat(d, 'dd/mm/yyyy'),
        "locale_us": dateFormat(d, 'mmmm dd, yyyy')
    }
  } 


export {ConvertDates}