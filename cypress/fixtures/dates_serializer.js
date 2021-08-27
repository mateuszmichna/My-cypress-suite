//this function exists because of lack of consistency in date formatting

function ConvertDates(t) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
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
        "ISO": d.toISOString().split('T')[0],
        "locale": d.toLocaleDateString(),
        "locale_us": d.toLocaleDateString("en-US", options)
    }
  } 


export {ConvertDates}