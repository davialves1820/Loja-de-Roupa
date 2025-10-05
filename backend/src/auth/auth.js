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
        { usernameField: "email" }, // Define o campo usado como "usuário" (email)
        async (email, password, callback) => {
            // Procura o usuário no banco pelo email informado
            const user = await Mongo.db.collection(collection_name).findOne({ email: email });

            // Caso o usuário não exista, retorna falso (falha de autenticação)
            if (!user) {
                return callback(null, false);
            }

            // Obtém o valor do salt salvo no banco
            const saltBuffer = user.salt.buffer; 

            // Recalcula o hash da senha informada para comparar com a armazenada
            crypto.pbkdf2(password, saltBuffer, 310000, 16, "sha256", (err, hashed_password) => {
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

// Define a rota POST /login para autenticação de usuários
auth_router.post("/login", (req, res) => {

    // Usa o middleware Passport com a estratégia "local" (email e senha)
    // A função de callback (error, user) é executada após o processo de autenticação
    passport.authenticate("local", (error, user) => {

        // Caso ocorra algum erro interno durante o processo de autenticação
        if (error) {
            return res.status(500).send({
                success: false,           // Indica falha
                statusCode: 500,          // Código HTTP 500 = erro interno
                body: {
                    text: "Error during authentication!",
                    error                  // Detalhes do erro (opcional)
                }
            });
        }
        
        // Caso o usuário não seja encontrado ou a senha esteja incorreta
        if (!user) {
            return res.status(400).send({
                success: false,           // Indica falha
                statusCode: 400,          // Código HTTP 400 = requisição inválida
                body: {
                    text: "User not found!"  // Mensagem genérica para não expor se foi o email ou senha
                }
            });
        }

        // Se chegou até aqui, o usuário foi autenticado com sucesso
        // Cria um token JWT (JSON Web Token) com os dados do usuário autenticado
        const token = jwt.sign(user, "secret");

        // Retorna uma resposta de sucesso com o token e os dados do usuário
        return res.status(200).send({
            success: true,              // Indica sucesso
            statusCode: 200,            // Código HTTP 200 = OK
            body: {
                text: "User authenticated successfully!",
                user,                   // Dados do usuário autenticado
                token                   // Token JWT gerado
            }
        });

    // Necessário passar `req` e `res` para o passport executar o middleware corretamente
    })(req, res);
});


// Exporta o roteador para uso no servidor principal
export default auth_router;
