# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

# Copy solution and project files
COPY *.sln ./
COPY TaskManagementApi.csproj ./TaskManagementApi/

RUN dotnet restore ./TaskManagementApi/TaskManagementApi.csproj

# Copy source files and publish
COPY . ./TaskManagementApi/

WORKDIR /app/TaskManagementApi

RUN dotnet publish -c Release -o /app/publish

# Stage 2: Run
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

# Copy published output
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "TaskManagementApi.dll"]
