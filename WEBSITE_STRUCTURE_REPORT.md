# JetBundle Website Structure Report

## Executive Summary

This report analyzes the current website structure and proposes an ideal organization that aligns with JetBundle's mission: building a community of high-knowledge, high-skilled individuals who collaborate, research, and innovate through mastery of **physics, finance, and computation**—the fundamental disciplines for 21st-century scientists and engineers in an AI-disrupted world.

**Core Philosophy**: Eudaimonia through free thinking, free building, and engineering excellence.

---

## Current Structure Analysis

### 1. Navigation Structure

**Current Navigation Menu:**
- About → Links to `/principal` (original manifesto/content)
- Resources → Dropdown with:
  - The Stack → `/stacks/`
  - Booklist → `/booklist/`
  - Primary Sources → `/archive/`
- Blog → `/blog` (empty placeholder)
- Community → `/community` (empty placeholder)

**Issues:**
- Navigation is functional but doesn't emphasize the three core disciplines (Physics, Finance, Computation)
- "The Stacks" are buried under Resources dropdown
- Blog and Community are placeholders with no content
- The three specialized stacks (C3I, Physics, Finance) are not prominently featured

### 2. Content Organization

#### Homepage (`index.md`)
- **Current**: Simple landing page with three sections:
  - Physics: "Mathematical foundations of physical systems."
  - Finance: "Computational methods in financial engineering."
  - Computation: "Algorithms and systems architecture."
- **Status**: ✅ Good foundation, but minimal content

#### Principal Page (`_pages/principal.md`)
- **Current**: Contains the full original manifesto and audit framework
- **Content**: Comprehensive explanation of the "fiber bundle" model, the three stacks, cartography, archive
- **Status**: ✅ Rich content, but may be too dense for first-time visitors

#### Three Specialized Stacks

**C3I Stack (`_c3i_stack/`)**
- `01_intro.md` - Introduction to C3I & Surveillance Stack
- `os-audit.md` - Operating Systems audit
- `ai-audit.md` - AI audit
- `graph-theory.md` - Graph theory audit
- **Status**: ✅ Well-structured, but focused on "audit" rather than "building"

**Physics Stack (`_physics_stack/`)**
- `01_intro.md` - Introduction to Ballistics & Hydrodynamics Stack
- `hydrodynamics.md` - Hydrodynamics content
- `celestial-mechanics.md` - Celestial mechanics content
- **Status**: ✅ Good foundation, but needs more computation-focused content

**Finance Stack (`_finance_stack/`)**
- `01_intro.md` - Introduction to Military-Financial Stack
- `qf-audit.md` - Quantitative finance audit
- `hft-audit.md` - High-frequency trading audit
- **Status**: ✅ Good foundation, but audit-focused rather than building-focused

#### Other Pages

**Resources (`_pages/resources.md`)**
- Links to Stacks, Booklist, Archive
- **Status**: Functional but minimal

**Blog (`_pages/blog.md`)**
- Empty placeholder: "Blog posts and articles coming soon."
- **Status**: ❌ No content

**Community (`_pages/community.md`)**
- Empty placeholder: "Community and discussion coming soon."
- **Status**: ❌ No content

**Archive (`_pages/archive.md`)**
- Contains declassified memos and primary sources
- **Status**: ✅ Good resource, but could be better integrated

**Cartography (`_pages/cartography.md`)**
- Master mapping table of mathematics to material origins
- **Status**: ✅ Excellent resource, but hidden

### 3. Collections Structure

**Jekyll Collections:**
- `c3i_stack` - Output: true ✅
- `physics_stack` - Output: true ✅
- `finance_stack` - Output: true ✅
- `dropdown` - Output: true ✅
- `items` - Output: true (unused?)

**Posts Collection:**
- `_posts/` - Empty (no blog posts)

### 4. Theme and Styling

**Theme**: `luxedo/jekyll-theme-potato-hacker`
- Dark theme base
- Custom CSS overrides in `assets/css/gauge-theme.css`
- Custom JavaScript: `assets/js/manifold-background.js` (animated background)
- **Status**: ✅ Functional, visually appealing

---

## Ideal Structure Proposal

### Philosophy

The ideal structure should:
1. **Emphasize the three core disciplines** (Physics, Finance, Computation) as the foundation
2. **Balance audit/exposure with building/creation** - not just exposing hidden geometries, but building new ones
3. **Foster community** - provide spaces for collaboration, discussion, and knowledge sharing
4. **Enable eudaimonia** - free thinking, free building, engineering excellence
5. **Support 21st-century scientists/engineers** - preparing for an AI-disrupted world

### Proposed Navigation Structure

