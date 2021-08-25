export const ADDRESS = {
    lat: Number,
    long: Number,
    obs: String,
    city: String,
    receipt: {
        number: String,
        url: String,
        ref: String
    },
    _type: String,
    state: String,
    number: String,
    street: String,
    zipcode: String,
    reference: String,
    complement: String,
    neighborhood: String,
}

export const Docs = {
    number: String,
    url: String,
    ref: String,
}

export const NameValue = {
    name: String,
    value: String,
}

export const Users_ = {
    _id: String,
    name: String,
    email: String,
    date: {
        type: Date,
        default: new Date()
    }
}