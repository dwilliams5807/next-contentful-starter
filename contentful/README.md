# Contentful Setup

## Prerequisites

Install the Contentful CLI globally:

```bash
npm install -g contentful-cli
```

Log in:

```bash
contentful login
```

## Import Content Types

Run this once against your space to create all content types:

```bash
contentful space import \
  --space-id YOUR_SPACE_ID \
  --content-file contentful/content-types.json
```

> After import, go to **Content model** in the Contentful web app and publish each type.

## Important: Field ID Mapping

The GraphQL API field names don't always match the field IDs in this file. Two cases to be aware of:

| Content type | Field in this file | GraphQL field name |
|---|---|---|
| `columnsSection` | `columns` | `columnsCollection` |
| `duplexSlider` | `slides` | `slidesCollection` |

Contentful automatically appends `Collection` to the GraphQL name for linked-entry array fields.

## Environment Variables

Add to `.env.local`:

```
CONTENTFUL_SPACE=your_space_id
CONTENTFUL_API=your_content_delivery_api_key
```
