import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update siteData gallery urls from /images/ to images/
content = content.replace('"url": "/images/', '"url": "images/')

# 2. Update swing photo src
content = content.replace('src="/images/terrace-swing.jpg"', 'src="images/terrace-swing.jpg"')

# 3. Add hero photo into hero-stage if not already present
old_hero_stage = '''        <div class="hero-stage">
          <div class="hero-stage__art"></div>'''

new_hero_stage = '''        <div class="hero-stage" style="position:relative; overflow:hidden;">
          <img src="images/hero-terrace.jpg" alt="Terrasse conviviale de La Terrasse Plus à Tlemcen" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.65; z-index:0; transition:transform 0.8s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
          <div class="hero-stage__art" style="position:absolute; inset:0; background:linear-gradient(to top, rgba(20,18,16,0.95) 0%, rgba(20,18,16,0.3) 50%, rgba(20,18,16,0.6) 100%); pointer-events:none; z-index:1;"></div>'''

if old_hero_stage in content:
    content = content.replace(old_hero_stage, new_hero_stage, 1)
    print('Hero stage updated with real photo!')
else:
    print('Could not find old_hero_stage')

# 4. In Story section, add interior photo above mosaic
old_story_visual = '''        <div class="story-visual reveal">
          <div class="story-mosaic">'''

new_story_visual = '''        <div class="story-visual reveal">
          <div style="width:100%; aspect-ratio:16/9; border-radius:var(--radius-lg); overflow:hidden; margin-bottom:var(--space-md); border:1px solid var(--color-border); box-shadow:var(--shadow-sm);">
            <img src="images/interior-dining.jpg" alt="Salle climatisée et conviviale de La Terrasse Plus" style="width:100%; height:100%; object-fit:cover;" />
          </div>
          <div class="story-mosaic">'''

if old_story_visual in content:
    content = content.replace(old_story_visual, new_story_visual, 1)
    print('Story visual updated with interior photo!')
else:
    print('Could not find old_story_visual')

# 5. In renderOfferings, add dish photos
old_render_off = '''          const tagsHtml = (item.dietary || []).map(t => '<span class="menu-tag">' + t + '</span>').join('');'''

dish_img_code = '''          const dishImages = {
            'plat-grillades': 'images/woodfire-grill.jpg',
            'plat-mhamer': 'images/hero-terrace.jpg',
            'plat-filet': 'images/woodfire-grill.jpg',
            'entree-hrira': 'images/interior-dining.jpg',
            'pizza-kebab': 'images/pizza-kebab.jpg',
            'pizza-terrasse': 'images/pizza-kebab.jpg',
            'burger-matlou3': 'images/burger-matlou3.jpg',
            'burger-terrasse': 'images/burger-matlou3.jpg'
          };
          const dishImg = dishImages[item.slug];
          const imgBannerHtml = dishImg ? ('<div style="width:100%; aspect-ratio:16/9; overflow:hidden; border-radius:var(--radius-md); margin-bottom:var(--space-sm);"><img src="' + dishImg + '" alt="' + item.name + '" loading="lazy" style="width:100%; height:100%; object-fit:cover; transition:transform 0.4s;" onmouseover="this.style.transform=\\'scale(1.05)\\'" onmouseout="this.style.transform=\\'scale(1)\\'" /></div>') : '';
          const tagsHtml = (item.dietary || []).map(t => '<span class="menu-tag">' + t + '</span>').join('');'''

if old_render_off in content:
    content = content.replace(old_render_off, dish_img_code, 1)
    old_card_inner = '''          card.innerHTML = `
            <div class="menu-card__top">'''
    new_card_inner = '''          card.innerHTML = `
            ${imgBannerHtml}
            <div class="menu-card__top">'''
    content = content.replace(old_card_inner, new_card_inner, 1)
    print('RenderOfferings updated with dish photos!')
else:
    print('Could not find old_render_off')

# 6. Global image error handler
error_script = '''    <script>
      // Fallback automatique pour le chargement des images locales
      document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
          var src = e.target.getAttribute('src');
          if (src && !e.target.dataset.hasRetried) {
            e.target.dataset.hasRetried = 'true';
            if (src.indexOf('/images/') === 0) {
              e.target.src = src.substring(1);
            } else if (src.indexOf('images/') === 0) {
              e.target.src = 'public/' + src;
            } else if (src.indexOf('/public/') === 0) {
              e.target.src = src.substring(1);
            }
          }
        }
      }, true);
    </script>
  </head>'''

if 'Fallback automatique pour le chargement' not in content:
    content = content.replace('</head>', error_script, 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('index.html update complete!')
