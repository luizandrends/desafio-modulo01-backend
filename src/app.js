const express = require("express");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());

const repositories = [];

function validateUuId(request, response, next) {
  const { id } = request.params;
  const uuIdIsValid = isUuid(id);

  console.log(uuIdIsValid);

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid repository ID" });
  }

  next();
}

// id, title, url, techs, likes

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.put("/repositories/:id", validateUuId, (request, response) => {
  const { id } = request.params;
  const { techs, title, url } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const repository = {
    id,
    title,
    url,
    techs,
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", validateUuId, (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", validateUuId, (request, response) => {
  const { id } = request.params;

  const repository = repositories.find((repository) => repository.id === id);

  console.log(repository);

  if (!repository) {
    return response.status(400).send();
  }

  repository.likes += 1;

  return response.json(repository);
});

app.put("/repositories/:id/like", validateUuId, (request, response) => {
  const { id } = request.params;

  const repository = repositories.find((repository) => repository.id === id);

  console.log();

  if (request.params.likes) {
    return response.json(repository);
  }

  return response.json(repository);
});

module.exports = app;
