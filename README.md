### API Reference

## Read

#### Get all products

```http
  GET /apiv1/products
```

#### Get product

```http
  GET /api/products/${id}
```
#### Get product by tag name

```http
  GET /apiv1/products?tags=mobile
```

#### Get product if On sale

```http
  GET /apiv1/products?onSale=true
```

#### Get image of the product

```http
  GET /images/products/keyboard-apple.jpg
```
#### Get products by pagination

```http
  GET /apiv1/products?tags=mobile&skip=3&limit=3
```

## Write
#### Create new product

```http
  POST /api/products/${id}
```

## Update
#### Update product

```http
  PUT /api/products/${id}
```

## Delete

#### Delete product

```http
  DELETE /api/products/${id}
```

