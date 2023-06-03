

class AppUtility{
    timeStamp (){
        let Dates= new Date ()
        let year=Dates.getFullYear()
       let month=Dates.getMonth()
        let day=Dates.getDay()
        let time=Dates.toLocaleTimeString()

        let date= year +"/ "+month+"/ "+day+"  -"+" Time"+": "+time
        return date

    }
}

export default new AppUtility;