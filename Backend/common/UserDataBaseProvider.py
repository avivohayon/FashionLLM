from sqlalchemy.orm import declarative_base
from sqlalchemy.orm.session import Session
from sqlalchemy.pool import QueuePool
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv, find_dotenv

import os
"""
create and init the mysql users database engine and session
"""
load_dotenv(find_dotenv())

DATABASE_URL = os.environ["DATABASE_URL"]
# Using a connection pooling mechanism for up to 5 db connection for better scaling

engine = create_engine(
                DATABASE_URL,
                pool_size=5,  # Adjust this based on your needs
                poolclass=QueuePool
            )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()



