const express = require("express");
const fs = require("fs")
const app = express();
const PORT = 3000;
app.use(express.static("./static"));
app.use(express.json());

app.get("/tasks", (req, res) => {
    fs.readFile("./bd/tasks.json", (err, data) => {
        if (err)
            return res.status(500).send("erreur on then serveur ")
        let tasks = JSON.parse(data.toString()).tasks
        res.status(201).json(tasks)

    })
})
app.post("/tasks", (req, res) => {
    fs.readFile("./bd/tasks.json", (err, data) => {
        if (err)
        return res.status(500).send("erreur on then serveur ")
       // let {task,completedOrNot}=req.body
        let dataToSave=JSON.parse(data.toString())

        let taskToSave={
            id:dataToSave.lastId,
            task:req.body.task,
            completedOrNot:req.body.completedOrNot
        }
        dataToSave.tasks.push(taskToSave)
        dataToSave.lastId++

        fs.writeFile("./bd/tasks.json", JSON.stringify(dataToSave,null,4),(err) => {
            if (err)
                return res.status(500).send("erreur on then serveur ")
            res.status(201).json(taskToSave)
        })
    })
})
app.put("/tasks/:id", (req, res) => {
    fs.readFile("./bd/tasks.json", (err, data) => {
        if (err)
            return res.status(500).send("erreur on then serveur ")
        let dataToSave=JSON.parse(data.toString())
        let taskToSave=dataToSave.tasks.find(task=>task.id==req.params.id)
        taskToSave.task=req.body.task
        taskToSave.completedOrNot=req.body.completedOrNot
        fs.writeFile("./bd/tasks.json", JSON.stringify(dataToSave,null,4),(err) => {
            if (err)
                return res.status(500).send("erreur on then serveur ")
            res.status(201).json(taskToSave)
        })
    })
})
app.delete( "/tasks/:id", (req, res) => {
    fs.readFile("./bd/tasks.json", (err, data) => {
        if (err)
            return res.status(500).send("erreur on then serveur ")
        let dataToSave=JSON.parse(data.toString())
        let taskToSave=dataToSave.tasks.find(task=>task.id==req.params.id)
        dataToSave.tasks=dataToSave.tasks.filter(task=>task.id!=req.params.id)
        fs.writeFile("./bd/tasks.json", JSON.stringify(dataToSave,null,4),(err) => {
            if (err)
                return res.status(500).send("erreur on then serveur ")
            res.status(200).json(taskToSave)
        })
    })
}) 

app.listen(PORT, () => {
    console.log("server is running", PORT)
})
