import Cinema from '../model/cinema'

class CinemaRepository{
    public async getCinemaById(id:string):Promise<Cinema|null>{
        return  Cinema.findById(id).exec()
    }
}