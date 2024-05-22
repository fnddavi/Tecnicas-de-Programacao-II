import mongoose, { Schema } from "mongoose";
const uriLocal = "mongodb://localhost:27017/tecnicas"

connect()

const UserSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    user_cpf: { type: String, required: true, validate: { validator: isValidCPF }, maxLength: [11, "max 50 caracteres"] },
    user_nome: { type: String, required: true, maxLength: [50, "max 50 caracteres"] },
    user_fone: { type: String, required: true, maxLength: [50, "max 11 caracteres"] },
    user_email: { type: String, required: true, maxLength: [50, "max 100 caracteres"] },
    user_usuario: { type: String, required: true, maxLength: [25, "max 25 caracteres"] },
    user_password: { type: String, required: true, select: false, maxLength: [25, "max 25 caracteres"] },
    user_created_at: { type: Date, default: Date.now },
    user_updated_at: { type: Date }

});

const EstadoSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    est_sigla: { type: String, required: true, maxLength: [2, "max 2 caracteres"] },
    est_nome: { type: String, required: true, maxLength: [45, "max 45 caracteres"] },
    est_ibge: { type: Number, required: true, maxLength: [20, "max 20 caracteres"] },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }

});


const CidadesSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    cid_nome: { type: String, required: true, maxLength: [45, "max 45 caracteres"] },
    cid_ibge: { type: Number, required: true, maxLength: [20, "max 20 caracteres"] },
    estado: { type: mongoose.Schema.Types.ObjectId, ref: 'estado', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }

});


const AoiSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    aoi_cid_id: { type: mongoose.Schema.Types.ObjectId, ref: 'cidade', required: true },
    aoi_user_id: { type: Number, required: true },
    area_km2: { type: Number },
    geom: {
        type: {
            type: String,
            enum: ['Point', 'LineString', 'Polygon'],
        },
        coordinates: {
            type: [Number],
        },
    }, created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }

});

const UserModel = mongoose.model("user", UserSchema)
const EstadoModel = mongoose.model("estado", EstadoSchema)
const cidadeModel = mongoose.model("cidade", CidadesSchema)
const AoiModel = mongoose.model("aoi", AoiSchema)

// INSERIR DADOS 


UserModel.create({
    id: 1,
    user_cpf: "46607827861",
    user_nome: "Michael",
    user_fone: "996791297",
    user_email: "teste@email.com",
    user_usuario: "itsmorais",
    user_password: "123"
}).then((data) => {
    console.log(data)
})

// ESTADO MG
EstadoModel.create({
    id: 1,
    est_sigla: "MG",
    est_nome: "Minas Gerais",
    est_ibge: "1234567"
}).then((data) => {
    console.log(data)
    //CIDADE BETIM - MG
    cidadeModel.create({
        id: 2,
        cid_nome: "Betim",
        cid_ibge: "1234",
        estado: data._id
    }).then((data) => {
        console.log(data)

        // AOI BETIM
        AoiModel.create({
            id: 2,
            aoi_user_id: 1,
            aoi_cid_id: data._id
        }).then((data) => {
            console.log(data)
        })
    })

})









function isValidCPF(value: string) {
    if (typeof value !== 'string') {
        return false;
    }

    value = value.replace(/[^\d]+/g, '');

    if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
        return false;
    }

    const values = value.split('').map(el => +el);
    const rest = (count: number) => (values.slice(0, count - 12).reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10;

    return rest(10) === values[9] && rest(11) === values[10];
}




function connect() {
    mongoose.connection.on("connected", () => console.log("Database Connected"));
    mongoose.connection.on("disconnected", () => console.log("Database Disconnected"));


    mongoose.connect(uriLocal, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
        serverApi: { version: '1', strict: true, deprecationErrors: true }
    })
        .then(() => console.log("Connected to MongoDB"))
        .catch((e) => {
            console.error("Connection Failed", e.message)
        })

    process.on("SIGINT", async () => {
        try {
            console.log("Connection closed");
            await mongoose.connection.close();
            process.exit(0);
        }
        catch (error) {
            console.error("Problems to close the connection", error);
            process.exit(1);
        }
    })
}