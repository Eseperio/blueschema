# GitHub Pages Setup Instructions

This repository now includes complete GitHub Pages documentation. To enable it:

## Automatic Deployment (Recommended)

1. **Enable GitHub Pages in Repository Settings:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: Select **GitHub Actions**
   - Save the changes

2. **The site will automatically deploy when:**
   - Code is pushed to the `main` branch
   - The workflow can also be manually triggered from the Actions tab

3. **Access your site at:**
   - `https://eseperio.github.io/blueschema/`

## Local Development

To test the documentation site locally:

```bash
# Install Ruby dependencies
bundle install

# Run Jekyll locally
bundle exec jekyll serve

# View at http://localhost:4000/blueschema/
```

## Documentation Structure

- `index.md` - Main landing page
- `getting-started.md` - Getting started guide
- `schemas.md` - Schema reference overview
- `_schemas/` - Individual schema documentation pages
- `examples/blog-app.md` - Complete blog application example
- `_layouts/default.html` - Page layout template
- `assets/css/style.scss` - Custom styling
- `_config.yml` - Jekyll configuration

## Features

✅ Complete schema documentation for all 24 schemas  
✅ Getting started guide with examples  
✅ Real-world blog application example  
✅ Clean, responsive design  
✅ Easy navigation  
✅ GitHub-themed styling  

## Customization

- Edit `_config.yml` to change site title and description
- Modify `assets/css/style.scss` for custom styling
- Update `_layouts/default.html` to change navigation or layout

## Important Notes

- The documentation is designed to work with GitHub Pages' default Jekyll setup
- Custom domain can be configured in repository settings
- Site rebuilds automatically on every push to main branch
