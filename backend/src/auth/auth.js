import express from "express";            // Criação de rotas e servidores HTTP
import passport from "passport";          // Middleware de autenticação para Node.js
import LocalStrategy from "passport-local"; // Estratégia de autenticação local (usuário/senha)
import crypto from "crypto";              // Módulo nativo para operações criptográficas
import { Mongo } from "../database/mongo.js"; // Conexão e utilitários para o banco MongoDB
import jwt from "jsonwebtoken";           // Biblioteca para criação de tokens JWT
import { ObjectId } from "mongodb";       // Classe para manipular IDs do MongoDB

// Define o nome da coleção usada no banco de dados
const collection_name = "users";

// Configuração da Estratégia Local do Passport
passport.use(
    new LocalStrategy.Strategy(
        { user_name_field: "email" }, // Define o campo usado como "usuário" (email)
        async (email, password, callback) => {
            // Procura o usuário no banco pelo email informado
            const user = await Mongo.db.collection(collection_name).findOne({ email: email });

            // Caso o usuário não exista, retorna falso (falha de autenticação)
            if (!user) {
                return callback(null, false);
            }

            // Obtém o valor do salt salvo no banco
            const salt_buffer = user.salt.saltBuffer;

            // Recalcula o hash da senha informada para comparar com a armazenada
            crypto.pbkdf2(password, saltBuffer, 310000, 32, "sha256", (err, hashed_password) => {
                if (err) {
                    // Caso ocorra erro na criptografia
                    return callback(null, false);
                }

                // Recupera o hash de senha armazenado no banco e converte em Buffer
                const user_password_buffer = Buffer.from(user.password.buffer);

                // Compara os hashes de forma segura, evitando ataques de tempo (timing attacks)
                if (!crypto.timingSafeEqual(user_password_buffer, hashed_password)) {
                    return callback(null, false); // Senha incorreta
                }

                // Remove dados sensíveis antes de retornar o usuário
                const { password, salt, ...rest } = user;

                // Retorna o usuário autenticado (sem senha e salt)
                return callback(null, rest);
            });
        }
    )
);

// Criação do roteador de autenticação
const auth_router = express.Router();

// Rota de cadastro de novo usuário (/signup)
auth_router.post("/signup", async (req, res) => {
    // Verifica se já existe um usuário com o email informado
    const check_user = await Mongo.db.collection(collection_name).findOne({ email: req.body.email });

    if (check_user) {
        // Caso o usuário já exista, retorna erro 500
        return res.status(500).send({
            sucess: false,
            statusCode: 500,
            body: {
                text: "User already exists!"
            }
        });
    }

    // Gera um salt aleatório para o hash da senha
    const salt = crypto.randomBytes(16);

    // Criptografa a senha do usuário usando PBKDF2 (seguro e recomendado)
    crypto.pbkdf2(req.body.password, salt, 310000, 16, "sha256", async (err, hashed_password) => {
        if (err) {
            // Caso ocorra erro durante o processo de hash
            return res.status(500).send({
                sucess: false,
                statusCode: 500,
                body: {
                    text: "Error on crypto password!",
                    err: err
                }
            });
        }

        // Insere o novo usuário no banco com o email, hash da senha e salt
        const result = await Mongo.db.collection(collection_name).insertOne({
            email: req.body.email,
            password: hashed_password,
            salt
        });

        // Se o usuário foi inserido com sucesso
        if (result.insertedId) {
            // Busca novamente o usuário recém-criado
            const user = await Mongo.db.collection(collection_name).findOne({
                _id: new ObjectId(result.insertedId)
            });

            // Cria um token JWT com as informações do usuário
            const token = jwt.sign(user, "secret");

            // Retorna a resposta de sucesso com o token e os dados do usuário
            return res.send({
                sucess: true,
                statusCode: 200,
                body: {
                    text: "User registered successfully!",
                    token,  // Token de autenticação JWT
                    user,   // Dados do usuário
                    logged: true
                }
            });
        }
    });
});

// Exporta o roteador para uso no servidor principal
export default auth_router;
