# Ahamed Learning Notes

This is a static blog built with plain HTML, CSS, and JavaScript. It does not require React, Next.js, a database, or a build command.

## Open the website

For a quick look, open `index.html` in a browser. For reliable local links, run a small local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Folder structure

```text
assets/
  css/style.css
  js/site.js
  js/data/statistics.js
  js/data/linear-algebra.js
  js/data/oop.js
  js/data/dsa.js
  js/data/sql.js
  images/statistics/
  images/linear-algebra/
  images/oop/
  images/dsa/
  images/sql/
topics/
  statistics/index.html
  linear-algebra/index.html
  oop/index.html
  dsa/index.html
  sql/index.html
posts/
  topic-name/post-name/index.html
index.html
```

## Add one of your existing HTML posts

1. Choose its topic, for example `linear-algebra`.
2. Copy an existing post folder such as `posts/linear-algebra/dot-product/`.
3. Rename the copied folder, for example `matrix-rank`.
4. Open its `index.html` and replace the title, description, date, and the HTML inside `<div class="article-content">`.
5. Keep `data-root="../../../"` and the existing stylesheet and script paths unchanged.
6. Add the post metadata to `assets/js/data/linear-algebra.js`.
7. Put its images in `assets/images/linear-algebra/`.
8. Reference an image from a post with `../../../assets/images/linear-algebra/your-image.jpg`.

Example metadata entry:

```javascript
{
  title: "Matrix Rank Explained",
  slug: "matrix-rank",
  topic: "Linear Algebra",
  topicSlug: "linear-algebra",
  date: "July 14, 2026",
  description: "A short description displayed on the post card.",
  color: "sky",
  symbol: "rank(A)",
  path: "posts/linear-algebra/matrix-rank/"
}
```

The home page, topic page, search results, pagination, and related-post sidebar update automatically from these data files.

## Use your existing full HTML file

If your existing file already contains `<html>`, `<head>`, and `<body>`, keep only the article markup you wrote, then paste it inside the template's `article-content` element. Move page-specific CSS into `assets/css/style.css` or add a separate stylesheet beside it.

Do not paste a second `<html>`, `<head>`, or `<body>` inside the template.

## Add a new topic

1. Create `topics/new-topic/index.html` by copying another topic page.
2. Create `assets/js/data/new-topic.js`.
3. Add its script tag to the home, topic, and article pages.
4. Add the topic to the `topics` array in `assets/js/site.js`.
5. Create `assets/images/new-topic/` and `posts/new-topic/`.

## Customize the design

All colors and layout variables are at the beginning of `assets/css/style.css`. The main values are `--canvas`, `--navy`, `--coral`, `--mint`, `--sky`, and `--violet`.

## Publish free

You can upload this folder to GitHub Pages, Netlify, Cloudflare Pages, or any normal web host. Because every page is static, no server-side configuration is required.
