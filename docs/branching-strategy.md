# Branching Strategy

## 🌳 **Git Branch Structure**

```
main (protected)
├── Original version - preserved for reference
└── Only receives merges from develop via PR

develop (integration branch)
├── Current development version with Phase 1 foundation
├── All feature branches merge into here
└── Receives feature branch merges

feature/[feature-name] (feature branches)
├── feature/boss-battle-system
├── feature/hero-companion-system  
├── feature/equipment-progression
└── feature/skill-tree-system
```

## 🔄 **Workflow**

### **Feature Development**
1. Create feature branch from `develop`
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/[feature-name]
   ```

2. Develop feature with TDD approach
   - Write tests first (Red)
   - Implement code to pass tests (Green)  
   - Refactor and optimize (Refactor)

3. Test thoroughly
   ```bash
   npm run test
   npm run test:coverage
   npm run test:e2e
   ```

4. Merge to develop via PR
   ```bash
   git checkout develop
   git merge feature/[feature-name]
   git push origin develop
   ```

### **Release Process**
1. When `develop` is stable and ready for release:
   ```bash
   git checkout main
   git pull origin main
   git merge develop
   git push origin main
   ```

2. Create release tag:
   ```bash
   git tag -a v1.0.0 -m "Phase 1 Complete: Foundation & Architecture"
   git push origin v1.0.0
   ```

## 📋 **Current Branch Status**

### **main** 
- ✅ Preserved original version
- 🔒 Protected - direct commits disabled
- 📦 Only receives merges from develop

### **develop**
- ✅ Phase 1 foundation complete
- 🧪 All tests passing (37/37)
- 🏗️ Ready for Phase 2 feature development
- 🚀 Integration branch for all features

## 🎯 **Feature Branch Guidelines**

### **Naming Convention**
- `feature/[feature-name]` - New features
- `bugfix/[issue-description]` - Bug fixes  
- `hotfix/[critical-fix]` - Critical production fixes

### **Branch Rules**
- All feature branches start from `develop`
- Feature branches should be short-lived
- Always write tests before implementation
- Ensure 100% test coverage for new code
- Update documentation as needed

### **Merge Requirements**
- All tests must pass
- Code review required
- Documentation updated
- Linear tasks marked complete

## 🔄 **Integration Strategy**

### **Phase 2 Features**
1. `feature/boss-battle-system` → `develop`
2. `feature/hero-companion-system` → `develop`  
3. `feature/equipment-progression` → `develop`
4. `feature/skill-tree-system` → `develop`

### **Continuous Integration**
- GitHub Actions will run on all PRs
- Test coverage must remain >90%
- Build must succeed
- No security vulnerabilities

## 📝 **Commands Reference**

### **Daily Development**
```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# Work and commit
git add .
git commit -m "feat: implement new feature"

# Push and create PR
git push origin feature/new-feature
```

### **Integration**
```bash
# Merge feature to develop
git checkout develop
git merge feature/new-feature
git push origin develop

# Clean up
git branch -d feature/new-feature
```

### **Release**
```bash
# Merge to main
git checkout main
git merge develop
git push origin main

# Tag release
git tag v1.0.0
git push origin v1.0.0
```

---

**This branching strategy ensures clean separation between stable releases and active development while preserving the original version.**
