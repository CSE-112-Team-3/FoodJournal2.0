from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

"""
Class is used to hash and verify passwords using Bcrypt encryption.
"""
class HashPass():
    @staticmethod
    def verify_password(plain_password, hashed_password):
        """
        Function is used to verify the password."""
        return pwd_context.verify(plain_password, hashed_password)
    
    @staticmethod
    def get_hash(password):
        """
        Function is used to hash the password."""
        return pwd_context.hash(password)