```
Home (Landing Page)
├── About
│   ├── Mission & Philosophy
│   ├── The Three Foundations (Physics, Finance, Computation)
│   └── Community Principles
├── Stacks (Three Specialized Areas)
│   ├── Physics Stack
│   │   ├── Introduction
│   │   ├── Hydrodynamics
│   │   ├── Celestial Mechanics
│   │   ├── Computational Physics
│   │   └── Projects & Research
│   ├── Finance Stack
│   │   ├── Introduction
│   │   ├── Quantitative Finance
│   │   ├── High-Frequency Trading
│   │   ├── Computational Finance
│   │   └── Projects & Research
│   └── Computation Stack (NEW - Rename from C3I)
│       ├── Introduction
│       ├── Operating Systems
│       ├── Artificial Intelligence
│       ├── Graph Theory
│       └── Projects & Research
├── Resources
│   ├── The Stack (Technical Stacks)
│   ├── Booklist (Recommended Reading)
│   ├── Primary Sources (Archive)
│   └── Cartography (Mathematics Mapping)
├── Blog
│   ├── Research Posts
│   ├── Project Updates
│   ├── Technical Deep Dives
│   └── Community Highlights
└── Community
    ├── Discussion Forums
    ├── Projects & Collaborations
    ├── Events & Meetups
    └── Contributors
```

### Key Changes

#### 1. Rename "C3I Stack" → "Computation Stack"
- **Rationale**: "C3I" is military-focused and may not resonate with the broader community goal
- "Computation" aligns with the three foundational disciplines
- Still includes the same content (OS, AI, Graph Theory) but with a broader, building-focused framing

#### 2. Reorganize Homepage
- **Current**: Minimal three-section landing
- **Proposed**:
  - Hero section with mission statement
  - Three prominent sections for Physics, Finance, Computation
  - Each section links to its respective stack
  - Call-to-action for community participation
  - Recent blog posts/updates

#### 3. Enhance Stacks Structure
- **Current**: Audit-focused (exposing hidden geometries)
- **Proposed**:
  - Keep audit content (important for understanding)
  - Add "Projects & Research" section to each stack
  - Include computational tools, code repositories, research papers
  - Link to community projects and collaborations

#### 4. Develop Blog Content
- **Current**: Empty placeholder
- **Proposed**:
  - Research posts on physics, finance, computation
  - Project updates and technical deep dives
  - Community highlights and contributor spotlights
  - Tutorials and educational content
  - Integration with Jekyll posts collection

#### 5. Build Community Section
- **Current**: Empty placeholder
- **Proposed**:
  - Discussion forums (could integrate with GitHub Discussions, Discord, or custom forum)
  - Projects & Collaborations (showcase community projects)
  - Events & Meetups (virtual and in-person)
  - Contributors page (recognize community members)
  - Code of conduct and community guidelines

#### 6. Reorganize Resources
- **Current**: Basic links to Stacks, Booklist, Archive
- **Proposed**:
  - **The Stack**: Technical stacks and architectures (keep current)
  - **Booklist**: Curated reading lists for each discipline
  - **Primary Sources**: Archive of declassified documents (keep current)
  - **Cartography**: Mathematics mapping table (move from hidden page)
  - **Tools & Libraries**: Community-contributed tools and code
  - **Educational Resources**: Tutorials, courses, learning paths

#### 7. Create "About" Section
- **Current**: Single page linking to `/principal`
- **Proposed**:
  - **Mission & Philosophy**: Core values, eudaimonia, free thinking
  - **The Three Foundations**: Deep dive into why Physics, Finance, Computation
  - **Community Principles**: Guidelines for participation, code of conduct
  - **History**: The audit framework (current `/principal` content)
  - **Team/Contributors**: Core team and community leaders

### File Structure Changes

#### New Files to Create

```
_pages/
├── about/
│   ├── mission.md
│   ├── foundations.md
│   ├── principles.md
│   └── history.md (move from principal.md)
├── stacks/
│   ├── physics/
│   │   ├── projects.md (NEW)
│   │   └── research.md (NEW)
│   ├── finance/
│   │   ├── projects.md (NEW)
│   │   └── research.md (NEW)
│   └── computation/
│       ├── projects.md (NEW)
│       └── research.md (NEW)
├── community/
│   ├── projects.md (NEW)
│   ├── events.md (NEW)
│   ├── contributors.md (NEW)
│   └── guidelines.md (NEW)
└── resources/
    ├── tools.md (NEW)
    ├── education.md (NEW)
    └── cartography.md (move from _pages/cartography.md)
```

#### Files to Rename/Reorganize

```
_c3i_stack/ → _computation_stack/ (rename collection)
_pages/principal.md → _pages/about/history.md (move and rename)
_pages/cartography.md → _pages/resources/cartography.md (move)
```

#### Collections to Update

```yaml
collections:
  computation_stack:  # Renamed from c3i_stack
    output: true
  physics_stack:
    output: true
  finance_stack:
    output: true
  dropdown:
    output: true
  projects:  # NEW - Community projects
    output: true
```

### Content Strategy

#### 1. Homepage Content
- **Hero**: "Engineering principles of physics, finance, and computation"
- **Mission**: Brief statement about building a community of high-knowledge individuals
- **Three Foundations**: Prominent sections for Physics, Finance, Computation
- **Recent Activity**: Latest blog posts, community projects, events
- **Call-to-Action**: Join community, contribute, explore stacks

#### 2. Stack Pages
- **Introduction**: What this stack is, why it matters
- **Audit Content**: Historical context (keep current content)
- **Modern Applications**: Current uses and innovations
- **Projects & Research**: Community projects, research papers, tools
- **Learning Path**: Resources for mastering this discipline
- **Community**: Links to stack-specific discussions and collaborations

