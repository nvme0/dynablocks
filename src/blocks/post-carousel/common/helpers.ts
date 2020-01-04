export interface PostWithSubtitle {
  title: string;
  subtitle: string;
  link: string;
  featuredImageSrc?: string;
}

export async function fetchPosts() {
  // fetches posts from the WP REST API
  const url = `${window.location.origin}/wp-json/wp/v2/post-with-subtitle?per_page=5`;
  const response = await fetch(url);
  const data = await response.json();
  const posts: PostWithSubtitle[] = [];

  data.forEach(element => {
    posts.push({
      title: element.title.rendered,
      subtitle: element.subtitle,
      link: element.link,
      featuredImageSrc: element.s4tw_featured_image_src || undefined
    });
  });
  return posts;
}
