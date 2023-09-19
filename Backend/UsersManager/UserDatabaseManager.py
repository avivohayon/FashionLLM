from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from Backend.database.UserModelTable import UserEntity
from Backend.database.UserModelPydantic import User
from sqlalchemy.orm import Session


class UserDatabaseManager:
    """
    this class responsible for all the My Sql DB access for the Users
    Mostly use in UserManger class in a composition approach
    """
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def get_user_by_username(self, username: str) -> UserEntity | None:
        return self.db_session.query(UserEntity).filter(UserEntity.user == username).first()


    def add_user(self, user: User):
        """
        add valid user input to the db
        :param user: Pydantic class User
        :raises HTTPException: If there's an error during database operation
        """
        try:
            # hashed_pwd = self.get_pwd_hash(user.pwd)
            # db_user = UserEntity(user=user.user, email=user.email, hashed_pwd=hashed_pwd)
            self.db_session.add(user)
            self.db_session.commit()
        except SQLAlchemyError as e:
            self.db_session.rollback()  # Rollback changes if there's an error
            raise HTTPException(status_code=500, detail="Internal MySQL server error")


    def get_all_users_from_db(self):
        """
        Retrieve all users from the database.
        :return: List of UserEntity instances
        """
        try:
            users = self.db_session.query(UserEntity).all()
            return users
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail="Internal MySQL server error")

