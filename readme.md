# Project Name

## Description

This project is a simple API for managing clusters and machines. It allows users to create, read, update, and delete clusters and machines.

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

## Usage

Start the server:

```bash
npm start
```

Then, you can use a tool like curl or Postman to make requests to the API.

## Endpoints
1 .POST /machines: This endpoint is used to create a new machine. The validateMachineCreation middleware is used to validate the request body before passing control to the createMachine controller function.

2 .GET /machines/:clusterId: This endpoint is used to get all machines for a specific cluster. The clusterId is passed as a URL parameter.

3 .DELETE /machines/delete/:machineId: This endpoint is used to delete a specific machine. The machineId is passed as a URL parameter.

4 .PUT /machine/start: This endpoint is used to start a machine. The specific machine to start would likely be identified by data in the query parameters.

5 .PUT /machine/stop: This endpoint is used to stop a machine. The specific machine to stop would likely be identified by data in the query parameters.

6 .PUT /machine/reboot: This endpoint is used to reboot a machine. The specific machine to reboot would likely be identified by data in the query parameters.

7 .POST /clusters: This endpoint is used to create a new cluster. The validateClusterCreation middleware is used to validate the request body before passing control to the createCluster controller function.

8 .DELETE /clusters/delete/:clusterId: This endpoint is used to delete a specific cluster. The clusterId is passed as a URL parameter.
