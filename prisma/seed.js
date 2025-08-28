const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed the database...');

  // Sample posts data based on your existing markdown files
  const postsData = [
    {
      title: 'Two Forms of Pre-rendering',
      content: `Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

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

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.`,
      author: 'Next.js Team',
      published: true,
      createdAt: new Date('2020-01-01'),
    },
    {
      title: 'When to Use Static Generation v.s. Server-side Rendering',
      content: `We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.`,
      author: 'Next.js Team',
      published: true,
      createdAt: new Date('2020-01-02'),
    },
    {
      title: 'My First Database Post',
      content: `This is my first post created using Prisma and stored in the database!

This post demonstrates that we've successfully migrated from markdown files to a PostgreSQL database. The content is now stored in the database and can be managed dynamically.

## Benefits of Database Storage

- **Dynamic content management**
- **Better performance**
- **Scalability**
- **Real-time updates**
- **User management capabilities**

This is just the beginning of what we can do with database-driven content!`,
      author: 'Blog Admin',
      published: true,
      createdAt: new Date(),
    }
  ];

  // Clear existing posts (optional - remove this if you want to keep existing data)
  console.log('Clearing existing posts...');
  await prisma.post.deleteMany({});

  // Insert the sample posts
  for (const postData of postsData) {
    const post = await prisma.post.create({
      data: {
        ...postData,
        // Add some random categories to posts
        postCategories: {
          create: [
            { categoryId: categories[Math.floor(Math.random() * categories.length)].id },
            { categoryId: categories[Math.floor(Math.random() * categories.length)].id },
          ]
        }
      },
    });
    console.log(`Created post: ${post.title} (ID: ${post.id})`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
