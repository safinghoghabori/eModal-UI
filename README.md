
# Container Watchlist - eModal

This application is one of the core features of intermodal business solutions where Trucking company / BCO(Beneficial Cargo Owner) / Shipper can view its container statuses, holds like custom holds etc, pay various types of container fees (for ex. import gate fee, demurrage fees etc.).


## Tech Stack

**Client:** Html, CSS, Javascript, Typescript, Angular, Bootstrap

**Server:** .NET 8, ASP.NET Core, Entity Framework, Microservices, JWT, Microsoft Azure, Azure Service Bus, Azure SQL DB, Azure Cosmos DB, API 
Gateway (BFF), Docker, Git, Github



## Features

- SPA
- Loading state handling
- Error handling 
- File and Folder structure
- Clean, scalable, organized code
- Route guards, show page not found ui for random URLs
- Responsive UI (mobile friendly)

## How to run?

If you have Docker running locally

```bash
  To create docker image: docker build -t angulardocker .
  To run the container: docker run -d --name angulardockercontainer -p 4200:4200 angulardocker:latest
```

or, run below command

```bash
ng serve
```
