import motor.motor_asyncio
# the structure idea is like a binary tree, each collection save a document with a
# key represent collection child needed, and its value is the actual name of the collection in the db.
# in that way we can get the collection leaf which store all the data by
# query the needed collection key, get the name of the collection as a string as a response
# and just plug it to the db.
# Example query to retrieve celeb fashion data for 'Asos'
# service_name = "Asos"
# celeb_fashion_collection_name = service_collection.find_one({"service_name": service_name})["collection_name"]
# celeb_fashion_collection = db[celeb_fashion_collection_name]


# Create a MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')

# Step 1: Create the 'fashion_db' database
db = client.fashion_db

# Step 2: Create the 'service_collection' in the 'fashion_db' database
service_collection = db['service_collection']

# Step 3: Insert documents for 'Asos' and 'Zara' in the 'service_collection'
asos_doc = {
    "service_name": "Asos",
    "collection_name": "asos_collection"
}

shein_doc = {
    "service_name": "Shein",
    "collection_name": "shein_collection"
}
service_collection.insert_many([asos_doc, shein_doc])
# Step 4: Create the 'asos_collection' and 'zara_collection' collections
asos_collection = db['asos_collection']
shein_collection = db['shein_collection']

# Define the key-value pairs for 'asos_collection'
asos_collection.insert_one({
    'celeb': 'asos_celeb_fashion',
    'theme': 'asos_theme_fashion'
})
# Define the key-value pairs for 'shein_collection'
shein_collection.insert_one({
    'celeb': 'shein_celeb_fashion',
    'theme': 'shein_theme_fashion'
})

# Step 5: Create the 'asos_celeb_fashion' and 'asos_theme_fashion' collections
asos_celeb_fashion = db['asos_celeb_fashion']
asos_theme_fashion = db['asos_theme_fashion']

# Step 6: Create the 'shein_celeb_fashion' and 'shein_theme_fashion' collections
shein_celeb_fashion = db['shein_celeb_fashion']
shein_theme_fashion = db['shein_theme_fashion']
