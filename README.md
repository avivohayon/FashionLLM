# FashionLLM - Custom Fashion Generator Project

**Have you ever wanted to effortlessly embody the style of your favorite celebrities or iconic personalities?**

FashionLLM is a unique AI-powered project that generates custom fashion styles inspired by the aesthetics of famous individuals. This repository encompasses a full-stack application that combines cutting-edge AI models, web scraping techniques, and modern web development tools to provide users with a personalized fashion experience. Whether you're a fashion enthusiast or an AI aficionado, FashionLLM offers an engaging platform that seamlessly integrates technology and style

## Introduction

FashionLLM leverages the power of Language Models and AI to generate fashion suggestions based on the styles of various iconic figures. By using AI models and web scraping, the project gathers data from fashion websites, processes it, and recommends clothing items that align with a selected persona's style.
## See How it Looks
See FashionLLM in action!

[Click to watch MVP video](https://www.youtube.com/watch?v=3DNh55BdifY&ab_channel=%D7%90%D7%91%D7%99%D7%91%D7%90%D7%95%D7%97%D7%99%D7%95%D7%9F)

## The Everyday Solution

In the hustle and bustle of our day-to-day lives, finding the perfect clothing style that resonates with our personality can be a challenging task. Not everyone has the time to delve into fashion trends, fabric choices, and ensemble coordination. This is where FashionLLM steps in to offer a seamless and innovative solution.

**Fashion for Every Occasion**: Whether you're preparing for a casual outing, a formal event, or even a themed party, FashionLLM enables you to effortlessly select a style that suits the occasion.

**Personalized Style Recommendations**: Parents, for instance, can find great relief in using FashionLLM to select clothing for their children. Picture a scenario where a child has just started learning football and is a devoted fan of Leo Messi. With FashionLLM, parents can easily browse and order clothes inspired by Leo Messi's distinctive style, ensuring their child feels connected to their idol while staying comfortable.

**Time-Efficient and Hassle-Free**: Say goodbye to hours of scrolling through online stores and wondering which outfit matches your vision. FashionLLM simplifies the process by providing curated fashion recommendations that align with your chosen persona's style.

**Empowering Self-Expression**: Fashion is a powerful form of self-expression. FashionLLM empowers individuals to express themselves through clothing, enabling them to experiment with new styles and explore different fashion directions.

## Table of Contents

- Introduction
- Features
- Project Structure
- Technologies Used
- Getting Started
- Usage
- Contributing
- License

## Features

- AI-powered Fashion Generation: Generate custom fashion recommendations inspired by the style of any famous person.
- Web Scraping: Scrape fashion data from popular websites like Asos and Shein to provide a wide range of clothing options.
- User Profiles: Allow users to create profiles, save favorite looks, and receive personalized fashion suggestions.
- MongoDB Integration: Store scraped fashion data and user preferences using MongoDB.
- User Management: Manage user data and authentication using a MySQL database.
- Caching with Redis: Improve application performance through caching using Redis.
- RESTful API: Backend API built using FastAPI to handle data requests and responses efficiently.
- Modern Frontend: Develop the web application frontend using React and TypeScript for a dynamic and responsive user interface.

## Project Structure

- `Backend`: Contains the backend implementation of the project, including AI models, API routes, and database integration.
- `Frontend`: Contains the frontend implementation using React and TypeScript, providing users with an interactive interface
- `Scraper` : Contains the scraping functionality for various fashion websites such as Asos and Shein (more to come soon)
- `notebooks`: Houses utility scripts for tasks like data scraping, model training, and data science operations.

## Technologies Used

**Backend Server:**

- Python
- OpenAI GPT-3 and LangChain
- FastAPI (and Pydantic)
- Docker
- MongoDB
- MySQL
- Redis


**Frontend Client:**
- React
- TypeScript
- CSS, Bootstrap, Material ui
- Redux

## Usage

1. Create a user profile on the FashionLLM platform.
2. Explore the available famous personas and select a style you'd like to adopt.
3. Receive fashion recommendations based on the chosen persona's style.
4. Save favorite looks, explore more styles, and fine-tune your preferences over time.

## What the Future Holds

I have exciting plans for the future of FashionLLM:

- Full Web Application Launch: Soon, I will launch the complete web application, allowing users to experience the full range of features and functionalities.
- Expanded Web Fashion Website Scrapers: Im actively working on adding more web fashion website scrapers to provide users with an even broader selection of fashion items to choose from.
- Enhanced Custom Styling with AI Models: Im developing AI models to recommend not only clothing items based on celebrites fashion but also fashion design products based on user-defined "themes," allowing for more personalized and creative styling.
## Frontend Installation

To set up the frontend of the FashionLLM application, follow these steps:

1. Clone this repository if you haven't already:

   ```bash
   git clone https://github.com/avivohayon/FashionLLM.git

2. Navigate to the frontend directory:

    ```bash    
    cd FashionLLM/FashionLangChain/Frontend/fashion-app

3. Install the required frontend dependencies:
    ```bash
    npm install

4. inside fashion-app run:
   ```bash
    npm run dev 

and lunch the client server

### important! make sure you're using the correct port for the frontend
Local:   http://localhost:5173/

## Backend Installation

To set up the backend of the FashionLLM application, follow these steps:

1. Make sure you have Python and pip installed on your system. You can download them from [here](https://www.python.org/downloads/).


2. Clone this repository if you haven't already:

   ```bash
   git clone https://github.com/avivohayon/FashionLLM.git

3. Navigate to the backend directory:
    ```bash
    cd FashionLLM

4. Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows: venv\Scripts\activate

5. Install the required Python packages:
    ```bash
    pip install -r requirements.txt

###Set Up Docker Containers:
Install Docker Desktop on your system: [Docker Desktop Installation](https://www.docker.com/products/docker-desktop/)

Pull and run the Redis container:

    docker run -d --name fashion-redis -p 6379:6379 redis
  
Pull and run the MySQL container:(notice the port numbers 3307:3306 )
    
    docker run -d --name fashion-mysql -e MYSQL_ROOT_PASSWORD=your_root_password -e MYSQL_DATABASE=your_database_name -p 3307:3306 mysql:latest

##.env file and needed info
In FashionLLM/Backend folder create .env file with these vars:
```bash
    HASH_ALGORITHM=HS256
    DATABASE_URL=mysql+pymysql://root:<your_root_password>@localhost:3307/UsersDB
    OPENAI_API_KEY=<your_openai_api_key>
``` 
in your terminal write:
```bash 
   openssl rand -hex32
```
copy the printed value and paste it to CRYPT_SECRET_KEY
   ```bash
   CRYPT_SECRET_KEY=<hashed_value>
   ```

if you have problem init the mongoDb database do this
   ```bash
   cd FashionLLM\Backend\database
   run config_structure.py
   ```
