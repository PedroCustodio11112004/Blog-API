import express, { Request, Response } from "express";
import path from "path";  
import mysql from "mysql2/promise";

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mudar123",
    database: "unicesumar"
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/users', async function (req: Request, res: Response) {
    const [rows] = await connection.query("SELECT * FROM users");
    return res.render('users/index', {
        users: rows
    });
});

app.get("/users/add", async function (req: Request, res: Response) {
    return res.render("users/add");
});

app.post("/users/add", async function(req: Request, res: Response) {
    const { name, email, senha, confirmSenha, role, isActive } = req.body;

    const ativo = isActive ? 1 : 0;

    const insertQuery = `
        INSERT INTO users (name, email, senha, role, active)
        VALUES (?, ?, ?, ?, ?)
    `;
    await connection.query(insertQuery, [name, email, senha, role, ativo]);

    res.redirect("/users");
});

app.post("/users/:id/delete", async function (req: Request, res: Response) {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM users WHERE id = ?";
    await connection.query(sqlDelete, [id]);

    res.redirect("/users");
});

app.get("/login", async function (req: Request, res: Response) {
    res.render('users/login'); 
});

app.post("/login", async function(req: Request, res: Response) {
    const { email, senha } = req.body;

    const [rows] = await connection.query("SELECT * FROM users WHERE email = ? AND senha = ?", [email, senha]);

    if (Array.isArray(rows) && rows.length === 0) {

        return res.redirect("/login");
    }

    return res.redirect("/users");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});