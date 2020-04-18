const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {  
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs, 
    likes: 0,
  }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const fintRepositoryIndex = repositories.findIndex(repository => 
    repository.id === id
  )

  if (fintRepositoryIndex === -1) {
    return response.status(400).json({ error: 'Repository does not exist.'})
  }

  const repository = {
    id: uuid(),
    title,
    url,
    techs, 
    likes: repositories[fintRepositoryIndex].likes,
  }  

  repositories[fintRepositoryIndex] = repository
  
  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  
  const fintRepositoryIndex = repositories.findIndex(repository => 
    repository.id === id
  )

  if (fintRepositoryIndex >= 0) {
    repositories.splice(fintRepositoryIndex, 1)
  } else {
    return response.status(400).json({ error: 'Repository does not exist.'})
  }

  return response.status(204).send('')
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const fintRepositoryIndex = repositories.findIndex(repository => 
    repository.id === id
  )

  if (fintRepositoryIndex === -1) {
    return response.status(400).json({ error: 'Repository does not exist.'})
  }

  repositories[fintRepositoryIndex].likes ++
  return response.json(repositories[fintRepositoryIndex])
});

module.exports = app;
