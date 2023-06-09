import express, {Express, Response, Request, NextFunction} from "express"


import hivesRouter from "./routes/hives.routes";
import userRouter from "./routes/beekeeper.routes";
const port = 7000

const app : Express = express()

app.use(express.json());


app.get("/", (req : Request, res : Response) => {
    res.send("Hello")
})

app.use('/', hivesRouter);
app.use('/', userRouter);

app.use((req : Request, res : Response) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 not found')
})

app.use((err : Error, req : Request, res : Response) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 server error')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})