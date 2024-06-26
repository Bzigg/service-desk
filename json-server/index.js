const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

const getDB = () => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
}

// Эндпоинт для логина
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = getDB()
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Эндпоинт для заявок
server.get('/tickets/all', (req, res) => {
    try {
        const db = getDB()
        const { tickets = [] } = db;

        if (tickets) {
            return res.json(tickets);
        }

        return res.status(404).json({ message: 'Tickets not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.get('/tickets/my', (req, res) => {
    try {
        const db = getDB()
        const { tickets = [], users = [] } = db;

        const userId = JSON.parse(req.headers.authorization).id

        const userFromBd = users.find(
            (user) => user.id === userId
        );

        const ticketItem = tickets.filter((ticketItem) => {
            return ticketItem.responsibleId === userFromBd.id
        })

        if (ticketItem) {
            return res.json(ticketItem);
        }

        return res.status(404).json({ message: 'Tickets not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.get('/tickets', (req, res) => {
    try {
        const db = getDB()
        const { tickets = [] } = db;
        const ticketItem = tickets.find((ticketItem) => {
            return ticketItem.id === String(req.query.id)
        })

        if (ticketItem) {
            return res.json(ticketItem);
        }

        return res.status(404).json({ message: 'Ticket not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
