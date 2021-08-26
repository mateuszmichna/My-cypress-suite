var options = { year: 'numeric', month: 'long', day: 'numeric' };
const date = new Date()
const today_date_iso = new Date().toISOString().split('T')[0]
const today_date_locale = new Date().toLocaleDateString()
const today_date_locale_us = new Date().toLocaleDateString("en-US", options)
const yesterday_date_iso = new Date(date.setDate(date.getDate() - 1)).toISOString().split('T')[0]
const yesterday_date_locale = new Date(date.setDate(date.getDate() - 1)).toLocaleDateString()
const yesterday_date_locale_us = new Date(date.setDate(date.getDate() - 1)).toLocaleDateString("en-US", options)
const tommorow_date_iso = new Date(date.setDate(date.getDate() + 1)).toISOString().split('T')[0]
const tommorow_date_locale = new Date(date.setDate(date.getDate() + 1)).toLocaleDateString()
const tommorow_date_locale_us = new Date(date.setDate(date.getDate() + 1)).toLocaleDateString("en-US", options)
const month_later_date_iso = new Date(date.setMonth(date.getDate() + 31)).toISOString().split('T')[0]
const month_later_date_locale = new Date(date.setMonth(date.getMonth() + 1)).toLocaleDateString()
const month_later_date_locale_us = new Date(date.setMonth(date.getMonth() + 1)).toLocaleDateString("en-US", options)

export {today_date_iso, 
    today_date_locale, 
    today_date_locale_us, 
    yesterday_date_iso, 
    yesterday_date_locale, 
    yesterday_date_locale_us,
    tommorow_date_iso,
    tommorow_date_locale,
    tommorow_date_locale_us,
    month_later_date_iso,
    month_later_date_locale,
    month_later_date_locale_us}