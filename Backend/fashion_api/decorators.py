from functools import wraps
from fastapi import Request
# - log_request received the function being decorated
# - @wraps(func) is a decorator itself provided by the functools module. It preserves the metadata
#(such as function name, docstring, etc.) of the original function func and copies them to the wrapper function wrapper.
# This ensures that the decorated function retains its original attributes.
#
##

def log_request(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        request = args[0]
        # request = kwargs.get("request")
        input_value = kwargs.get("input")
        if request:
            print(f"Received {request.method} request to {request.url.path}")
        print(f"Input value: {input_value}")
        return await func(*args, **kwargs)

    return wrapper
