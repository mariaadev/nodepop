
# Nodepop

Node, Express and MongoDB practice for the Bootcamp Women In Tech by Keepcoding and Glovo 

## Run Locally

Install dependencies

```bash
  npm install
```

Initialize database

```bash
  npm run init-db
```
Start the server

```bash
  npm start
```

### API Reference

## Read

#### Get all products

```bash
  GET /apiv1/products
```

#### Get product

```bash
  GET /api/products/${id}
```
#### Get product by tag name

```bash
  GET /apiv1/products?tags=mobile
```

#### Get product if On sale

```bash
  GET /apiv1/products?onSale=true
```

#### Get image of the product

```bash
  GET /images/products/keyboard-apple.jpg
```
#### Get products by pagination

```bash
  GET /apiv1/products?tags=mobile&skip=3&limit=3
```

## Write
#### Create new product

```bash
  POST /api/products/${id}
```

## Update
#### Update product

```bash
  PUT /api/products/${id}
```

## Delete

#### Delete product

```bash
  DELETE /api/products/${id}
```
