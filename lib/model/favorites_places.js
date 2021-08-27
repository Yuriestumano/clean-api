import mongoose from 'mongoose'
import mongooseTimeStamp from 'mongoose-timestamp'
import mongooseStringQuery from 'mongoose-string-query'

const FavoritePlacesScheme = new mongoose.Schema({
    latitude:String,
    longitude:String,
    tipo:String
})


FavoritePlacesScheme.plugin(mongooseTimeStamp)
FavoritePlacesScheme.plugin(mongooseStringQuery)
const model = mongoose.model('locais_favoritos', )
export default model