#### 3. Blog Content
- **Research Posts**: Deep dives into physics, finance, computation
- **Project Updates**: Progress on community projects
- **Technical Tutorials**: How-to guides and educational content
- **Community Highlights**: Showcase community achievements
- **Industry Analysis**: Analysis of current trends and developments

#### 4. Community Content
- **Projects**: Showcase of community projects
- **Events**: Upcoming and past events, meetups, workshops
- **Contributors**: Recognition of community members
- **Guidelines**: Code of conduct, contribution guidelines
- **Discussions**: Links to forums, GitHub Discussions, Discord

### Technical Implementation

#### 1. Navigation Updates
- Update `_config.yml` `toolbar_priority` to reflect new structure
- Create dropdown menus for Stacks (Physics, Finance, Computation)
- Ensure About has sub-pages
- Add Community dropdown with sub-sections

#### 2. Collection Renaming
- Rename `_c3i_stack/` to `_computation_stack/`
- Update all references in `_config.yml`
- Update permalinks in stack files
- Update internal links throughout site

#### 3. Blog Integration
- Create `_posts/` directory structure
- Set up Jekyll blog pagination
- Create blog post templates
- Add blog categories/tags for Physics, Finance, Computation

#### 4. Community Features
- Integrate GitHub Discussions (if using GitHub)
- Add project showcase page with GitHub integration
- Create contributor recognition system
- Add event calendar/listing

#### 5. Search Functionality
- Implement Jekyll search (Simple-Jekyll-Search or similar)
- Add search by stack, topic, author
- Enable full-text search of blog posts and pages

### Migration Plan

#### Phase 1: Foundation (Week 1-2)
1. Rename `_c3i_stack/` to `_computation_stack/`
2. Update `_config.yml` and all references
3. Reorganize `_pages/` structure
4. Create new directory structure
5. Move and update files

#### Phase 2: Content Development (Week 3-4)
1. Create About sub-pages
2. Add Projects & Research sections to each stack
3. Develop initial blog content (5-10 posts)
4. Create Community pages (projects, events, contributors)
5. Enhance Resources section

#### Phase 3: Community Features (Week 5-6)
1. Set up GitHub Discussions or forum
2. Create project showcase
3. Add contributor recognition
4. Implement search functionality
5. Add event calendar

#### Phase 4: Polish & Launch (Week 7-8)
1. Review and refine all content
2. Test navigation and links
3. Optimize performance
4. Add analytics
5. Launch and promote

---

## Recommendations

### Immediate Actions

1. **Rename C3I Stack to Computation Stack**
   - Aligns with three foundational disciplines
   - Broader appeal for community building
   - Maintains audit content while emphasizing building

2. **Enhance Homepage**
   - Add hero section with mission
   - Prominent three-section layout for Physics, Finance, Computation
   - Recent activity feed
   - Call-to-action for community participation

3. **Develop Blog Content**
   - Create 5-10 initial blog posts
   - Cover topics in Physics, Finance, Computation
   - Include project updates and technical deep dives
   - Set up Jekyll blog pagination

4. **Build Community Section**
   - Create projects showcase
   - Add events/meetups page
   - Contributor recognition
   - Community guidelines

5. **Reorganize Resources**
   - Move Cartography to Resources
   - Add Tools & Libraries section
   - Enhance Booklist with discipline-specific lists
   - Add Educational Resources

### Long-term Vision

1. **Community Platform**
   - Integrated forum or discussion platform
   - Project collaboration tools
   - Event management system
   - Contributor recognition system

2. **Content Ecosystem**
   - Regular blog posts (weekly or bi-weekly)
   - Research papers and publications
   - Technical tutorials and courses
   - Project case studies

3. **Educational Resources**
   - Learning paths for each discipline
   - Curated reading lists
   - Video tutorials and courses
   - Interactive tools and simulations

4. **Research & Innovation**
   - Community research projects
   - Open-source tool development
   - Collaboration with academia and industry
   - Innovation challenges and competitions

---

## Conclusion

The current website structure provides a solid foundation with rich audit content, but needs reorganization to better align with the mission of building a community of high-knowledge, high-skilled individuals focused on Physics, Finance, and Computation.

**Key Improvements:**
1. Emphasize three foundational disciplines (Physics, Finance, Computation)
2. Balance audit with building (add projects and research sections)
3. Develop community features (projects, events, contributors)
4. Create blog content (research, tutorials, updates)
5. Reorganize navigation and structure for clarity

**Next Steps:**
1. Implement Phase 1 (Foundation) - Rename and reorganize
2. Develop initial blog content
3. Build community section
4. Enhance homepage with mission and call-to-action
5. Launch and iterate based on community feedback

The ideal structure should serve as both a **knowledge repository** (audit) and a **collaboration platform** (building), enabling the community to flourish through free thinking, free building, and engineering excellence.

---

**Report Generated**: 2025-01-27
**Status**: Ready for Implementation
**Priority**: High - Aligns with core mission and community goals
