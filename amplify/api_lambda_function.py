import json
import boto3
from decimal import Decimal

client = boto3.client('dynamodb')
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table('Business_card')
tableName = 'Business_card'
s3 = boto3.client('s3')


def lambda_handler(event, context):
    print(event)
    body = {}
    statusCode = 200
    headers = {
        "Content-Type": "application/json"
    }

    try:
        if event['routeKey'] == "DELETE /items/{id}":
            table.delete_item(
                Key={'id': event['pathParameters']['id']})
            body = 'Deleted item ' + event['pathParameters']['id']
        elif event['routeKey'] == "GET /items/{id}":
            body = table.get_item(
                Key={'id': event['pathParameters']['id']})
            body = body["Item"]
            print(body)
            responseBody = [
                {'id': body['id'], 'name': body['name'], 'age': body['age'], 'birthday': body['birthday'], 'job': body['job'], 'employer': body['employer'], 'city': body['city'], 'email': body['email'], 'phone': body['phone']}]
            
            # Get picture from S3 if it exists
            if 'picture' in body: 
                picture_url = get_picture_from_s3(body['picture'])
                responseBody[0]['picture'] = picture_url
            
            body = responseBody
        elif event['routeKey'] == "GET /items":
            body = table.scan()
            body = body["Items"]
            print("ITEMS----")
            print(body)
            responseBody = []
            for items in body:
                responseItems = [
                    {'id': items['id'], 'name': items['name'], 'age': items['age'], 'birthday': items['birthday'], 'job': items['job'], 'employer': items['employer'], 'city': items['city'], 'email': items['email'], 'phone': items['phone']}
                ]
               
                # Get picture from S3 if it exists
                if 'picture' in items: 
                    picture_url = get_picture_from_s3(items['picture'])
                    responseItems[0]['picture'] = picture_url
                    
                responseBody.append(responseItems)
            body = responseBody
        elif event['routeKey'] == "PUT /items":
            requestJSON = json.loads(event['body'])
            
            # # Upload picture to S3 if it exists
            # if 'picture' in requestJSON:
            #     picture_key = upload_picture_to_s3(requestJSON['picture'])
            #     requestJSON['picture'] = picture_key
            
            if requestJSON['picture'] == '0':
                # If picture is '0', retrieve the current value from DynamoDB
                existing_item = table.get_item(Key={'id': requestJSON['id']})
                existing_picture = existing_item.get('Item', {}).get('picture', None)
                if existing_picture:
                    requestJSON['picture'] = existing_picture
                
           
            table.put_item(
                Item={
                    'id': requestJSON['id'], 'name': requestJSON['name'], 'age': requestJSON['age'], 'birthday': requestJSON['birthday'], 'job': requestJSON['job'], 'employer': requestJSON['employer'], 
                    'city': requestJSON['city'], 'email': requestJSON['email'], 'phone': requestJSON['phone'], 'picture': requestJSON['picture']
                })
         
                
            body = 'Put item ' + requestJSON['id']
    except KeyError:
        statusCode = 400
        body = 'Unsupported route: ' + event['routeKey']
    body = json.dumps(body)
    res = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": body
    }
    return res

def upload_picture_to_s3(picture_data):
    # Upload picture to S3 and return the key
    bucket_name = 'business.picture'
    picture_key = 'pictures/' + str(uuid.uuid4()) + '.jpg'  # Generate a unique key for the picture
    s3.put_object(Body=picture_data, Bucket=bucket_name, Key=picture_key)
    return picture_key

def get_picture_from_s3(picture_key):
    # Get picture URL from S3
    bucket_name = 'business.picture'
    picture_url = s3.generate_presigned_url('get_object', Params={'Bucket': bucket_name, 'Key': picture_key}, ExpiresIn=3600)
    return picture_url