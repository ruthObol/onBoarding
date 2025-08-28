-- Seed posts data
INSERT INTO "public"."Post" ("title", "content", "author", "published", "createdAt", "updatedAt", "deletedAt") VALUES
(
  'Two Forms of Pre-rendering',
  'Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

## When to Use Static Generation v.s. Server-side Rendering

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user''s request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user''s request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.',
  'Next.js Team',
  true,
  '2020-01-01 00:00:00.000',
  '2020-01-01 00:00:00.000',
  NULL
),
(
  'When to Use Static Generation v.s. Server-side Rendering',
  'We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user''s request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user''s request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.',
  'Next.js Team',
  true,
  '2020-01-02 00:00:00.000',
  '2020-01-02 00:00:00.000',
  NULL
),
(
  'My First Database Post',
  'This is my first post created using Prisma and stored in the database!

This post demonstrates that we''ve successfully migrated from markdown files to a PostgreSQL database. The content is now stored in the database and can be managed dynamically.

## Benefits of Database Storage

- **Dynamic content management**
- **Better performance**
- **Scalability**
- **Real-time updates**
- **User management capabilities**

This is just the beginning of what we can do with database-driven content!',
  'Blog Admin',
  true,
  NOW(),
  NOW(),
  NULL
);
