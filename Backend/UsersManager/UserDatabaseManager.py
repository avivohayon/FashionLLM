from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from Backend.database.UserModelTable import UserEntity, UserFashion
from Backend.database.UserModelPydantic import User
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict, List

class UserDatabaseManager:
    """
    this class responsible for all the My Sql DB access for the Users
    Mostly use in UserManger class in a composition approach
    """
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def get_user_by_username(self, username: str) -> UserEntity | None:
        return self.db_session.query(UserEntity).filter(UserEntity.user == username).first()


    def add_user(self, user: UserEntity):
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

    def add_searched_fashion_collection(self, username:str, collection_name: str, target_name:str):
        try:
            user_fashion = UserFashion(user=username)
            user_fashion.collections = collection_name
            user_fashion.target_name = target_name
            # Commit the changes to the database
            self.db_session.add(user_fashion)
            self.db_session.commit()
            print("committed")
        except SQLAlchemyError as e:
            self.db_session.rollback()  # Rollback changes if there's an error
            raise HTTPException(status_code=500, detail="Internal MySQL server error")



    def get_saved_fashion_collection(self, username: str) -> dict[str, list[str]]:
        try:
            result_query = self.db_session.query(UserFashion).filter(UserFashion.user == username).all()
            result_dict = dict()
            for user in result_query:
                if user.collections not in result_dict:
                    result_dict[user.collections] = [user.target_name]
                else:
                    result_dict[user.collections].append(user.target_name)
                # print(f"User: {user}")
                # print(f"Collections: {collections}")
                # print(f"Target Names: {target_names}")
                # print("-" * 40)
            print(result_dict)
            return result_dict

        except HTTPException as http_500:
            raise http_500



    def is_first_search(self, username:str, collection_name: str, target_name:str) -> bool:
        try:
            query = (
                self.db_session.query(UserFashion)
                .filter_by(user=username, collections=collection_name, target_name=target_name)
                .first()
            )
            if query:
                return False
            else:
                return True
        except Exception as e:
            print("is_first_search error")
            return False


