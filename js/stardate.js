// Get todays star date
// Copyright 1996-2004 Stephen Pugh

function leapYear (InYear) {
	if ((InYear % 4 == 0) && ((InYear % 100 != 0) || (InYear % 400 == 0))) 
		{return true;}
	}

function starDate() {
	var todayDate = new Date();
	var InYear = todayDate.getYear();
	if (InYear < 1000) {InYear += 1900};
	var InMonth = todayDate.getMonth();
	var InDay = todayDate.getDate();
	var InHour = todayDate.getHours();
	var InMins = todayDate.getMinutes();
	var i = (leapYear (InYear) && InMonth == 1) ? 13 : InMonth;
	var InSecs = 0;
	var length = (leapYear (InYear)) ? 31622400 : 31536000;
	var InDate = Date.UTC(InYear, InMonth, InDay, InHour, InMins, InSecs);  
	var YearDate = Date.UTC(InYear, 0, 1, 0, 0, 0);
	var StarTime = ((InDate - YearDate) * 100  )/ length;
	StarTime = Math.floor(StarTime);
	StarTime = StarTime / 100;
	if (StarTime < 100) {
		if (StarTime < 10) {StarTime = "00" + StarTime}
		else {StarTime = "0" + StarTime}
		}
	var StarYear = InYear - 2323;
	if (StarYear >= 0) {var token = true}
		else {var token = false}
	StarYear = Math.abs(StarYear);
	var StarYear2 = StarYear - 377;
	StarYear2 = Math.abs(StarYear2);
	if (StarYear < 10) {StarYear = "0" + StarYear} 
	if (token == false) {StarDate = "-" + StarYear + StarTime}
	else {StarDate = "" + StarYear + StarTime}
	var StarDate2 = "" + StarYear2 + StarTime;
	return StarDate;
}

